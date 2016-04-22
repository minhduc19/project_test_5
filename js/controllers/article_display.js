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
			var tagObj = new $firebaseObject(tagRef);

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

			function loadPages(addNumber){ 
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
				tagObj.$loaded(function(){
				$scope.listOfArticle = [];
					articleRef.orderByChild('time').limitToLast(number).on('child_added',function(snapshot){
					var key = snapshot.key();
					var article = snapshot.val();
				
					var tagInArticle = [];
					var gram = 0; 
					var structure = 0;
					var spec = 0;
					tagRef.on('child_added',function(snapshot){
					var value = snapshot.val();
					var tagKey = snapshot.key();			
						tagRef.child(tagKey + "/article/" + key).on('value',function(snapshot){
						if(snapshot.val() !== null){
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
					article.key = key;
					$scope.listOfArticle.push(article);


				}); 
				});//loaded
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