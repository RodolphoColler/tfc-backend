'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('teams')
  }
};
