'use strict';

/**
 * @ngdoc directive
 * @name todosApp.directive:youtube
 * @description
 * # youtube
 */

var youtube = function ($window, YT_Event) {
  return {
    restrict: "E",
    scope: {
      height:   "@",
      width:    "@",
      videoid:  "@"
    },
    template: '<div></div>',
    link: function (scope, element, attrs) {
      var player, tag, firstScriptTag;
      tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      $window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 0,
            html5: 1,
            theme: "dark",
            modesbranding: 1,
            color: "black",
            iv_load_policy: 3,
            showinfo: 0,
            controls: 0,
            rel: 0
          },
          height: scope.height,
          width: scope.width,
          videoId: scope.videoid
        });
      };

      scope.$watch('videoid', function (newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }
        player.cueVideoById(scope.videoid);
      });

      scope.$watch('height + width', function (newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }
        player.setSize(scope.width, scope.height);
      });

      scope.$on(YT_Event.STOP, function () {
        player.seekTo(0);
        player.stopVideo();
      });

      scope.$on(YT_Event.PLAY, function () {
        player.playVideo();
      });

      scope.$on(YT_Event.PAUSE, function () {
        player.pauseVideo();
      });
    }
  };
};
youtube.$inject = ['$window', 'YT_Event'];

angular.module('todosApp')
  .directive('youtube', youtube);
