app.factory('items', function($firebaseArray){

	var items = $firebaseArray(new Firebase("https://katuq.firebaseio.com/items"));

	var option = {
		getAll: function(){
			return items;
		},
		add: function(item){			
			items.$add(item);
		},
		show: function(){

		},
		edit: function(item){
			//var index_item = $scope.items.indexOf(item);
			//items[index_item] = item;
			items.$save(item);
		},
		delete: function(item){
			items.$remove(item);
			//items.splice(index,1);
		}
	}

	return option;
});


// controller items index
app.controller('itemsIndexController', function($scope, items){
	$scope.items = items.getAll();
});


// controller items admin
app.controller('itemsAdminController', function($scope, items, $uibModal, $firebaseAuth, $firebaseArray){

	var ref = new Firebase("https://katuq.firebaseio.com/items");
   	$scope.authObj = $firebaseAuth(ref);    		
	var authData = $scope.authObj.$getAuth();	

	$scope.items = $firebaseArray(ref.orderByChild("user").equalTo(authData.uid));




	//$scope.items = items.getAll();
	// remove item
	$scope.remove = function(item){
		var index_item = $scope.items.indexOf(item);
		items.delete(index_item);
	};

	$scope.edit = function(item){
		items.edit(item);
	}


	// modal new
	$scope.openNew = function(){
		var itemNew = $uibModal.open({
			templateUrl: 	'app/items/new.html',
			controller: 	'itemsNewController',
			size: 			'lg'
		});

		
		itemNew.result.then(function(item){			

			// simples lista add
			if(item.simples != undefined){				
				if(item.simples.cantidad != undefined){		
					item.simples.lista = [];		
					for (var i=1; i <= item.simples.cantidad; i++){
						item.simples.lista.push({nombre: i, estado: 0});
					}
				}
				item.simples.disponibles = item.simples.cantidad;
			}

			if(item.normales != undefined){
				if(item.normales.cantidad != undefined){
					item.normales.lista = [];
					for (var i=1; i <= item.normales.cantidad; i++){
						item.normales.lista.push({nombre: i, estado: 0});
					}
				}
				item.normales.disponibles = item.normales.cantidad;
			}

			if(item.dobles != undefined){
				if(item.dobles.cantidad != undefined){
					item.dobles.lista = [];
					for (var i=1; i <= item.dobles.cantidad; i++){
						item.dobles.lista.push({nombre: i, estado: 0});
					}
				}
				item.dobles.disponibles = item.dobles.cantidad;
			}

			if(item.departamentos != undefined){
				if(item.departamentos.cantidad != undefined){
					item.departamentos.lista = [];
					for (var i=1; i <= item.departamentos.cantidad; i++){
						item.departamentos.lista.push({nombre: i, estado: 0});
					}
				}				
				item.departamentos.disponibles = item.departamentos.cantidad;
			}

			// antes de crear uno nuevo agregamos mensaje inicial
			item.messages = [];
			item.messages.push({user:'Admin', contenido: 'Bievenido aqui puedes mandar tus mensajes'});
			// agregamos usuario
			

			
			item.user = authData.uid;
			item.estrella = 1;
			items.add(item);
			
		});
	};

	// modal edit
	$scope.openEdit = function(item){
		var itemEdit = $uibModal.open({
			templateUrl: 'app/items/edit.html',
			controller: 'itemsEditController',
			size: 'lg',
			resolve: {
				item: function(){
					return item;
				}
			}
		});		
		itemEdit.result.then(function(item, item_temp){
			// simples lista add
			if(item.simples != undefined){				
				if(item.simples.cantidad != undefined){		
					item.simples.lista = [];		
					for (var i=1; i <= item.simples.cantidad; i++){
						item.simples.lista.push({nombre: i, estado: 0});
					}
					item.simples.disponibles = item.simples.cantidad;
				}
				
			}

			if(item.normales != undefined){
				if(item.normales.cantidad != undefined){
					item.normales.lista = [];
					for (var i=1; i <= item.normales.cantidad; i++){
						item.normales.lista.push({nombre: i, estado: 0});
					}
					item.normales.disponibles = item.normales.cantidad;
				}
				
			}

			if(item.dobles != undefined){
				if(item.dobles.cantidad != undefined){
					item.dobles.lista = [];
					for (var i=1; i <= item.dobles.cantidad; i++){
						item.dobles.lista.push({nombre: i, estado: 0});
					}
					item.dobles.disponibles = item.dobles.cantidad;
				}
				
			}

			if(item.departamentos != undefined){
				if(item.departamentos.cantidad != undefined){
					item.departamentos.lista = [];
					for (var i=1; i <= item.departamentos.cantidad; i++){
						item.departamentos.lista.push({nombre: i, estado: 0});
					}
					item.departamentos.disponibles = item.departamentos.cantidad;
				}
				
			}

			// editamos el item
			items.edit(item);
		});
	};

	// modal delete

	$scope.openDelete = function(item){
		var itemDelete = $uibModal.open({
			templateUrl: 	'app/items/delete.html',
			controller: 	'itemsDeleteController',
			size: 			'lg',
			resolve: {
				item: function(){
					return item;
				}
			}
		});
		itemDelete.result.then(function(item){
			items.delete(item);
		});
	};

});

// controller items cuartos
app.controller('itemsCuartosController', function($scope, $stateParams, $firebaseObject){
	$scope.id = $stateParams.id;	
	var ref = new Firebase("https://katuq.firebaseio.com/items/");	
	$scope.item = $firebaseObject(ref.child($scope.id));
	
	//$scope.latitudee = $scope.item.latitude;

	// cambia estado de simple lista
	$scope.activar_simples = function(index){
		if($scope.item.simples.lista[index].estado == 1){
			$scope.item.simples.lista[index].estado = 0;
		}else {
			$scope.item.simples.lista[index].estado = 1;
		}

		var dispo = 0;
		for (var i=0; i< $scope.item.simples.cantidad; i++){
			if($scope.item.simples.lista[i].estado == 0){
				dispo++
			}
		}		
		$scope.item.simples.disponibles = dispo;
		$scope.item.$save($scope.item);
	};

	// cambia estado de normales lista
	$scope.activar_normales = function(index){
		if($scope.item.normales.lista[index].estado == 1){
			$scope.item.normales.lista[index].estado = 0;
		}else {
			$scope.item.normales.lista[index].estado = 1;
		}	
		var dispo = 0;
		for (var i=0; i< $scope.item.normales.cantidad; i++){
			if($scope.item.normales.lista[i].estado == 0){
				dispo++
			}
		}		
		$scope.item.normales.disponibles = dispo;

		$scope.item.$save($scope.item);
	};

	// cambia estado de dobles lista
	$scope.activar_dobles = function(index){
		if($scope.item.dobles.lista[index].estado == 1){
			$scope.item.dobles.lista[index].estado = 0;
		}else {
			$scope.item.dobles.lista[index].estado = 1;
		}
		var dispo = 0;
		for (var i=0; i< $scope.item.dobles.cantidad; i++){
			if($scope.item.dobles.lista[i].estado == 0){
				dispo++
			}
		}		
		$scope.item.dobles.disponibles = dispo;

		$scope.item.$save($scope.item);
	};

	// cambia estado de departamentos lista
	$scope.activar_departamentos = function(index){
		if($scope.item.departamentos.lista[index].estado == 1){
			$scope.item.departamentos.lista[index].estado = 0;
		}else {
			$scope.item.departamentos.lista[index].estado = 1;
		}
		var dispo = 0;
		for (var i=0; i< $scope.item.departamentos.cantidad; i++){
			if($scope.item.departamentos.lista[i].estado == 0){
				dispo++
			}
		}		
		$scope.item.departamentos.disponibles = dispo;
		$scope.item.$save($scope.item);
	};
});

// controller items cuartos edit
app.controller('itemsCuartosEditController', function($scope, $stateParams, $firebaseObject, $location){
	$scope.id = $stateParams.id;
	var ref = new Firebase("https://katuq.firebaseio.com/items/");
	$scope.item = $firebaseObject(ref.child($scope.id));

	$scope.update_lista = function(item){
		$scope.item.$save(item);
		$location.path('cuartos/' + $scope.id);
	}
});

// controller items View
app.controller('itemsViewController', function($scope, $stateParams, $firebaseObject, NgMap){



    $scope.id = $stateParams.id;
	var ref = new Firebase("https://katuq.firebaseio.com/items/");	
	$scope.item = $firebaseObject(ref.child($scope.id));

	// datos de usuario del chat	
	$scope.user = "Usuario" + Math.round(Math.random()*10000);
	$scope.guardarMessage = function (message){
		//$scope.item.messages = [];
		$scope.item.messages.push({user: $scope.user, contenido: $scope.message});
		// agregamos item
		//
		console.log($scope.message + $scope.user);
		$scope.message = '';
		$scope.item.$save();
	};

	//starts inicio
	$scope.item.$loaded(function(data){
    	var i = $scope.item.estrella;		
		if( i >= 1 && i <= 10){
			$scope.star1 = true;
			$scope.star2 = false;
			$scope.star3 = false;
			$scope.star4 = false;
			$scope.star5 = false;
		}
		if( i >= 11 && i <= 20){
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = false;
			$scope.star4 = false;
			$scope.star5 = false;
		}
		if( i >= 21 && i <= 30){
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = true;
			$scope.star4 = false;
			$scope.star5 = false;
		}
		if( i >= 31 && i <= 40){
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = true;
			$scope.star4 = true;
			$scope.star5 = false;
		}
		if( i >= 41 ){
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = true;
			$scope.star4 = true;
			$scope.star5 = true;
		}
  	});
  	
 	var cont = 0;
	$scope.changeStart = function (start){
		if(start == 1){
			$scope.item.estrella = $scope.item.estrella + 1;
			$scope.star1 = true;
			$scope.star2 = false;
			$scope.star3 = false;
			$scope.star4 = false;
			$scope.star5 = false;
			cont++;
		}
		if(start == 2){
			$scope.item.estrella = $scope.item.estrella + 2;
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = false;
			$scope.star4 = false;
			$scope.star5 = false;
			cont++;	
		}
		if(start == 3){
			$scope.item.estrella = $scope.item.estrella + 3;
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = true;
			$scope.star4 = false;
			$scope.star5 = false;
			cont++;
		}
		if(start == 4){
			$scope.item.estrella = $scope.item.estrella + 4;
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = true;
			$scope.star4 = true;
			$scope.star5 = false;
			cont++;
		}
		if(start == 5){
			$scope.item.estrella = $scope.item.estrella + 5;
			$scope.star1 = true;
			$scope.star2 = true;
			$scope.star3 = true;
			$scope.star4 = true;
			$scope.star5 = true;
			cont++;
		}
		if(cont <= 2){
			$scope.item.$save();	
		}		
	};
	
	// google map
	var vm = this;
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });   


	// carrusel
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	
});


// modal controller item New
app.controller('itemsNewController', function($scope, $uibModalInstance, Upload, $timeout, $location){
	$scope.item = [];
	$scope.item.fotos = [];
	$scope.archivos = [];

	//Agregar Files
	$scope.agregar_fotos = function(fotos){
		angular.forEach(fotos, function(foto){
			var diferente = true;
			angular.forEach($scope.archivos, function(foto_tmp){
				if(foto.name == foto_tmp.name){
					diferente = false;
				}
			});
			if(diferente==true){

				var nombre_temp = 'item/' + $scope.item.nombre.replace(/[^A-Za-z0-9]/g, '-')  + '/'  + foto.name.replace(/[^A-Za-z0-9\.]/g, '-');
			    foto.upload = Upload.upload({
				    url: 'https://katuq.s3.amazonaws.com/',
				    method: 'POST',
				    data: {
				        key: nombre_temp,
				        AWSAccessKeyId: 'AKIAJIHQHU5IPXHAOJJQ',
				        acl: 'public-read', 
				        policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImthdHVxIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==',
				        signature: 'gSXOy3Ec0im5Kbjptud03yGwUv0=',
				        "Content-Type": foto.type != '' ? foto.type : 'application/octet-stream', 
				        filename: foto.name, 
				        file: foto
				    }
				});

				foto.upload.then(function (response) {
	                $timeout(function () {
	                    foto.result = response.data;
	                });
	            }, function (response) {
	                if (response.status > 0)
	                    $scope.errorMsg = response.status + ': ' + response.data;
	            }, function (evt) {
	                foto.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	            });	


				$scope.item.fotos.push(nombre_temp);
				$scope.archivos.push(foto);				
				
			}
		});		
	}

	$scope.eliminar_archivo = function(index){		
		$scope.item.fotos.splice(index, 1);
		$scope.archivos.splice(index, 1);		
	}
	$scope.new = function(item) {
		$uibModalInstance.close(item);
	}
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}

	$scope.add = function(){
		$uibModalInstance.close($scope.item);
	}

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
});

// modal controller item Edit
app.controller('itemsEditController', function($scope, $uibModalInstance, item, Upload, $timeout, $location){
	$scope.item_temp = item;
	$scope.item = item;
	$scope.archivos = [];
	
	
	// archivos a fotos inicio
	angular.forEach($scope.item.fotos, function(foto,index){
		$scope.archivos[index] = {};
		$scope.archivos[index].name = foto;
		$scope.archivos[index].progress = '100';
	});

	if($scope.item.fotos == undefined){
		$scope.item.fotos = [];	
	}

	$scope.agregar_fotos = function(fotos){		
		angular.forEach(fotos, function(foto){
			var diferente = true;			
			angular.forEach($scope.archivos, function(foto_tmp){
				if(foto.name == foto_tmp.name){
					diferente = false;
				}
			});				
			if(diferente==true){

				var nombre_temp = 'item/' + $scope.item.nombre.replace(/[^A-Za-z0-9]/g, '-')  + '/'  + foto.name.replace(/[^A-Za-z0-9\.]/g, '-');
			    foto.upload = Upload.upload({
				    url: 'https://katuq.s3.amazonaws.com/',
				    method: 'POST',
				    data: {
				        key: nombre_temp,
				        AWSAccessKeyId: 'AKIAJIHQHU5IPXHAOJJQ',
				        acl: 'public-read', 
				        policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImthdHVxIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAiIl0sCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLAogICAgWyJzdGFydHMtd2l0aCIsICIkZmlsZW5hbWUiLCAiIl0sCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgNTI0Mjg4MDAwXQogIF0KfQ==',
				        signature: 'gSXOy3Ec0im5Kbjptud03yGwUv0=',
				        "Content-Type": foto.type != '' ? foto.type : 'application/octet-stream', 
				        filename: foto.name, 
				        file: foto
				    }
				});

				foto.upload.then(function (response) {
	                $timeout(function () {
	                    foto.result = response.data;
	                });
	            }, function (response) {
	                if (response.status > 0)
	                    $scope.errorMsg = response.status + ': ' + response.data;
	            }, function (evt) {
	                foto.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	            });

				$scope.item.fotos.push(nombre_temp);
				$scope.archivos.push(foto);				
				
			}
		});		
	}

	$scope.eliminar_archivo = function(index){		
		$scope.item.fotos.splice(index, 1);
		$scope.archivos.splice(index, 1);
	}

	$scope.edit = function(){
		$uibModalInstance.close($scope.item, item);
	};

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};
});

// modal controller delete
app.controller('itemsDeleteController', function($scope, $uibModalInstance, item){
	$scope.item = item;

	$scope.delete = function(){
		$uibModalInstance.close($scope.item);
	};

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	};
});


