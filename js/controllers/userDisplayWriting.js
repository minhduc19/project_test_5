
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

		var articleUser = new Firebase(FIREBASE_URL + "userArticle/" + currentUser.uid)
		var articleUserObject = $firebaseObject(articleUser);

		var tagRef = new Firebase(FIREBASE_URL + "tag/");
		var tagObj = $firebaseObject(tagRef);

		var userRef = new Firebase(FIREBASE_URL + "users/");
		

		articleUserObject.$watch(function(){
		$scope.writingList = [];
		
		writingRef.on("child_added",function(snapshot){
			var writingKey = snapshot.key();
			var writingVal = snapshot.val();
			tagObj.$loaded(function(){
			articleUser.child(writingKey).once("value",function(snapshot){
				if(snapshot.val() !== null){
					userValue = snapshot.val();
					writingVal.key = snapshot.key();
					writingVal.time = userValue.time;
					writingVal.userNumb = Object.keys(writingVal.userPractice).length;
					var articleKey = snapshot.key();
					var gram = 0; 
					var structure = 0;
					var spec = 0;
					tagRef.on("child_added",function(snapshot){
						var tagKey = snapshot.key();
						var keyValue = snapshot.val();
						tagRef.child(tagKey + "/article/" + articleKey).once("value",function(snapshot){
							var articleTagValue = snapshot.val();
							if(articleTagValue !== null){
								if(keyValue.type == 1){
									gram++;
								}else if(keyValue.type == 2){
									structure++;
								}else{
									spec++;
								};//else
							};
						});				
					});
					writingVal.grammar = gram;
					writingVal.structure = structure;
					writingVal.spec = spec;
					$scope.writingList.push(writingVal);
				}; // if 
				});//tagobj loaded
			});
		});

	});//watch


	}]); //controller