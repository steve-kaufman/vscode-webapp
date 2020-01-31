// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes } from 'sequelize';
import { Application } from '../declarations';
import usersHooks from '../services/users/users.hooks';
import usersModel from './users.model';

export default function (app: Application) {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const todos = sequelizeClient.define('todos', {

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  }, {
    hooks: {
      beforeCount(options: any) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  (todos as any).associate = function (models: any) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.todos.belongsTo(models.users)
    models.users.hasMany(models.todos)
  };

  return todos;
}
