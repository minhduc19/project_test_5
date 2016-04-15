myApp.controller('RegistrationController',
  ['$scope', 'Authentication','$location',
  function($scope, Authentication,$location) {
  
  $scope.login = function() {
    Authentication.login($scope.user);
  }; //login

  $scope.logout = function() {
    Authentication.logout();
    $location.path('/login');
  }; //logout

  $scope.register = function() {
    Authentication.register($scope.user);
  }; // register


  $scope.test = {value1 :true};
  console.log($scope.test);

  $scope.count = 0;
  $scope.hello = function(){
    console.log($scope.test);
    $scope.count++;
  };
}]); // Controller