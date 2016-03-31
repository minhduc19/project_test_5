


myApp.controller('VocabularyController', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		$scope.message = $rootScope.message;
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);	
			var articleId =  $routeParams.articleId;
			var sentenceId =  $routeParams.sentenceId;

			var articleRef = new Firebase(FIREBASE_URL + "article/" + articleId );
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");

			var writingRef = new Firebase(FIREBASE_URL + "writing");

			var tagRef = new Firebase(FIREBASE_URL + "tag");
			$scope.listOfTag = $firebaseArray(tagRef);

			$scope.articleData = $firebaseObject(articleRef);
			$scope.sentencesData = $firebaseArray(sentenceRef);

			var senInArticle = new Firebase(FIREBASE_URL + "article/" + articleId + "/sentences");
			
				$scope.dataSenInArticle = $firebaseArray(senInArticle);
			
			$scope.dataArticle = function(article) {
				var articleRef = new Firebase(FIREBASE_URL + "article");
				article.time = Firebase.ServerValue.TIMESTAMP;
				articleRef.push(article);

				articleRef.limitToLast(1).once("child_added",function(snapshot,prevChildKey){
					$location.path('/input_sentence/' + snapshot.key());
				});
		};	//$scope.dataArticle

				$scope.newlyAdded = [];
				$scope.dataSentence = function(sentence){
				var data = {};
				data[articleId] = "true"
				sentence.articleId = data;	
				sentenceRef.push(sentence);
				sentenceRef.limitToLast(1).once("child_added",function(childSnapshot){
					
					$location.path('/input_tag/' + articleId + "/" + childSnapshot.key());
					//alert("inserted");
				});

			};// $scope.dataSentence//thêm sentence vào database 

			$scope.dataTag = function(tag){

				tagRef.push(tag);
				tagRef.limitToLast(1).once("child_added",function(childSnapshot){
					var sentenceRef = new Firebase(FIREBASE_URL + "sentence/" + sentenceId + "/tag");
					var tagRef = new Firebase(FIREBASE_URL + "tag/" + childSnapshot.key() + "/sentence");
					tagRef.child(sentenceId).set("true");
					
					var tagRef = new Firebase(FIREBASE_URL + "tag/" + childSnapshot.key() + "/article");
					tagRef.child(articleId).set("true");
					
					
					
					var keyValue = childSnapshot.key()
					sentenceRef.child(keyValue).set("true");
					});	
			};
			$scope.sentenceId = sentenceId;


			$scope.updateTag = function(tag){
			
				tagRef.child(tag.$id + "/article/" + articleId).set("true");
				tagRef.child(tag.$id + "/sentence/" + sentenceId).set("true");
				sentenceRef.child(sentenceId + "/tag/" + tag.$id).set("true");
				console.log(tag);
			};

			$scope.detailTag = function(tag){
				tag.show = !tag.show
			};

			$scope.dataWriting = function(writing){

				writing.time = Firebase.ServerValue.TIMESTAMP;
				writingRef.push(writing);

				writingRef.limitToLast(1).once("child_added",function(snapshot,prevChildKey){
					$location.path('/input_sentence/' + snapshot.key());
				});


			};




			//test dùng cho reference
			$scope.test = function(){
				var sample = ["-KDScBMtndWMmzsZygbS","-KDScC_0KpTfhQciTPEd"];
				var ref = new Firebase(FIREBASE_URL + "tag");
					for (i = 0; i < 2; i++) {
   						ref.orderByKey().equalTo(sample[i]).on("child_added", function(snapshot) {
  						console.log(snapshot.val());
  						}); //on("child_added"
						};//for 
					
			};

			$scope.test1 = function(){
				$scope.list = [];
				var sample = "-KDUB1u9P1n4JdkTkVJz";
				sentenceRef.on("child_added",function(snapshot){
					var value = snapshot.val();
					var sentenceKey = snapshot.key();
					sentenceRef.child(sentenceKey + "/tag/" + sample).once('value',function(snapshot){
						if(snapshot.val() !== null){
							value.test = "hello";
							$scope.list.push(snapshot.val());	
						};
					});

				});
				
			};



	}]); //controller