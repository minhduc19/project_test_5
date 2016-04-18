
myApp.controller('userDisplayArticle', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {

		$scope.hello = "test1111";
		console.log("okay");
		console.log($stateParams.articleId);

		$scope.articleId = "hello";


	}]); //controller