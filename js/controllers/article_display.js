


myApp.controller('ArticleDisplay', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		$scope.message = $rootScope.message;
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);	
			var articleId =  $routeParams.articleId;
			var sentenceId =  $routeParams.sentenceId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			var writingRef = new Firebase(FIREBASE_URL + "writing");
			 
			var senInArticle = new Firebase(FIREBASE_URL + "article/" + articleId + "/sentences");
			
			
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");

			$scope.articleData = $firebaseArray(articleRef);
			$scope.dataSenInArticle = $firebaseArray(senInArticle);
			$scope.sentencesData = $firebaseArray(sentenceRef);
			$scope.tagData = $firebaseArray(tagRef);

			var number = 2;

			function loadPages(addNumber){ //function để dùng cho pagination dạng đơn giản 
				this.addNumber = addNumber;
				number = number + addNumber;

				$scope.listOfArticle = [];
					articleRef.orderByChild('time').limitToFirst(number).on('child_added',function(snapshot){
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
					$scope.listOfArticle.push(article);


				}); 
			};



			$scope.moreData = function (){

			 	 new loadPages(2);

			};

			$scope.lessData = function (){
			 	 new loadPages(-2);
			};
				new loadPages(0);


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