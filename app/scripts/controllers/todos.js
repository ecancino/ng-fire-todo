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
      that.todos.$add({'title': this.todo, 'completed': false});
      this.todo = '';
    }
  };

  this.removeTodo = function (index) {
    that.todos.$remove(index);
  };

  this.updateTodo = function (index) {
    that.todos.$save(index);
  };

  var todoObj = $todos.$asObject();
  todoObj.$loaded().then(function() {
     console.log("record has id", todoObj.$id);
  });
  $scope.todos = todoObj; 
  todoObj.$bindTo($scope, "todos");
};

Todos.$inject = ['$rootScope', '$scope', '$state', 'todos'];

angular.module('todosApp')
  .controller('TodosCtrl', Todos);
