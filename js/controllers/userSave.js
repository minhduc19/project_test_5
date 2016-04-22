
myApp.controller('userSave', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
				
				var articleId = $stateParams.articleId;
				var writingRef = new Firebase(FIREBASE_URL + "writing/");
				var articleRef = new Firebase(FIREBASE_URL + "article/");
				var practiceSentence = new Firebase(FIREBASE_URL + "userPractice/")
				var articleUser = new Firebase(FIREBASE_URL + "userArticle/")

				var userRef = new Firebase(FIREBASE_URL + "users/");
				var ref = new Firebase(FIREBASE_URL);

			    var authData = ref.getAuth();
				if (authData) {
				  var currentUser = authData;
				};

				console.log(currentUser);
				
				function saveDataWriting(list,dataRef){
					dataRef.child(articleId + "/userPractice/" + currentUser.uid).set(true);
					articleUser.child(currentUser.uid + "/" + articleId + "/time").set(Firebase.ServerValue.TIMESTAMP);
					var paraLen = list.length;
					for(i = 0; i < paraLen; i++){
						sentenceLen = list[i].length;
						var sentenceList = list[i];
						for(j=0; j < sentenceLen; j++){
							if(sentenceList[j].practice != null){
								var data = {}
								data["practice"] =  sentenceList[j].practice;
								var sentenceKey = sentenceList[j].key
								data[sentenceKey] = true ;
								data.time = Firebase.ServerValue.TIMESTAMP;
								practiceSentence.child(currentUser.uid).push(data);
								console.log("ok");
							}//if
						};//for(j=0;
					};//for(i 
				};

				function saveDataArticle(list,dataRef){
					dataRef.child(articleId + "/userPractice/" + currentUser.uid).set(true);
					articleUser.child(currentUser.uid + "/" + articleId + "/time").set(Firebase.ServerValue.TIMESTAMP);
					var articleLen = list.length;
					for(i = 0; i < articleLen; i++){
						if(list[i].practice != null){
							var data = {}
							data["practice"] =  list[i].practice;
							var sentenceKey = list[i].key
							data[sentenceKey] = true ;
							data.time = Firebase.ServerValue.TIMESTAMP;
							practiceSentence.child(currentUser.uid).push(data);
							console.log("ok");
						}//if	
					};//fori
				};

				$scope.saveWriting = function(paraList){
					saveDataWriting(paraList,writingRef);			
				};

				$scope.saveArticle = function(listOfSentence){
					saveDataArticle(listOfSentence,articleRef);
				};
	}]); //controller