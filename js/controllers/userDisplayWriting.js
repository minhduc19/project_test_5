
myApp.controller('userDisplayWriting', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		var ref = new Firebase(FIREBASE_URL);
		var authData = ref.getAuth();
		if (authData) {
		  var currentUser = authData;
		};

		var articleId = $stateParams.articleId;
		var writingRef = new Firebase(FIREBASE_URL + "writing/");
		var writingObj = $firebaseArray(writingRef)
		var articleRef = new Firebase(FIREBASE_URL + "article/");

		var practiceSentence = new Firebase(FIREBASE_URL + "userPractice/")

		var articleUserList = new Firebase(FIREBASE_URL + "userArticle/")
		var articleUserListArr = new $firebaseArray(articleUserList);
		//console.log(articleUserListObj);

		var articleUser = new Firebase(FIREBASE_URL + "userArticle/" + currentUser.uid)
		var articleUserObject = $firebaseObject(articleUser);



		var tagRef = new Firebase(FIREBASE_URL + "tag/")

		var userRef = new Firebase(FIREBASE_URL + "users/");
		
	   
		//$scope.test = "test";
		
		articleUserObject.$watch(function(){
		$scope.writingList = [];
		
		//articleUserListArr.$loaded(function(){
		
		writingRef.on("child_added",function(snapshot){
			var writingKey = snapshot.key();
			var writingVal = snapshot.val();
			
			articleUser.child(writingKey).orderByChild('time').limitToLast(2).once("value",function(snapshot){
				if(snapshot.val() !== null){
					var articleKey = snapshot.key();
					tagRef.on("child_added",function(snapshot){
						var tagKey = snapshot.key();
						var keyValue = snapshot.val();
						tagRef.child(tagKey + "/article/" + articleKey).once("value",function(snapshot){
							var articleTagValue = snapshot.val();
							if(articleTagValue !== null){
								console.log(articleTagValue);
								//console.log(keyValue.type);
								// if(keyValue.type == 2){
								// 	console.log("structure");
								// };
							};
						})
					});
					//console.log()
					$scope.writingList.push(writingVal);
				}; // if 

			});
		});
	//});//articleUserArray $loaded
	});//watch
//});//writingObj loaded

	}]); //controller