const { ApolloServer } = require('apollo-server-express');
const express = require('express')
const path = require('path');
const { getUser } = require('./helpers/jwt');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./models');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // get the user token from authorization header
    const auth = (req.headers.authorization || '').split(' ');
    const user = (() => {
      if (auth.length > 1) {
        return getUser(auth[1]);
      }
      return null;
    })();
    return { db, user };
  }
});
const app = express();
server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

db.sync().then(() => {
  app.listen({ port: 4000 }, () => {
    console.log("\x1b[36m", `🚀 Server ready at http://localhost:${port}`);
  });
});
