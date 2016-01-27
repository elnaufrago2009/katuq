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

   // opciones de busqueda 

   // parametros iniciales
   if($rootScope.lugar == undefined){
    $rootScope.lugar = "Lugares";  
   }
  if ($rootScope.precio == undefined) {
    $rootScope.precio = "Precios";  
  };  
  if ($rootScope.estrella == undefined) {
    $rootScope.estrella = "Estrellas";  
  };  
  if ($rootScope.ultimos == undefined) {
    $rootScope.ultimos = "Ultimos";  
  };
  

  // Lugares
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



  // Precios
  $scope.changePrecio = function(precio) {
    if(precio == 'ninguno'){
      $rootScope.precio = 'Precios';
    }
    if(precio == 'precio_baratos'){
      $rootScope.precio = 'Precios mas Baratos';
    }
    if(precio == 'precio_caros'){
      $rootScope.precio = 'Precios mas Caros';
    }    
  }



  // Estrellas
  $scope.changeEstrellas = function(estrella) {
    if(estrella == 'ninguno'){
      $rootScope.estrella = 'Estrellas';
    }
    if(estrella == 'mejor_calificados'){
      $rootScope.estrella = 'Mejor Calificados';
    }
    if(estrella == 'peor_calificados'){
      $rootScope.estrella = 'Peor Calificados';
    }    
  }



  // Ultimos
  $scope.changeUltimos = function(ultimo) {
    if(ultimo == 'ninguno'){
      $rootScope.ultimos = 'Ultimos';
    }
    if(ultimo == 'ultimos_agregados'){
      $rootScope.ultimos = 'Ultimos Agregados';
    }
    if(ultimo == 'ultimos_antiguos'){
      $rootScope.ultimos = 'Mas Antiguos';
    }    
  }


});