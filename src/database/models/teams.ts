/* eslint-disable linebreak-style */
import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!: number;

  public teamName!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Teams;
