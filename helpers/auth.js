const { ApolloError, AuthenticationError } = require("apollo-server");

function handleAuthError(user, role) {
  if (!user) {
    throw new AuthenticationError('Please login to do this');
  }
  if (role) {
    if (!user.roles || !user.roles.includes(role)) {
      throw new ApolloError('Missing user role', '403');
    }
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