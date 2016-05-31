(function(){
	'use strict';

	var app = angular.module('app');
	app.controller('CommentsController', CommentsController);

	CommentsController.$inject = ['PostsService', 'toastr', 'authService', '$state', 'ChirpService'];

	function CommentsController(PostsService, toastr, authService, $state, ChirpService){
		var vm = this;
		
		vm.chirp = ChirpService.chirp;
		console.log(vm.chirp);

		//getChirps();

		function getChirps(){
			PostsService.getPosts().then(
				function(data){
					toastr.success("You got chirps.");
					vm.chirps = data;
				}, function(error){
					toastr.error("There was an error: " + error.message);
				});
		}

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