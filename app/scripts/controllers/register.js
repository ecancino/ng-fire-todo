'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the todosApp
 */

var Register = function ($scope, $state, Auth, User) {
  var that = this;
  this.error = null;
  this.user = {
    email: '',
    password: '',
    username: ''
  };

  this.register = function () {
    this.error = null;
    if (!this.user) {
      this.error = 'Please, fill in the form.';
      return;
    }
    Auth.register(this.user).then(function (authUser) {
      User.create(authUser, that.user.username);
      $state.go('login');
    }, function (error) {
      that.error = error.message.replace("/FirebaseSimpleLogin:/g", '');
    });
  };
};
Register.$inject = ['$scope', '$state', 'Auth', 'User'];

angular.module('todosApp')
  .controller('RegisterCtrl', Register);
