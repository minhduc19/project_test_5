var myApp = angular.module('myApp',
  ['ngCookies' ,'ngRoute', 'firebase','ngSanitize','ui.router'])
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




myApp.config(['$routeProvider','$locationProvider', 


 function($routeProvider, $locationProvider) {
  
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/input_article', {
      templateUrl: 'views/input_article.html',
      controller: 'VocabularyController'
    }).
    when('/input_sentence/:articleId', {
      templateUrl: 'views/input_sentence.html',
      controller: 'VocabularyController'
    }).
    when('/input_tag/:articleId/:sentenceId', {
      templateUrl: 'views/input_tag.html',
      controller: 'VocabularyController'
    }).
     when('/display_sentence/:articleId', {
      templateUrl: 'views/display_sentence.html',
      controller: 'SentenceDisplay'
    }).
     when('/edit_sentence/:sentenceId', {
      templateUrl: 'views/edit_sentence.html',
      controller: 'SentenceEdit'
    }).
      when('/article_display', {
      templateUrl: 'views/display_article.html',
      controller: 'ArticleDisplay'
    }).
      when('/display_tag/:tagId', {
      templateUrl: 'views/display_tag.html',
      controller: 'TagDisplay'
    }).
      when('/writing_display', {
      templateUrl: 'views/display_writing.html',
      controller: 'WritingDisplay'
    }).
      when('/input_writing', {
      templateUrl: 'views/input_writing.html',
      controller: 'VocabularyController'
    }). 
    when('/', {
      templateUrl: 'views/display_writing.html',
      controller: 'WritingDisplay'
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

    $routeProvider.
    
      when('/writing_display', {
      templateUrl: 'views/display_writing.html',
      controller: 'WritingDisplay'
    });
}]);



