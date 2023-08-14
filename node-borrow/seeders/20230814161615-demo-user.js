'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      username: 'mosboworn',
      password: bcrypt.hashSync('password',bcrypt.genSaltSync(10)),
      first_name: 'Baworn',
      last_name: 'Ngamanurakwong',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
