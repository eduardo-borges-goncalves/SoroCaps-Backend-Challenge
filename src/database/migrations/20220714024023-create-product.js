'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable("products", {
      codeProduct: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false,
        primaryKey: true
      }, 
      name: {
        type: Sequelize.STRING, 
        allowNull: false
      }, 
      description: {
        type: Sequelize.STRING, 
        allowNull: false 
      }, 
      measurementUnit: {
        type: Sequelize.STRING, 
        allowNull: false 
      },
      pricePurchase: {
        type: Sequelize.INTEGER, 
        allowNull: false 
      },
      priceSales: {
        type: Sequelize.INTEGER, 
        allowNull: false 
      }     
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("products")
  }
};
