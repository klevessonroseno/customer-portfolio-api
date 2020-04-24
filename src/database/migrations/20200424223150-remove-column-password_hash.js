'use strict';

module.exports = {
  up: queryInterface => {
      return queryInterface.removeColumn(
        'customers',
        'password_hash',
      );
    
  },

  down: queryInterface => {
      return queryInterface.createColumn('customers', 'password_hash');
  }
};
