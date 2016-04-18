var myApp = angular.module('myApp',
  ['ngCookies' ,'ngRoute', 'firebase','ngSanitize','ui.router'])
  .constant('FIREBASE_URL', 'https://minhduc16.firebaseio.com/');



myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run


myApp.service('sendData', function() {
  var list = [];

  var addList = function(newObj) {
      list.push(newObj);
  };

  var getList = function(){
      return list;
  };

  return {
    addList: addList,
    getList: getList
  };

});






myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
        .state('article', {
            url:'/article',
            templateUrl: 'views/display_article.html',
            controller: 'ArticleDisplay'
        })
         .state('writing', {
            url:'/writing',
            templateUrl: 'views/display_writing.html',
            controller: 'WritingDisplay'
        })
         .state('sentence', {
            url:'/display_sentence/:articleId',
            templateUrl: 'views/display_sentence.html',
            controller: 'SentenceDisplay',
            // resolve: {
            //     currentAuth: function(Authentication) {
            //       return Authentication.requireAuth();
            //     } //current Auth
            //   } //resolve
        })
         .state('sentence_article', {
            url:'/display_sentence_article/:articleId',
            templateUrl: 'views/display_sentence_article.html',
            controller: 'SentenceArticleDisplay'
        })
         .state('speaking', {
            url:'/speaking',
            templateUrl: 'views/display_speaking.html',
            controller: 'SpeakingDisplay'
        })
          .state('tag', {
            url:'/tag/:tagId',
            templateUrl: 'views/display_tag.html',
            controller: 'TagDisplay'
        })
          .state('login', {
            url:'/login',
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        })
          .state('register', {
            url:'/register',
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        })
          .state('profile',{
            //abstract: true,
            url: '/profile',
            templateUrl: 'views/user_profile.html'
          }).
          state('profile.writing',{
            url: '/writing',
            templateUrl : 'views/user_profile_writing1112.html',
            controller: 'userDisplayWriting'
          }).
          state('profile.article',{
            url: '/article/:articleId',
            templateUrl : 'views/user_profile_article.html',
            controller: 'userDisplayArticle'
          })
        
}]);

        //   .state('profile', {
        //     views:{
        //     'writing':{
        //     url:'/profile',
        //     templateUrl: 'views/user_profile.html',
        //     controller: 'userDisplay'
        //   },
        //     'article':
        //   {
        //     url:'/profileArticle',
        //     templateUrl: 'views/user_profile_article.html',
        //     controller: 'userDisplayArticle'
        //   }
        // }
        // })




