(function() {
    'use strict';

    angular
        .module('app')
        .factory('PostsService', PostsService);

    PostsService.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function PostsService($http, $q, apiUrl) {
    	var chirpUrl = apiUrl + 'api/chirps';

        var service = {
        	post:post,
        	getPosts:getPosts,
        	like:like
        };

        return service;

        ////////////////

        function post(post) {
        	var defer = $q.defer();
        	$http({
        		method: 'POST',
        		url: chirpUrl,
        		data: post
        	}).then(function(response){
        		defer.resolve(response);
        	}, function(error){
        		defer.reject(error);
        	});

        	return defer.promise;
        }

        function getPosts() {
        	var defer = $q.defer();
        	$http({
        		method: 'GET',
        		url: chirpUrl,
        	}).then(function(response){
        		defer.resolve(response.data);
        	}, function(error){
        		defer.reject(error);
        	});

        	return defer.promise;
        }

        function like(id){
        	var defer = $q.defer();
        	$http({
        		url:chirpUrl + '/' + id,
        		method:'PUT'
        	}).then(function(response){
        		defer.resolve(response);
        	}, function(error){
        		defer.reject(error);
        	});

        	return defer.promise;
        }
    }
})();