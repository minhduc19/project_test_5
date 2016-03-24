
myApp.controller('TagDisplay', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		
			var articleId =  $routeParams.articleId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");
			

			
	}]); //controller