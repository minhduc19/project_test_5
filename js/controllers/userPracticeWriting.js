

myApp.controller('userPracticeWriting', ['$scope','$rootScope','$stateParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject','$location','sendData',
	function($scope,$rootScope,$stateParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject,$location,sendData) {
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
				tagObj.$loaded(function(){
				$scope.len = 0;
				$scope.paraList = [];			
				writingParaRef.on("child_added",function(snapshot){
					var paraKey =snapshot.key();
					var paraValue = snapshot.val();
					writingParaRef.child(paraKey + "/article/" + articleId).on("value",function(snapshot){
						if(snapshot.val()!==null){
							$scope.senList = [];
							writingSenRef.on("child_added",function(snapshot){
								var sentenceKey = snapshot.key();
								var sentenceValue = snapshot.val();
								sentenceValue.key = sentenceKey;
								var practiceSenVal = "test";
								writingSenRef.child(sentenceKey + "/para/" + paraKey).on("value",function(snapshot){	
									if(snapshot.val() !== null){
										userPracRef.on("child_added",function(pracSen){
											userPracRef.child(pracSen.key() + "/" + sentenceKey).once("value",function(praticeSenCheck){
												if(praticeSenCheck.val() !== null){
													//console.log(pracSen.val().practice);
													practiceSenVal = pracSen.val().practice

												};
											});
										});
										$scope.listOfTag = [];
										tagRef.on("child_added",function(snapshot){
											var tagKey = snapshot.key();
											var tagValue = snapshot.val();
											tagValue.tagkey = tagKey;											
											tagRef.child(tagKey + "/sentence/" + sentenceKey).on("value",function(snapshot){
												if(snapshot.val() !== null){
													$scope.listOfTag.push(tagValue);
												}		
											})
										});

										sentenceValue.tag = $scope.listOfTag;
										sentenceValue.latestPractice = practiceSenVal;
										$scope.senList.push(sentenceValue);
										$scope.len++;
									}
								})
							});
							$scope.paraList.push($scope.senList);
						}//if
					});
				});
				
			});//loaded

			};


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





			
	}]); //controller