(function(){
	'use strict';

	angular
		.module('app')
		.factory('authService', authService);
	authService.$inject = ['apiUrl', '$q', '$http', 'localStorageService', '$location'];

	function authService(apiUrl, $q, $http, localStorageService, $location){
		var state = {
			loggedIn: false
		};

	 	var service = {
	 		state: state,
	 		register: register,
			login: login,
			logout: logout,
			init: init
		};

	 	return service;

	 	function register(registration){
			var defer = $q.defer();

			$http.post(apiUrl + 'account/register', registration)
			.then(
				function(response){
					defer.resolve(response);
				}, function(error){
					defer.reject(error);
				});
				return defer.promise;
		}

		function login(login){
			logout();
			state.loggedIn = true;
			var defer = $q.defer();

			var data = 'grant_type=password&username=' + login.username + '&password=' + login.password;

			$http({
				method: 'POST', 
				url: apiUrl + 'oauth/token',
				data: data, 
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(
					function(response){
						localStorageService.set('authorizationData', response.data);
						defer.resolve(response.data);
					}, function(error){
						defer.reject(error);
					});
			
			return defer.promise;
		}

		function logout(){
			state.loggedIn = false;
			localStorageService.remove('authorizationData');
			$location.path('#/login');
		}
				
		function init(){
			var authData = localStorageService.get('authorizationData');
			state.loggedIn = true;
			$location.path('#/posts');
	 	}	
	 }
})();
