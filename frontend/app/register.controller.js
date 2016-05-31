(function(){
	'use strict';

	var app = angular.module('app');
	app.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['authService', '$state'];

	function RegisterController(authService, $state){
		var vm = this;
		
		vm.register = function(){
			authService.register(vm.registration)
				.then(
					function(response){
						toastr.success('Registration successful.');
						$state.go('login');
					}, function(error){
						toastr.error(error);
					});
		};
	}
})();
