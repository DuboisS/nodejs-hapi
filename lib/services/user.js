"use strict";

const { Service } = require("schmervice");
const Encrypt = require("@duboiss/encrypt");
const Boom = require("@hapi/boom");

module.exports = class UserService extends Service {
  create(user) {
    const { User } = this.server.models();

    user.password = Encrypt(user.password);

    return User.query().insertAndFetch(user);
  }
  list() {
    const { User } = this.server.models();

    return User.query();
  }
  async delete(user) {
    const { User } = this.server.models();

    await User.query().deleteById(user.id);

    return "";
  }
  async update(user) {
    const { User } = this.server.models();

    return User.query().updateAndFetchById(user.id, user);
  }
  async login(credentials) {
    const { User } = this.server.models();

    // Check user exists before updating it
    const passwordEncrypt = Encrypt(credentials.password);

    const user = await User.query().findOne({
      mail: credentials.mail,
      password: passwordEncrypt
    });

    if (user) {
      return JSON.stringify({ login: 'successful' });
    }

    return Boom.unauthorized('401 Unauthorized');
  }
};
