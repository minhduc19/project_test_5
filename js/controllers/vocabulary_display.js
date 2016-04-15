
myApp.controller('VocabularyDisplay', ['$scope','$rootScope','$routeParams','$firebaseAuth',
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
			
					$scope.listOfSen = [];
					$scope.dataSenInArticle.$loaded(function(){
					for (i = 0; i < $scope.dataSenInArticle.length; i++) {
   						sentenceRef.orderByKey().equalTo($scope.dataSenInArticle[i].$value).on("child_added", function(snapshot) {
  						$scope.listOfSen.push(snapshot.val());
  						console.log(snapshot.val().tag);
  						}); //on("child_added"
						};//for 
					});

			$scope.tagDetail = function(tag){
				var tagDetail = new Firebase(FIREBASE_URL + "tag/" + tag.tagId);
					tag.tagData = $firebaseObject(tagDetail);
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