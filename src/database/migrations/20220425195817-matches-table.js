'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      home_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "teams",
          key: "id",
        }
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      away_team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "teams",
          key: "id",
        },
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    })
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('matches')
  }
};
