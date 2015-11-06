angular.module('socially',['angular-meteor', 'ui.router', 'textAngular','ngMaterial','ui.bootstrap','ngAnimate']);

function onReady() {
  angular.bootstrap(document, ['socially']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);

