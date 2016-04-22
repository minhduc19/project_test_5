
myApp.controller('userPracticeArticle', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location) {
		
		var ref = new Firebase(FIREBASE_URL);
			var authData = ref.getAuth();
			if (authData) {
			  var currentUser = authData;
			};
			
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

			var userPracRef = new Firebase(FIREBASE_URL + "userPractice/" + currentUser.uid);
			var userPracObject = $firebaseObject(userPracRef);
			function loadData(){

				$scope.len = 0;
				$scope.listOfSentence = [];
				sentenceRef.on("child_added", function(snapshot){
					
				    var sentenceValue = snapshot.val();
				    var sentenceKey = snapshot.key();
					sentenceValue.key = sentenceKey;
					sentenceRef.child(sentenceKey + "/articleId/" + articleId).on("value",function(snapshot){
						var tagOfSentence = [];
						if(snapshot.val() !== null){
							userPracRef.on("child_added",function(pracSen){
										userPracRef.child(pracSen.key() + "/" + sentenceKey).once("value",function(praticeSenCheck){
											if(praticeSenCheck.val() !== null){
												//console.log(pracSen.val().practice);
												practiceSenVal = pracSen.val().practice

											};
										});
									});
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
							sentenceValue.latestPractice = practiceSenVal;
							sentenceValue.valueoftag = tagOfSentence;
							$scope.listOfSentence.push(sentenceValue);
							$scope.len++;
						}//if
					});
				});

			}; // function loadData

			function  loadTag(tagId){
				$scope.listOfSentence = [];
				sentenceRef.on('child_added',function(snapshot){
					var key = snapshot.key();
					var sentence = snapshot.val();
					sentenceRef.child(key + "/tag/" + tagId).on('value',function(snapshot){
						if(snapshot.val() !== null){
							$scope.listOfSentence.push(sentence);
							};	
						});
					});

				writingSenRef.on('child_added',function(snapshot){
					var key = snapshot.key();
					var sentence = snapshot.val();
					writingSenRef.child(key + "/tag/" + tagId).on('value',function(snapshot){
						if(snapshot.val() !== null){
							$scope.listOfSentence.push(sentence);
							};	
						});
					});

			}; // function loadtag


			//bắt đầu thực hiện load data
			loadData();
			userPracObject.$watch(function(){
				loadData();
			});

			$scope.data = function(sentence){
				$scope.test = sentence;
				$scope.test.hideEnglish = true;
			};
			$scope.prac = 0;
			$scope.gone = true;
			$scope.practiceSentence = function(practiceSen){
				

				if($scope.test.practice != null){
					$scope.test.practice = practiceSen;					
				}else{
					$scope.prac ++;
					$scope.test.practice = practiceSen;
				};
				$scope.praticeSen = null;
				$scope.completion = Math.round(($scope.prac/$scope.len)*100);
				if($scope.prac == $scope.len){
						$scope.madeId = true;
						$scope.gone = false;
					};
				$scope.test.hideEnglish = false;				 
			};

			$scope.$watch('completion',function(){
				if($scope.completion > 0){
					$scope.showSave = true;
				};
			},true);

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
				};
				return tag.class;
			};	

			//code dành cho phần practice
			$scope.historyList = "Please Wait";


			//load history practice of a sentence
			$scope.practiceHistory = function(sentenceKey){
				userPracObject.$loaded(function(){
					$scope.history = [];			
					userPracRef.on("child_added",function(practiceData){

						userPracRef.child(practiceData.key() + "/" + sentenceKey).once("value",function(practiceValue){
							if(practiceValue.val() !== null){
								$scope.history.push(practiceData.val());	
							};
						});
					});//loaded
				});
			};

			$scope.tagData = function(tag){
					loadTag(tag.tagkey);	
					$scope.tagRelate = tag.name;
				};


	}]); //controller