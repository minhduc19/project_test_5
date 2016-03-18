myApp.controller('VocabularyController', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject',	
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject) {
		$scope.message = $rootScope.message;
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);	

		

		
		$scope.dataArticle = function (sentence) {
			var sentenceRef = new Firebase(FIREBASE_URL + "sentences");
			//sentenceRef.$set(sentence);
			sentenceRef.push(sentence);
			sentenceRef.on("child_added",function(snapshot,prevChildKey){
				var newPost = snapshot.val();
				$scope.para = newPost.para;
				console.log("hello");

				 

			});
			
		
		};	
	

	}]); //controller