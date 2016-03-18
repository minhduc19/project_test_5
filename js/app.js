var myApp = angular.module('myApp',
  ['ngRoute', 'firebase','ngSanitize'])
  .constant('FIREBASE_URL', 'https://minhduc16.firebaseio.com/');



myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          //$rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/input_vocabulary', {
      templateUrl: 'views/input_vocabulary.html',
      controller: 'VocabularyController'
    }).
    when('/input_tag', {
      templateUrl: 'views/input_tag.html',
      controller: 'VocabularyController'
    }).
    when('/', {
      templateUrl: 'views/todo.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    when('/todo', {
      templateUrl: 'views/todo.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);