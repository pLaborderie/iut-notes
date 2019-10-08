const { ApolloError, AuthenticationError } = require("apollo-server");

function handleAuthError(user) {
  if (!user) {
    throw new AuthenticationError('Please login to do this');
  }
  if (user.error) {
    if (user.error === 'TokenExpiredError') {
      throw new ApolloError('TokenExpiredError', '401');
    }
    throw new ApolloError(user.error, '500');
  }
}

module.exports = {
  handleAuthError,
};