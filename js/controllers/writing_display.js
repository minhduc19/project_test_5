
myApp.controller('WritingDisplay', ['$templateCache','$route','$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($templateCache,$route,$scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {

	$scope.message = $rootScope.message;
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);
		//console.log($stateParams);	
			var articleId =  $stateParams.articleId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
		
			var writingRef = new Firebase(FIREBASE_URL + "writing");
			var writingObj = $firebaseObject(writingRef);
			 
			var senInArticle = new Firebase(FIREBASE_URL + "article/" + articleId + "/sentences");
			
			
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");
			var tagObj = $firebaseObject(tagRef);

			var writingData = $firebaseArray(writingRef);
			$scope.dataSenInArticle = $firebaseArray(senInArticle);
			$scope.sentencesData = $firebaseArray(sentenceRef);
			$scope.tagData = $firebaseArray(tagRef);
		
			writingData.$loaded(function(){
				$scope.len = writingData.length;
			});
			var number = 2;
			function loadWriting(testNumber){ //function để dùng cho pagination dạng đơn giản 
				
				this.number = number;
				number = number + testNumber;
				$scope.test = number;
				if(number <= 2){
					$scope.lessDisable = true;
					$scope.moreDisable = false;
				}else if(number > 2 && number < $scope.len){
					$scope.moreDisable = false;
					$scope.lessDisable = false;
				}else if(number >= $scope.len){
					$scope.moreDisable = true;
					$scope.lessDisable = false;
				};
				$scope.listOfWriting = [];
				tagObj.$loaded(function(){
					writingRef.limitToLast(number).on('child_added',function(snapshot){
					//console.log(snapshot.val());
					var key = snapshot.key();
					var article = snapshot.val();
					article.articleKey = key;
					var gram = 0; 
					var structure = 0;
					var spec = 0;
					tagRef.on('child_added',function(snapshot){
					var value = snapshot.val();
					var tagKey = snapshot.key();						
						tagRef.child(tagKey + "/article/" + key).once('value',function(snapshot){
						if(snapshot.val() !== null){
							//article.tag = value;
							if(value.type == 1){
									gram++;
								}else if(value.type == 2){
									structure++;
								}else{
									spec++;
								};//else	
							};	
						});
					});
					article.grammar = gram;
					article.structure = structure;
					article.spec = spec;
					$scope.listOfWriting.push(article);
					return $scope.listOfWriting;
				}); 
				});//loaded
			};
		//};


			$scope.moreData = function (){
			 	  loadWriting(2);
			};
			$scope.lessData = function (){
			 	  loadWriting(-2);
			};
			 
			 writingObj.$loaded(function(){
			  loadWriting(0);	
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

			
	}]) //controller