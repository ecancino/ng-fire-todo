'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the todosApp
 */

var Login = function ($scope, $rootScope, $state, Auth, User) {
  var that = this;
  this.error = null;
  this.user = {
    email: 'monophobik@gmail.com',
    password: 'monophobik'
  };

  if (Auth.signedIn()) {
    $state.go('todos');
  }

  this.login = function () {
    Auth.login(this.user).then(function (authUser) {

      console.log(authUser);
      console.log($getCurrentUser());



      var usermetadata = User.findById(authUser.id);
      authUser.username = usermetadata.username;
      $rootScope.currentUser = authUser;
      $state.go('todos');
    }, function (error) {
      that.error = error.message.replace('/FirebaseSimpleLogin:/g', '');
    });
  };
};
Login.$inject = ['$scope', '$rootScope', '$state', 'Auth', 'User'];

angular.module('todosApp').controller('LoginCtrl', Login);
