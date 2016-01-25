var app = angular.module("katuq", ['ui.router','ui.bootstrap', 'ngFileUpload', 'firebase', 'ngAnimate', 'ngMap']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise("/");
	$stateProvider

	.state('items', {
      	url: "/",      	
      	views: {
       		"header": { templateUrl: "app/layouts/theme/header.html" },
        	"contenido": { templateUrl: "app/items/index.html", controller: "itemsIndexController" },
        	"footer": { templateUrl: "app/layouts/theme/footer.html" }
      	}
    })

    .state('login', {
        url: "/login",        
        views: {            
            "contenido": { templateUrl: "app/login/index.html", controller: "loginController" }
        }
    })

    .state('sd registro', {
        url: "/registro",        
        views: {            
            "contenido": { templateUrl: "app/login/registro.html", controller: "loginRegistroController" }
        }
    })


    .state('item', {
        url: "/item/:id",                
        views: {
            "header": { templateUrl: "app/layouts/theme/header.html" },
            "contenido": { templateUrl: "app/items/view.html", controller: "itemsViewController" },
            "footer": { templateUrl: "app/layouts/theme/footer.html" }
        }
    })

    .state('admin', {
      url: "/admin",
        views: {
            "header": { templateUrl: "app/layouts/theme/header.html" },
            "contenido": { templateUrl: "app/items/admin.html", controller: "itemsAdminController" },
            "footer": { templateUrl: "app/layouts/theme/footer.html" }
        }
    })

    .state('cuartos', {
        url: "/cuartos/:id",
        views: {
            "header": { templateUrl: "app/layouts/theme/header.html" },
            "contenido": { templateUrl: "app/items/cuartos.html", controller: "itemsCuartosController" },
            "footer": { templateUrl: "app/layouts/theme/footer.html" }
        }
    })

    .state('cuartos_edit', {
        url: "/cuartos/edit/:id",
        views: {
            "header": { templateUrl: "app/layouts/theme/header.html" },
            "contenido": { templateUrl: "app/items/cuartos_edit.html", controller: "itemsCuartosEditController"},
            "footer": { templateUrl: "app/layouts/theme/footer.html" }
        }
    })

});