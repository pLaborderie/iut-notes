const { ApolloError, AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const { createJwt } = require('./helpers/jwt');

module.exports = {
  Query: {
    categories: (_, __, { db }) => db.categories.findAll(),
    users: (_, __, { db }) => db.users.findAll(),
    notes: async (_, __, { db }) => {
      return db.notes.findAll({
        include: [{
          model: db.categories,
          as: 'category',
        }, {
          model: db.users,
          as: 'author',
        }]
      });
    },
  },
  Mutation: {
    addCategory: (_, params, { db }) => {
      return db.categories.create(params);
    },
    addUser: async (_, { name, email, password }, { db }) => {
      try {
        const hash = await bcrypt.hash(password, 10);
        return db.users.create({
          name,
          email,
          password: hash
        });
      } catch (err) {
        console.error('Error while hashing password', err);
        throw new ApolloError('Could not hash password', '500');
      }
    },
    addNote: async (_, { title, content, category }, { db, user }) => {
      if (!user) {
        throw new AuthenticationError('Please login to create a note.');
      }
      const newNote = await db.notes.create({
        title,
        content,
        authorId: user.id,
        categoryId: category,
      });
      return newNote;
    },
    logIn: async (_, { email, password }, context) => {
      if (context.user) {
        throw new ApolloError('User is already logged in.', '500');
      }
      // Get user from db
      const user = await context.db.users.findOne({ where: { email } });
      if (!user) {
        throw new ApolloError('User does not exist', '404');
      }
      // Check the password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Send back JWT
        return createJwt(user);
      }
    },
    recoverPassword: async (_, { email }, { db }) => {
      const user = await db.users.findOne({ where: { email } });
      if (!user) {
        throw new ApolloError('User does not exist', '404');
      }
      // Generate a UUID, store it on user and return it to client
      const recoveryToken = uuidv4();
      await db.users.update({
        passwordRecoveryToken: recoveryToken,
        tokenExpiration: Date.now() + 3600000 // 1 hour
      }, {
          where: { id: user.id }
        });
      return recoveryToken;
    },
    changePassword: async (_, { recoveryToken, password }, { db }) => {
      const user = await db.users.findOne({ where: { passwordRecoveryToken: recoveryToken } });
      if (!user) {
        throw new ApolloError('User does not exist', '404')
      }
      // Check if token expired
      if (user.tokenExpiration < Date.now()) {
        throw new ApolloError('Recovery token expired', '498')
      }
      // Update password
      const hash = await bcrypt.hash(password, 10);
      await db.users.update({
        password: hash,
        passwordRecoveryToken: null,
        tokenExpiration: null
      }, { where: { id: user.id } });
      return db.users.findByPk(user.id);
    }
  }
};
