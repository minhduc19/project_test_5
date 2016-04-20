
myApp.controller('userPracticeWriting', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		var ref = new Firebase(FIREBASE_URL);
		var authData = ref.getAuth();
		if (authData) {
		  var currentUser = authData;
		};

		var articleId = $stateParams.articleId;



	}]); //controller