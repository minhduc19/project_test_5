
myApp.controller('TagDisplay', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		
			var tagId =  $routeParams.tagId;
			$scope.tagId =  $routeParams.tagId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");
			
			$scope.listOfSentence = [];
			sentenceRef.on('child_added',function(snapshot){
				var key = snapshot.key();
				var sentence = snapshot.val();
				var sentenceInTag = [];

				sentenceRef.child(key + "/tag/" + tagId).on('value',function(snapshot){
					if(snapshot.val() !== null){
						//value.tagkey = tagKey;
						$scope.listOfSentence.push(sentence);
						};	

				});
				});


			
	}]); //controller