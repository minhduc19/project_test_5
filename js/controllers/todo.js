myApp.controller('SuccessController', ['$scope','$rootScope','$routeParams','$firebaseAuth',
					'$firebaseArray','FIREBASE_URL','$firebaseObject',
	function($scope,$rootScope,$routeParams,$firebaseAuth,$firebaseArray,FIREBASE_URL,$firebaseObject) {
		$scope.message = $rootScope.message;
		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);	

			auth.$onAuth(function(authUser){
				if(authUser){
				var todosRef = new Firebase(FIREBASE_URL + 'users/' + 
					$rootScope.currentUser.$id + '/todos');
				var doingRef = new Firebase(FIREBASE_URL + 'users/' + 
					$rootScope.currentUser.$id + '/doing');
				var doneRef = new Firebase(FIREBASE_URL + 'users/' + 
					$rootScope.currentUser.$id + '/done');

				var todosInfo = $firebaseArray(todosRef);
				var	doingInfo = $firebaseArray(doingRef);
				var	doneInfo = $firebaseArray(doneRef);

					$scope.todos = todosInfo;
					$scope.doings = doingInfo;
					$scope.dones = doneInfo;


					 angular.element(document).ready(function () {
        			  $('[data-toggle="tooltip"]').tooltip() });  
        			  //function cho tooltip  

					/*
					todosInfo.$loaded().then(function(data){
						$rootScope.howManyTodos = todosInfo.length;
					}); // makesure data is loaded 
					*/

					todosInfo.$watch(function(data){
						$rootScope.howManytodos = todosInfo.length;

					}); // makesure data is loaded 

					doingInfo.$watch(function(data){
						$rootScope.howManydoing = doingInfo.length;
					}); // makesure data is loaded 

					doneInfo.$watch(function(data){
						$rootScope.howManydone = doneInfo.length;
					}); // makesure data is loaded 


			$scope.addTodo = function(){
				var importance = $scope.importance;
				var urgency = $scope.urgency;
				var level = importance*urgency;
				var myTodo = {todo : $scope.todoName, time : Firebase.ServerValue.TIMESTAMP, level : level,
								importance : importance, urgency : urgency};
				todosRef.push(myTodo);
				$scope.todoName = ""; //return the add todo back to blank
				};//addTodo

			$scope.moveToDoing = function(todo){
				if (todo.details == null){
				    todo.details = "";
				}
				//var todoData = {doing : todo.todo, time:Firebase.ServerValue.TIMESTAMP, details: todo.details, level : todo.level,
							//importance : todo.importance, urgency : todo.urgency };

					//data = $firebaseObject(todo);
					//$scope.test = data;

				var todoRef = new Firebase(FIREBASE_URL + 'users/' + 
				$rootScope.currentUser.$id + '/todos/' + todo.$id);
				var recordRemove = $firebaseObject(todoRef);
				recordRemove.$remove();	
				delete todo["$id"];
				delete todo["$priority"];
				var data = angular.fromJson(angular.toJson(todo));
				doingRef.push(data);

					
				

			};//add to doing 
			$scope.moveToDone = function(doing){
				var doingRef = new Firebase(FIREBASE_URL + 'users/' + 
								$rootScope.currentUser.$id + '/doing/' + doing.$id);
				var recordRemove = $firebaseObject(doingRef);
				recordRemove.$remove();	

				delete doing["$id"];
				delete doing["$priority"];
				var data = angular.fromJson(angular.toJson(doing));
				doneRef.push(data);
				
			};//add to done 
			$scope.deleteTodo=function(key){
				var refDel = new Firebase(FIREBASE_URL + 'users/' + 
										$rootScope.currentUser.$id + '/todos/' + key);
				var record = $firebaseObject(refDel);
				
				record.$remove(key);
			}; //delete a to-do
			
			$scope.moredetail = function(myCheckin){
				myCheckin.show = !myCheckin.show ; 
			};//show to-do detail or not 

			$scope.showEdit = function(myCheckin){
				myCheckin.edit = !myCheckin.edit ; 
			};//show to-do detail or not 

			$scope.editTodo = function(todo){

				var todosRef = new Firebase(FIREBASE_URL + 'users/' + 
					$rootScope.currentUser.$id + '/todos/' + todo.$id);
				delete todo["$id"];
				delete todo["$priority"];
				delete todo["edit"];
				
				var data = angular.fromJson(angular.toJson(todo));
				todosRef.update(data);
				todo.edit = false;
			};//save edit to the database

			$scope.addDetail = function(myTodo){
				var refDetail = new Firebase(FIREBASE_URL + 'users/' + 
										$rootScope.currentUser.$id + '/todos/' + myTodo.$id + '/details');
				
				//var todoArray = $firebaseArray(refDetail);
				
				var myData = {name : myTodo.detail, date : Firebase.ServerValue.TIMESTAMP};
				refDetail.push(myData);
				

			};//add detail to database

			$scope.backTodo = function(doing){
				if (doing.details == null){
			    	doing.details = "";};
					
			
			var doingRef = new Firebase(FIREBASE_URL + 'users/' + 
						$rootScope.currentUser.$id + '/doing/' + doing.$id);
			var recordRemove = $firebaseObject(doingRef);
				recordRemove.$remove();	

				delete doing["$id"];
				delete doing["$priority"];
				var data = angular.fromJson(angular.toJson(doing));
				todosRef.push(data);

			};//return doing to todo

			$scope.backDoing = function(done){
				if (done.details == null){
			    	done.details = "";};

			var doneRef = new Firebase(FIREBASE_URL + 'users/' + 
						$rootScope.currentUser.$id + '/done/' + done.$id);
			var recordRemove = $firebaseObject(doneRef);
				recordRemove.$remove();	

				delete done["$id"];
				delete done["$priority"];
				var data = angular.fromJson(angular.toJson(done));
				doingRef.push(data);
			
			};//return done to doing

			$scope.chooseClass = function(){
				if ($scope.Doneit == 'btn btn-danger'){
					$scope.Doneit = 'btn';
				}else {
					$scope.Doneit = 'btn btn-danger';
					console.log($scope.Doneit);

					
				/*
				if (detail.doneIt == 'btn btn-danger'){
					detail.doneIt = 'btn';
				}else {
					detail.doneIt = 'btn btn-danger';
					*/
				};

			};
					
				};	// User Authenticated
			}); //on Auth


	}]); //controller