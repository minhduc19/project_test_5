
myApp.controller('SentenceArticleDisplay', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		
			var articleId = $stateParams.articleId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");

			var writingRef = new Firebase(FIREBASE_URL + "writing");
			var writingSenRef = new Firebase(FIREBASE_URL + "writingSen");
			var writingParaRef = new Firebase(FIREBASE_URL + "writingPara");

			var writingObj = $firebaseObject(writingRef);
			var writingSenObj = $firebaseObject(writingSenRef);
			var writingParaObj = $firebaseObject (writingParaRef);
			var tagObj = $firebaseObject(tagRef);

			

			
				
			var test;
			var tagValue;
			var tagKey;
			var sentenceObj = $firebaseObject(sentenceRef);
			var tagObj = $firebaseObject(tagRef);

			
			sentenceObj.$loaded(function(){
			$scope.listOfSentence = [];
			sentenceRef.on("child_added", function(snapshot){
				
			    var sentenceValue = snapshot.val();
			    var sentenceKey = snapshot.key();
				sentenceValue.key = sentenceKey;
				sentenceRef.child(sentenceKey + "/articleId/" + articleId).on("value",function(snapshot){
					var tagOfSentence = [];
					if(snapshot.val() !== null){

							tagObj.$loaded(function(){
							tagRef.on('child_added',function(snapshot){
								tagValue = snapshot.val();
								tagKey = snapshot.key();
							
								tagRef.child(tagKey + "/sentence/" + sentenceKey).on('value',function(snapshot){
								if(snapshot.val() !== null){
									//article.tag = value;
									tagValue.tagkey = tagKey;
									tagOfSentence.push(tagValue);
									};//if	
								});
							});
						});//tagObj.$loaded

						sentenceValue.valueoftag = tagOfSentence;
						$scope.listOfSentence.push(sentenceValue);
					}//if
				});
			});
			$scope.len = 0;
				for(i=0; i < $scope.listOfSentence.length;i++ ){									
						$scope.len++;
				};
		});//loaded

			$scope.data = function(sentence){
				$scope.test = sentence;
				$scope.test.hideEnglish = true;
			};
			$scope.prac = 0;
			$scope.gone = true;
			$scope.practiceSentence = function(practiceSen){	
				if($scope.test.practice != null){
					$scope.test.practice = practiceSen;
					$scope.praticeSen = null;
					$scope.completion = Math.round(($scope.prac/$scope.len)*100);
					
				}else{
					$scope.prac ++;
					$scope.test.practice = practiceSen;
					$scope.praticeSen = null;
					$scope.completion = Math.round(($scope.prac/$scope.len)*100);
				};
				if($scope.prac == $scope.len){
						$scope.madeId = true;
						$scope.gone = false;
					};
					
			};

			$scope.return = function(){
				$scope.test.hideEnglish = false;
			}

			$scope.tagDetail = function(tag){
				tag.show = true;
					if(tag.display == true){
						tag.display = false
						;
					}else if (tag.display == false || tag.display == null){
						tag.display = true;
					}
			};

			$scope.tagClass = function (tag){
				if(tag.display == null || tag.display == false)
				{
				if (tag.type ==  1) {
					tag.class = "btn btn-danger";
					} else if (tag.type == 2) {
					tag.class = "btn btn-warning";
					} else {
					tag.class = "btn btn-info";
					};
				} else {
					tag.class = "btn btn-default";
				}
				return tag.class;
			};		
	}]); //controller