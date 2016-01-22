app.controller('loginController', function ($scope, $firebaseAuth, $location){

	var ref = new Firebase("https://katuq.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

    $scope.login = function(){
    	$scope.authObj.$authWithPassword({
	  		email: $scope.email,
	  		password: $scope.password
		}).then(function(authData) {
	  		console.log("Logged in as:", authData.uid);
	  		$location.path('/admin')
		}).catch(function(error) {
	  		console.error("Authentication failed:", error);
		});
    }
		
});

app.controller('loginRegistroController', function ($scope, $firebaseAuth){
	var ref = new Firebase("https://katuq.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

	$scope.registrar = function (){
		$scope.authObj.$createUser({
	  		email: $scope.email,
	  		password: $scope.password
		}).then(function(userData) {
	  		console.log("User " + userData.uid + " created successfully!");
	  		return $scope.authObj.$authWithPassword({
	    		email: $scope.email,
	    		password: $scope.password
	  		});
		}).then(function(authData) {
	  		console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
	  		console.error("Error: ", error);
		});
	}
		
});