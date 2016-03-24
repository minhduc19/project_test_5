
myApp.controller('ArticleDisplay', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		$scope.message = $rootScope.message;
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);	
			var articleId =  $routeParams.articleId;
			var sentenceId =  $routeParams.sentenceId;

			var articleRef = new Firebase(FIREBASE_URL + "article");
			 
			var senInArticle = new Firebase(FIREBASE_URL + "article/" + articleId + "/sentences");
			
			
			var sentenceRef = new Firebase(FIREBASE_URL + "sentence");
			var tagRef = new Firebase(FIREBASE_URL + "tag");

			$scope.articleData = $firebaseArray(articleRef);
			$scope.dataSenInArticle = $firebaseArray(senInArticle);
			$scope.sentencesData = $firebaseArray(sentenceRef);
			$scope.tagData = $firebaseArray(tagRef);

			
		


			
			//$scope.tagList = [];	
			$scope.listOfArticle = [];
			articleRef.on('child_added',function(snapshot){
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

			
				
			
			

			//trong phần display article	
			/*
			$scope.articleData.$loaded(function(){
				$scope.listOftag = [];	
				for(a = 0; a < $scope.articleData.length; a++){
					//var sample = "-KDXbRm93LUUA3uA5MvU"
					tagRef.on("child_added",function(snapshot){
					var value = snapshot.val();
					var tagKey = snapshot.key();
						tagRef.child(tagKey + "/article/" + $scope.articleData[a].$id).on('value',function(snapshot){
						if(snapshot.val() !== null){
							$scope.listOftag.push(value);
							};								
						});
					});
				};//for
			});
			*/
			
			/*
			$scope.articleData.$loaded(function(){
				for(i = 0; i < $scope.articleData.length; i++){
					$scope.listOftag = [];
					$scope.listOftag = $scope.articleData.length;
					//$scope.listOftag.push($scope.articleData[i].$id);
				};//for
			});
			*/

			

			
	}]); //controller