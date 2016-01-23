app.controller('menuController', function($scope){

});

app.controller('statusLoginController', function($scope, $firebaseAuth, $location){
	var ref = new Firebase("https://katuq.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);    

    $scope.authObj.$onAuth(function(authData) {
  		if (authData) {  			
  			$scope.status = true;
  			$scope.authData = authData;  			
    		console.log("Logged in as:", authData);
  		} else {
  			$scope.authData = authData;
  			$scope.status = false;
    		console.log("Logged out");
  		}
	});

	$scope.unlogin = function (){
		$scope.authObj.$unauth();
		$location.path('/items_index');
	}

});