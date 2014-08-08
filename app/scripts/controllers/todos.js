'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todosApp
 */

var Todos = function ($rootScope, $scope, $state, $todos) {
  var that = this;
  this.todo = '';

  this.addTodo = function () {
    var newTodo = this.todo.trim();
    if (newTodo.length) {
      $scope.todos.$add({'title': this.todo, 'completed': false});
      this.todo = '';
    }
  };

  this.removeTodo = function (index) {
    $scope.todos.$remove(index);
  };

  this.updateTodo = function (index) {
    $scope.todos.$save(index);
  };

  $scope.$watch('todos', function (n, o) {
    var total = 0, completed = 0;
    $scope.todos.$getIndex().forEach(function (index) {
      var todo = $scope.todos[index];
      total += Number(!!todo.title);
      completed += Number(!!todo.title && !todo.completed);
    });
    that.total = total;
    that.completed = completed;
  }, true);

  $scope.todos = $todos;
};

Todos.$inject = ['$rootScope', '$scope', '$state', 'todos', 'Auth', '$state'];

angular.module('todosApp')
  .controller('TodosCtrl', Todos);
