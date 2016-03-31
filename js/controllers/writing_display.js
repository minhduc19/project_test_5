
myApp.controller('WritingDisplay', ['$templateCache','$route','$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($templateCache,$route,$scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {

	 //   angular.element(document).ready(function () {
  //      	var currentPageTemplate = $route.current.templateUrl;
		// $templateCache.remove(currentPageTemplate);
		// $route.reload();
  //   });	


	
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

				// var currentPageTemplate = $route.current.templateUrl;
				// 	$templateCache.remove(currentPageTemplate);
				// 	$route.reload();
				
		 function loadsomething() {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
					$route.reload();
        }
    };
};

				 
			//new loadsomething();

			var number = 2;

			  // angular.element(document).ready(function () {
   		// 		 new loadWriting(0);
    	// 			});	

//  function loadsomething() {
//     var executed = false;
//     return function () {
//         if (!executed) {
//             executed = true;
// 					$route.reload();
//         }
//     };
// };


			$scope.articleData.$loaded().then(function(){
				$scope.test = "hello";
			});



			function loadWriting(addNumber){ //function để dùng cho pagination dạng đơn giản 


				this.addNumber = addNumber;
				number = number + addNumber;

				$scope.listOfWriting = [];
					writingRef.orderByChild('time').limitToFirst(number).on('child_added',function(snapshot){
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



				}); 
			};


			$scope.moreData = function (){

			 	 new loadWriting(2);

			};

			$scope.lessData = function (){
			 	 new loadWriting(-2);
			};
				 
				 new loadWriting(0);

			
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

			
			
	
			
 //Reloading the page is done by $window.location.reload(); Reloading the route is done by $route.reload();

			
	}]) //controller