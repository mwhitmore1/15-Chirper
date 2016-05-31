(function(){
	'use strict';

	var app = angular.module('app');
	app.controller('PostsController', PostsController);

	PostsController.$inject = ['PostsService', 'toastr', 'authService', '$state', 'ChirpService'];

	function PostsController(PostsService, toastr, authService, $state, ChirpService){
		var vm = this;
		
		getChirps();

		function getChirps(){
			PostsService.getPosts().then(
				function(data){
					toastr.success("You got chirps.");
					vm.chirps = data;
					console.log(vm.chirps);
				}, function(error){
					toastr.error("There was an error: " + error.message);
				});
		}

		vm.viewComments = function(chirp){
			ChirpService.chirp = chirp;
			$state.go('comments');
		};

		vm.postChirp = function(){
			PostsService.post(this.post).then(
				function(response){
					toastr.success('New Chirp posted!');
					$state.go($state.current, {}, {reload: true});
				}, function(error){
					toastr.error('An error occurred: ' + error.message);
				}
			);
		};

		vm.likeChirp = function(id){
			PostsService.like(id).then(
				function(response){
					toastr.success("Chirp liked");
					$state.go($state.current, {}, {reload: true});
				}, function(error){
					toastr.error("An error occurred: " + error.message);
				});
		};

		vm.logout = function(){
			authService.logout();
		};
	}
})();