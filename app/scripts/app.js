'use strict';

/**
 * @ngdoc overview
 * @name resumeApp
 * @description
 * # resumeApp
 *
 * Main module of the application.
 */
angular.module('todosApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'firebase',
  'ui.router'
])
  .value('YT_Event', {
    STOP:            0,
    PLAY:            1,
    PAUSE:           2
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'lg',
        data: {
          auth_required: false
        }
      })
      .state('logout', {
        url: '/logout',
        controller: function (Auth) {
          Auth.logout();
        },
        data: {
          auth_required: false
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rg',
        data: {
          auth_required: false
        }
      })
      .state('todos', {
        url: '/todos',
        templateUrl: 'views/todos.html',
        controller: 'TodosCtrl',
        controllerAs: 'td',
        resolve: {
          todos: function ($q, $rootScope, Todos) {
            var def, todos;
            def = $q.defer();
            todos = Todos.get($rootScope.currentUser.username);
            if (todos) {
              def.resolve(todos);
            } else {
              def.reject('No! No! No!');
            }
            return def.promise;
          }
        },
        data: {
          auth_required: true
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'ab',
        data: {
          auth_required: false
        }
      })
      .state('youtube', {
        url: '/youtube',
        templateUrl: 'views/youtube.html',
        controller: 'YouTubeCtrl',
        controllerAs: 'yt',
        data: {
          auth_required: true
        }
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'ct',
        data: {
          auth_required: true
        }
      });
  })
  .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth, User) {

    $rootScope.$on("$stateChangeStart", function () {
      $rootScope.alertType = "alert-info";
      $rootScope.alertMessage = "Loading...";
    });

    $rootScope.$on("$stateChangeSuccess", function (event, stateTo) {
      $rootScope.alertType = "alert-success";
      $rootScope.alertMessage = "Changed state!";

      var page = stateTo.name;
      $(".page").toggleClass("active", false);
      $(".page." + page).toggleClass("active", true);
    });

    $rootScope.$on("$stateChangeError", function (event, stateTo, stateParams, stateFrom, rejection) {
      $rootScope.alertType = "alert-danger";
      $rootScope.alertMessage = rejection;

      $state.go('login');
    });

    $rootScope.alertType = "alert-info";
    $rootScope.alertMessage = "Welcome!";
  }]);
