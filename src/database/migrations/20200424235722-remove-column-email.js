'use strict';

module.exports = {
  up: queryInterface => {
      return queryInterface.removeColumn(
        'users',
        'email',
        );
    
  },

  down: queryInterface => {
      return queryInterface.addColumn('users', 'email');
    
  }
};
