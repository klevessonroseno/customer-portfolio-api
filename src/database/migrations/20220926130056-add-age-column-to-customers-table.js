'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'customers',
      'age',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('customers', 'email'); 
  }
};
