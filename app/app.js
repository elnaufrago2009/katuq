var app = angular.module("katuq", ['ngRoute','ui.bootstrap', 'ngFileUpload', 'firebase', 'ngAnimate', 'ngMap']);

app.config(function($routeProvider){
	$routeProvider

	.when('/items_index', {
		templateUrl: "app/items/index.html",
		controller: "itemsIndexController"
	})
	.when('/items_view/:id', {
		templateUrl: "app/items/view.html",
		controller: "itemsViewController"
	})
	.when('/items_admin', {
		templateUrl: "app/items/admin.html",
		controller: "itemsAdminController"
	})	
	.when('/items_cuartos/:id', {
		templateUrl: "app/items/cuartos.html",
		controller: "itemsCuartosController"
	})
	.when('/items_cuartos/edit/:id', {
		templateUrl: "app/items/cuartos_edit.html",
		controller: "itemsCuartosEditController"
	})

	.otherwise({ redirectTo: '/items_index' })
});