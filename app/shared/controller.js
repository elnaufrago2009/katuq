app.controller('menuController', function($scope){

});

app.controller('statusLoginController', function ($scope, $firebaseAuth, $location, $rootScope){
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

  $rootScope.lugar = "Lugares";

  $scope.changeLugar = function(nombre) {
    if(nombre == 'ninguno'){
      $rootScope.lugar = 'Lugares';
    }
    if(nombre == 'ciudad_nueva'){
      $rootScope.lugar = 'Ciudad Nueva';
    }
    if(nombre == 'conosur'){
      $rootScope.lugar = 'Cono Sur';
    }
    if(nombre == 'natividad'){
      $rootScope.lugar = 'Natividad';
    }
    if(nombre == 'centro'){
      $rootScope.lugar = 'Centro';
    }
    if(nombre == 'villani'){
      $rootScope.lugar = 'Villani';
    }

    
    
  }

});