'use strict';

/**
 * @ngdoc service
 * @name resumeApp.Todos
 * @description
 * # Todos
 * Service in the resumeApp.
 */
angular.module('todosApp')
  .value('FIREBASE_URL', 'https://ecz.firebaseio.com')
  .service('Todos', function ($firebase, FIREBASE_URL) {
    return {
      get: function (id) {
        var todos = new Firebase(FIREBASE_URL + '/todos/' + id);
        return $firebase(todos);
      }
    };
  })
  .service('Auth', function ($firebase, $firebaseSimpleLogin, FIREBASE_URL, $state, $rootScope, User) {
    var ref = new Firebase(FIREBASE_URL),
      auth = $firebaseSimpleLogin(ref),
      Auth = {
        register: function (user) {
          return auth.$createUser(user.email, user.password);
        },
        signedIn: function () {
          return typeof $rootScope.currentUser !== 'undefined';
        },
        login: function (user) {
          return auth.$login('password', user);
        },
        logout: function () {
          delete $rootScope.currentUser;
          auth.$logout();
          $state.go('login');
        }
      };

    $rootScope.signedIn = function () {
      return Auth.signedIn();
    };

    return Auth;
  })
  .factory('User', function ($firebase, $rootScope, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + '/users'),
      users = $firebase(ref),
      User = {
        create: function (authUser, username) {
          var u = this;
          users[authUser.id] = {
            md5_hash: authUser.md5_hash,
            username: username,
            $priority: authUser.uid
          };
          users.$save(authUser.id);
        },
        findById: function (id) {
          return users.$child(id);
        }
      };
    return User;
  });

