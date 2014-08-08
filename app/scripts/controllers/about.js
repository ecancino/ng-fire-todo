'use strict';

/**
 * @ngdoc function
 * @name resumeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the todosApp
 */

var About = function ($scope) {
  this.author = 'Eduardo Cancino';
  this.bio = [
    'Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.',
    'Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions.',
    'Completely synergize resource sucking relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. Dynamically innovate resource-leveling customer service for state of the art 	customer service'
  ];
};
About.$inject = ['$scope'];

angular.module('todosApp')
	.controller('AboutCtrl', About);
