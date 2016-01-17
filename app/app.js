var app = angular.module("katuq", ['ui.router','ui.bootstrap', 'ngFileUpload', 'firebase', 'ngAnimate', 'ngMap']);

app.config(function ($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/items_index");
	$stateProvider

	.state('items_index', {
      	url: "/items_index",      	
      	views: {
       		"header": { templateUrl: "app/layouts/theme/header.html" },
        	"contenido": { templateUrl: "app/items/index.html", controller: "itemsIndexController" },
        	"footer": { templateUrl: "app/layouts/theme/footer.html" }
      	}
    })

    .state('items_view', {
      url: "/items_view/:id",
      templateUrl: 'app/items/view.html',
      controller: "itemsViewController"
    })

    .state('items_admin', {
      url: "/items_admin",
      templateUrl: 'app/items/admin.html',
      controller: "itemsAdminController"
    })

    .state('items_cuartos', {
      url: "/items_cuartos/:id",
      templateUrl: 'app/items/cuartos.html',
      controller: "itemsCuartosController"
    })

    .state('items_cuartos_edit', {
      url: "/items_cuartos/edit/:id",
      templateUrl: 'app/items/cuartos_edit.html',
      controller: "itemsCuartosEditController"
    })

});