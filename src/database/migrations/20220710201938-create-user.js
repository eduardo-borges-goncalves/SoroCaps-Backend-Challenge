'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true, 
      }, 
      name: {
        type: Sequelize.STRING, 
        allowNull: false
      }, 
      userLogin: {
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true
      }, 
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
