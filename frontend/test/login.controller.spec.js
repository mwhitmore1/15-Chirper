'use strict'

describe("login controller ", function(){
	// beforeEach(function(){
	// 	$httpBackend.expect('GET', '/templates/login.html').respond(200);
	// });

	beforeEach(module('app', function($provide){
		$provide.value('apiUrl', 'http://localhost:65315/');
	}));

	var $scope, $controller, authService, $state, toastr, vm, deferred, $httpBackend;

	beforeEach(inject(function(_$rootScope_, _$controller_, _authService_, _$state_, _toastr_, _$q_, _$httpBackend_){
		$scope = _$rootScope_.$new();
		$controller = _$controller_;
		authService = _authService_;
		$state = _$state_;
		toastr = _toastr_;
		deferred = _$q_.defer();
		$httpBackend = _$httpBackend_;

		vm = $controller('LoginController', {
			authService: authService,
			$state: $state,
			toastr: toastr
		});

	}));

	beforeEach(function(){
		$httpBackend.when('GET', '/templates/login.html').respond(200);
	});

	afterEach(function(){
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();
	});

	it('should exist', function(){
		expect(vm).toBeDefined();
	});

	describe("vm login method ", function(){
		it("should reroute to posts", function(){
			$httpBackend.when('GET', '/templates/posts.html').respond(200);
			deferred.resolve('value');
			spyOn(authService, "login").and.returnValue(deferred.promise);
			vm.login();
			$httpBackend.flush();
			$scope.$apply();
		});

		it("should not redirect if error occured", function(){
			deferred.reject('value');
			spyOn(authService, "login").and.returnValue(deferred.promise);
			vm.login();
			$httpBackend.flush();
			$scope.$apply()	;
		});
	});
});