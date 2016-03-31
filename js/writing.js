var writingApp = angular.module('writingApp',
  ['ngCookies' ,'ngRoute', 'firebase','ngSanitize'])
  .constant('FIREBASE_URL', 'https://minhduc16.firebaseio.com/');


writingApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          //$rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run


writingApp.config(['$routeProvider','$locationProvider', 

 function($routeProvider, $locationProvider) {
  
  $routeProvider.
      when('/writing_display', {
      templateUrl: 'views/display_writing.html',
      controller: 'WritingDisplay'
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
