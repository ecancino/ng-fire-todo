'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the todosApp
 */

var Contact = function ($scope) {
  this.contact = {};
  this.today = moment().format('YYYY-MM-DD');
  this.submit = function () {
    console.log(this.contact);
    return false;
  };
};
Contact.$inject = ['$scope'];

angular.module('todosApp')
  .controller('ContactCtrl', Contact);
