
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

			var articleData = $firebaseArray(articleRef);
			$scope.dataSenInArticle = $firebaseArray(senInArticle);
			$scope.sentencesData = $firebaseArray(sentenceRef);
			$scope.tagData = $firebaseArray(tagRef);
		
			var number = 2;
			articleData.$loaded(function(){
				$scope.len = 0;
				for(i=0;i<articleData.length;i++){
					$scope.len ++;
				};
			});

			function loadWriting(addNumber){ //function để dùng cho pagination dạng đơn giản 

				this.addNumber = addNumber;
				number = number + addNumber;
				if(number <= 2){
					$scope.lessDisable = true;
					$scope.moreDisable = false;
				}else if(number > 2 && number < $scope.len){
					$scope.moreDisable = false;
					$scope.lessDisable = false;
				}else {
					$scope.moreDisable = true;
					$scope.lessDisable = false;
				};

				//function loadWriting(addNumber){
				this.addNumber = addNumber;
				number = number + addNumber; 
				$scope.listOfWriting = [];
					writingRef.orderByChild('time').limitToLast(number).on('child_added',function(snapshot){
					//console.log(snapshot.val());
					var key = snapshot.key();
					var article = snapshot.val();
				
					var tagInArticle = [];
					tagRef.on('child_added',function(snapshot){
					var value = snapshot.val();

					var tagKey = snapshot.key();
						
						tagRef.child(tagKey + "/article/" + key).on('value',function(snapshot){
						if(snapshot.val() !== null){
							//article.tag = value;
							value.tagkey = tagKey;
							tagInArticle.push(value);
							};	
						});
					});
					article.tag = tagInArticle;
					article.key = key;
					$scope.listOfWriting.push(article);
					return $scope.listOfWriting;


				}); 
			};
		//};

			loadWriting(0);

			$scope.moreData = function (){
			 	 new loadWriting(2);
			};
			$scope.lessData = function (){
			 	 new loadWriting(-2);
			};
			 

			 writingObj.$loaded(function(){
			  new loadWriting(0);	
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