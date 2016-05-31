'use strict';

describe("authInterceptor ", function(){
	beforeEach(module('app', function($provide){
		$provide.value('apiUrl', 'http://localhost:65315/');
	}))

	beforeEach(module('LocalStorageModule'));

	var $scope, authInterceptor, $q, $location, localStorageService, $httpBackend;

	beforeEach(inject(function(_$rootScope_, _authInterceptor_, _$q_, _$location_, _localStorageService_, _$httpBackend_){
		$scope = _$rootScope_.$new();
		authInterceptor	= _authInterceptor_;
		$q = _$q_;
		$location = _$location_;
		localStorageService = _localStorageService_;
		$httpBackend = _$httpBackend_;
	}));

	it("should exist", function(){
		expect(authInterceptor).toBeDefined();
	});

	describe("request method ", function(){
		beforeEach(function(){spyOn(localStorageService, 'get').and.returnValue({access_token: 'token'})});

		it("should exist", function(){
			expect(authInterceptor.request).toBeDefined();
		});

		it("should not add header object if config headers are provided, add token if provided", function(){
			var config = {headers: {}};
			authInterceptor.request(config);
			expect(config.headers.Authorization).toBe('bearer token');
		});

		it("should not add header object if config headers are provided, no token if none provided", function(){
			localStorageService.get.and.returnValue(null);
			var config = {headers: {}};
			authInterceptor.request(config);
			expect(config.headers.Authorization).toBeUndefined();
		});

		it("should add header object if config headers are not provided, add token if provided", function(){
			var config = {};
			authInterceptor.request(config);
			expect(config.headers.Authorization).toBe('bearer token');
		});

		it("should add header object if config headers are not provided, no token if none provided", function(){
			localStorageService.get.and.returnValue(null);
			var config = {};
			authInterceptor.request(config);
			expect(config.headers.Authorization).toBeUndefined();
		});
	});

	describe("response method ", function(){
		it("should exist", function(){
			expect(authInterceptor.response).toBeDefined();
		});

		it("should return reponse if provided.", function(){
			expect(authInterceptor.response('response')).toBe('response');
		});

		it("should return resolved promise if response not provided.", function(){
			$httpBackend.when('GET', '/templates/login.html').respond(200);
			var promise = authInterceptor.response(null);
			$httpBackend.flush();
			//promise.resolve('resolved')
			promise.then(function(response){
				expect(response).toBeNull();
			});
			$scope.$apply();
		});		
	});

	describe("requestError method ", function(){
		it("should exist", function(){
			expect(authInterceptor.requestError).toBeDefined();
		});

		it("should retrun reject any argument", function(){
			$httpBackend.when('GET', '/templates/login.html').respond(200);
			var reject = authInterceptor.requestError("reject");
			$httpBackend.flush();
			reject.then(function(r){}, function(error){
				expect(error).toBe('reject');
			});
			$scope.$apply();
		});
	});

	describe("responseError method ", function(){
		it("should exist", function(){
			expect(authInterceptor.responseError).toBeDefined();
		});

		it("if not a 400 status return argument as a rejected promise", function(){
			var rejection = {status: 200};
			$httpBackend.when('GET', '/templates/login.html').respond(200);
			var promise = authInterceptor.responseError(rejection);
			$httpBackend.flush();
			promise.then(function(r){}, function(error){
				expect(error.status).toBe(200);
			});
			$scope.$apply();
		});

		it("if status is unauthorized, revoke token and redirect to login", function(){
			var rejection = {status: 401};
			localStorageService.set('authorizationData', 'token');

			$location.path('/notlogin');
			$httpBackend.when('GET', '/templates/login.html').respond(200);
			var promise = authInterceptor.responseError(rejection);
			$httpBackend.flush();
			promise.then(function(r){}, function(error){
				expect(error.status).toBe(401);
			});
			$scope.$apply(); 
			
			var token = localStorageService.get('authorizationData');
			expect(token).toBeNull();
			expect($location.path()).toBe('/login');
		});
	});
});