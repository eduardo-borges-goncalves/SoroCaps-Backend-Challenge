'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('sales-orders', {
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING, 
        allowNull: false, 
        defaultValue: "EM PROCESSO"
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales-orders');
  }
};
