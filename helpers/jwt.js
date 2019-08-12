const jwt = require('jsonwebtoken');

module.exports = {
  getUser(token) {
    if (!token) {
      throw new Error('Token is empty');
    }
    const verifyOptions = {
      issuer: 'IUT Notes',
      expiresIn: 10,
      algorithm: ['RS256']
    };
    return jwt.verify(token, process.env.JWT_PUBLIC, verifyOptions);
  },
  createJwt(user) {
    if (!user) {
      throw new Error('No user');
    }
    const { name, email, id } = user;
    const signOptions = {
      issuer: 'IUT Notes',
      expiresIn: 10,
      algorithm: 'RS256'
    };
    return jwt.sign({ name, email, id }, process.env.JWT_PRIVATE, signOptions);
  }
}