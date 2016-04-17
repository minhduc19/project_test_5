
myApp.controller('userDisplayWriting', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {

		var articleId = $stateParams.articleId;
		var writingRef = new Firebase(FIREBASE_URL + "writing/");
		var writingObj = $firebaseArray(writingRef)
		var articleRef = new Firebase(FIREBASE_URL + "article/");

		var practiceSentence = new Firebase(FIREBASE_URL + "userPractice/")
		var articleUser = new Firebase(FIREBASE_URL + "userArticle/")
		var articleUserArray = $firebaseArray(articleUser);



		var tagRef = new Firebase(FIREBASE_URL + "tag/")

		var userRef = new Firebase(FIREBASE_URL + "users/");
		var ref = new Firebase(FIREBASE_URL);

	    var authData = ref.getAuth();
		if (authData) {
		  var currentUser = authData;
		};
		$scope.test = "test";
		articleUserArray.$loaded(function(){
		writingRef.on("child_added",function(snapshot){
			var writingKey = snapshot.key();
			var writingVal = snapshot.val();
			articleUser.child(currentUser.uid + "/" + writingKey).orderByChild('time').limitToLast(2).once("value",function(snapshot){
				if(snapshot.val() !== null){
					$scope.value = writingVal;
					console.log(writingVal);
				}; // if 

			});
		});
	})//articleUserArray $loaded
		


	}]); //controller