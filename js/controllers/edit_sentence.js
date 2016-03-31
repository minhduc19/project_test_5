
myApp.controller('SentenceEdit', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		
			var sentenceId =  $routeParams.sentenceId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");
			$scope.listOfTag = $firebaseArray(tagRef);

				sentenceRef.orderByKey().equalTo(sentenceId).on("child_added", function(snapshot) {
		
					$scope.listOfSentence = snapshot.val();
					$scope.listOfSentence.key = snapshot.key();
					}); //on("child_added"

				$scope.tagOfSentence = [];			
				tagRef.on('child_added',function(snapshot){
					var tagValue = snapshot.val();
					var tagKey = snapshot.key();
				
					tagRef.child(tagKey + "/sentence/" + sentenceId).on('value',function(snapshot){
						if(snapshot.val() !== null){
							//article.tag = value;
							tagValue.tagkey = tagKey;
							$scope.tagOfSentence.push(tagValue);
							};//if	
						});
					});
						
				$scope.editContent = function (sample,para){
					sentenceRef.child(sentenceId).update({sample: sample, para : para});
				};
				

				$scope.dataTag = function(tag,article){

					tagRef.push(tag);
					tagRef.limitToLast(1).once("child_added",function(childSnapshot){
						var sentenceRef = new Firebase(FIREBASE_URL + "sentence/" + sentenceId + "/tag");
						var tagRef = new Firebase(FIREBASE_URL + "tag");
						var keyValue = childSnapshot.key()
						tagRef.child(childSnapshot.key() + "/sentence/" + sentenceId).set("true");		
						
						tagRef.child(childSnapshot.key() + "/article").update(article);
						
						sentenceRef.child(keyValue).set("true");
						});	
				};


				$scope.updateTag = function(tag, article){
					var articleId = Object.keys(article)
					tagRef.child(tag.$id + "/article/" + articleId).set("true");
					tagRef.child(tag.$id + "/sentence/" + sentenceId).set("true");
					sentenceRef.child(sentenceId + "/tag/" + tag.$id).set("true");
					console.log(tag);
				};

				$scope.detailTag = function(tag){
				tag.show = !tag.show
			};
			

	}]); //controller