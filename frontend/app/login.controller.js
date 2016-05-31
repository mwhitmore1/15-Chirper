(function(){
	'use strict';

	var app = angular.module('app');
	app.controller('LoginController', LoginController);

	LoginController.$inject = ['authService', '$state', 'toastr'];

	function LoginController(authService, $state, toastr){
		var vm = this;
		
		vm.login = function(){
			authService.login(vm.login)
				.then(
					function(response){ 
						toastr.success('Login successful.');
						$state.go('posts');
					}, function(error){
						toastr.error(error);
					});
		};
	}
})();
