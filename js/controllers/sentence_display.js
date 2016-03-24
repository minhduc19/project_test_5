
myApp.controller('SentenceDisplay', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		
			var articleId =  $routeParams.articleId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");
			

			articleRef.orderByKey().equalTo(articleId).on("child_added", function(snapshot) {
							var article = snapshot.val();
							article.key = snapshot.key();
								$scope.listOfArticle = article;
								}); //on("child_added"


			$scope.listOfSentence = [];
			sentenceRef.on("child_added", function(snapshot){
				
				var sentenceValue = snapshot.val();
				var sentenceKey = snapshot.key();
				sentenceValue.key = sentenceKey;
				sentenceRef.child(sentenceKey + "/articleId/" + articleId).on("value",function(snapshot){
					
					if(snapshot.val() !== null){
						var tagOfSentence = [];
					

							tagRef.on('child_added',function(snapshot){
								var tagValue = snapshot.val();
								var tagKey = snapshot.key();
							
								tagRef.child(tagKey + "/sentence/" + sentenceKey).on('value',function(snapshot){
								if(snapshot.val() !== null){
									//article.tag = value;
									tagValue.tagkey = tagKey;
									tagOfSentence.push(tagValue);
									};//if	
								});
							});

						sentenceValue.valueoftag = tagOfSentence;
						$scope.listOfSentence.push(sentenceValue);
					}//if
				});

			});

			
			$scope.tagDetail = function(tag){
				var tagDetail = new Firebase(FIREBASE_URL + "tag/" + tag.tagId);
					tag.show = "true";
			};

			$scope.tagClass = function (tag){
				if (tag.type ==  1) {
					tag.class = "btn btn-danger";
					} else if (tag.type == 2) {
					tag.class = "btn btn-warning";
					} else {
					tag.class = "btn btn-info";
					}
				return tag.class;
			};		
	}]); //controller