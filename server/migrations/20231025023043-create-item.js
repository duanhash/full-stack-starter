'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Ticker: {
        type: Sequelize.STRING
      },
      Company: {
        type: Sequelize.STRING
      },
      Founded: {
        type: Sequelize.STRING
      },
      About: {
        type: Sequelize.TEXT
      },
      Industry: {
        type: Sequelize.STRING
      },
      Images: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stocks');
  }
};