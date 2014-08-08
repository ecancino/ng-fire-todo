'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:YouTubeCtrl
 * @description
 * # YoutubeCtrl
 * Controller of the todosApp
 */

var YouTube = function ($scope, YT_Event) {
  this.YT_Event = YT_Event;
  this.width = 700;
  this.height = 395;
  this.videos = [
    'aGHzqwQU06g',
    'ny4FtbBd6hI',
    'NWhfoyuZPKM',
    'Ix78OVRDtuQ',
    'yV-vIB7ykss',
    'M1mL8waoh-g'
  ];

  this.getRandVid = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  this.videoid = this.videos[this.getRandVid(0, this.videos.length - 1)];

  $scope.sendControlEvent = function (yt_event) {
    console.log(yt_event);
    this.$broadcast(yt_event);
  };
};
YouTube.$inject = ['$scope', 'YT_Event'];

angular.module('todosApp')
  .controller('YouTubeCtrl', YouTube);
