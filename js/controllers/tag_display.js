
myApp.controller('TagDisplay', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location','sendData',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location,sendData) {
			
			//$scope.testData = sendData.getList();//cách truyền dữ liệu giữa các controller 

			var tagId =  $stateParams.tagId;
			$scope.tagId =  $stateParams.tagId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");

			var writingSenRef = new Firebase(FIREBASE_URL + "writingSen");
			
			$scope.listOfSentence = [];

			sentenceRef.on('child_added',function(snapshot){
				var key = snapshot.key();
				var sentence = snapshot.val();
				sentenceRef.child(key + "/tag/" + tagId).on('value',function(snapshot){
					if(snapshot.val() !== null){
						$scope.listOfSentence.push(sentence);
						};	
					});
				});

			writingSenRef.on('child_added',function(snapshot){
				var key = snapshot.key();
				var sentence = snapshot.val();
				writingSenRef.child(key + "/tag/" + tagId).on('value',function(snapshot){
					if(snapshot.val() !== null){
						$scope.listOfSentence.push(sentence);
						};	
					});
				});



			
	}]); //controller