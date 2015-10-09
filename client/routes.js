angular.module("socially").run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('parties');
    }
  });
}]);

angular.module("socially").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('parties', {
        url: '/home',
        templateUrl: 'client/parties/views/parties-list.ng.html',
        controller: 'PartiesListCtrl'
      })
      .state('Employer', {
        url: '/employer',
        templateUrl: 'client/parties/views/employer.ng.html',
        controller: 'EmployerCtrl'
      })

      .state('PostNewJob', {
        url: '/PostNewJob',
        templateUrl: 'client/parties/views/postnewjob.ng.html',
        controller: 'PostNewJobCtrl'
      })

      .state('CreateProfile', {
        url: '/CreateProfile',
        templateUrl: 'client/parties/views/createprofile.ng.html',
        controller: 'CreateProfileCtrl'
      })

      .state('jobdetails', {
        url: '/jobdetails/:jobId',
        templateUrl: 'client/parties/views/jobdetails.ng.html',
        controller: 'JobDetailsCtrl'
      })




      .state('partyDetails', {
        url: '/parties/:partyId',
        templateUrl: 'client/parties/views/party-details.ng.html',
        controller: 'PartyDetailsCtrl',
        resolve: {
          "currentUser": ["$meteor", function($meteor){
            return $meteor.requireUser();
          }]
        }
      });

    $urlRouterProvider.otherwise("/home");
  }]);