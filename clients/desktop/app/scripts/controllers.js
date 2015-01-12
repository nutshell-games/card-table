'use strict';
angular.module('HoloDeck.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('login');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicModal, $timeout) {
  console.log('LoginCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    console.log('modal',modal);
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    Astral.logout();
  }

  $scope.loginWithGoogle = function(){
    console.log("Astral",Astral);
    Astral.loginWithGoogle(function(result){
      console.log("success",result);
      $scope.modal.hide();
    },function(error){
      console.log("error",error);
    });
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    Astral.loginWithPassword($scope.loginData.username,$scope.loginData.password,
      function(result){
      console.log("success",result);
      $scope.modal.hide();
    },function(error){
      console.log("error",error);
    });
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  }
})

.controller('MainCtrl', function($scope, $state, $ionicModal, $timeout) {
  console.log('MainCtrl');
  
  $ionicModal.fromTemplateUrl('templates/session-options.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    console.log('modal',modal);
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.hideSessionOptions = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.showSessionOptions = function() {
    $scope.modal.show();
  };
});
