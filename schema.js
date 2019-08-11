const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    name: String!
    email: String!
    password: String!
    id: ID!
    createdAt: String
    updatedAt: String
  }

  type Category {
    name: String!
    semester: Semester!
    id: ID!
    createdAt: String
    updatedAt: String
  }

  type Note {
    title: String!
    content: String!
    category: Category!
    author: User!
    id: ID!
    createdAt: String
    updatedAt: String
  }

  type PaginatedNote {
    count: Int!
    rows: [Note]
  }

  enum Semester {
    S1
    S2
    S3
    IPI
    PEL
    LP
  }

  type Query {
    categories: [Category]
    users: [User]
    notes(offset: Int, limit: Int, semester: String, category: ID, title: String): PaginatedNote
    note(id: ID!): Note
    me: User
  }

  type Mutation {
    addCategory(name: String!, semester: Semester!): Category
    addUser(name: String!, email: String!, password: String!): User
    addNote(title: String!, content: String!, category: ID!): Note
    logIn(email: String!, password: String!): String
    recoverPassword(email: String!): String
    changePassword(recoveryToken: String!, password: String!): User
  }
`;