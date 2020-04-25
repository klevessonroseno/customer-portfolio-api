'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        }
      );
    
  },

  down: queryInterface => {
      return queryInterface.removeColumn('users', 'email'); 
  }
};
