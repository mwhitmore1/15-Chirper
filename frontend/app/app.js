(function(){
	'use strict';
	angular.module('app', [
		'ui.router',
		'LocalStorageModule',
		'toastr'
		])
		 .config(function($stateProvider, $urlRouterProvider, $httpProvider){
			$urlRouterProvider.otherwise("login");
			$stateProvider
			.state('register', { url: '/register', templateUrl: '/templates/register.html', controller: 'RegisterController as register'})
			.state('login', { url: '/login', templateUrl: '/templates/login.html', controller: 'LoginController as login'})
			.state('posts', { url: '/posts', templateUrl: '/templates/posts.html', controller: 'PostsController as posts'})
			.state('comments', {url: '/comments', templateUrl: '/templates/comments.html', controller: 'CommentsController as comments'});
			$httpProvider.interceptors.push('authInterceptor');
		 })	
		 .value('apiUrl', 'http://localhost:65315/');
})();


