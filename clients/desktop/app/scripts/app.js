'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
angular.module('HoloDeck', ['ionic', 'config', 'HoloDeck.controllers'])

.run(function($ionicPlatform,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Astral.onLogin(function(userId){
  //   console.log("logged in",userId);
  //   $state.go('main');
  // })
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('gameboard', {
    url: '/gameboard',
    templateUrl: 'templates/gameboard.html',
    controller: 'LauncherCtrl'
  })
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/gateway.html',
    controller: 'LoginCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.otherwise('/gameboard');

});
