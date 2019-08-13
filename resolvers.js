const { ApolloError, AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const { createJwt } = require('./helpers/jwt');
const db = require('./models');
const { handleAuthError } = require('./helpers/auth');
const { Op } = db.Sequelize
module.exports = {
  Query: {
    categories: (_, __, { db }) => db.categories.findAll(),
    users: (_, __, { db }) => db.users.findAll(),
    notes: async (_, { offset, limit, semester, category, title }, { db }) => {
      const catFilters = {};
      const noteFilters = {};
      if (semester && semester !== 'Tous') catFilters.semester = semester;
      if (category && category !== 'Toutes') catFilters.id = category;
      if (title) noteFilters.title = { [Op.substring]: title };
      return db.notes.findAndCountAll({
        include: [{
          model: db.categories,
          as: 'category',
          where: catFilters,
        }, {
          model: db.users,
          as: 'author',
        }],
        offset,
        limit,
        where: noteFilters,
      });
    },
    note: (_, { id }, { db }) => db.notes.findByPk(id, {
      include: [{ model: db.categories, as: 'category' }]
    }),
    me: async (_, __, { db, user }) => {
      if (!user) {
        throw new AuthenticationError('User not logged in.');
      }
      try {
        const data = await db.users.findByPk(user.id);
        if (!data) throw new ApolloError('User does not exist', 404);
        const { name, email, id } = data;
        return { name, email, id };
      } catch (err) {
        throw new ApolloError(err, '500');
      }
    }
  },
  Mutation: {
    addCategory: (_, params, { db, user }) => {
      handleAuthError(user);
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
      handleAuthError(user);
      const newNote = await db.notes.create({
        title,
        content,
        authorId: user.id,
        categoryId: category,
      });
      return newNote;
    },
    editNote: async (_, { title, content, category, id }, { db, user }) => {
      handleAuthError(user);
      const note = await db.notes.findByPk(id);
      if (note.authorId !== user.id) {
        throw new AuthenticationError('Only the author can update this note.');
      }
      await db.notes.update({ title, content, categoryId: category }, {
        where: { id }
      });
      return id;
    },
    deleteNote: async (_, { id }, { db, user }) => {
      handleAuthError(user);
      const note = await db.notes.findByPk(id);
      if (note.authorId !== user.id) {
        throw new AuthenticationError('Only the author can delete this note.');
      }
      await db.notes.destroy({ where: { id } });
      return id;
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
