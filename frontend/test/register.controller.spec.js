'use strict';

describe("register controller ", function(){
	beforeEach(module('app', function($provide){
		$provide.value('apiUrl', 'http://localhost:65315/');
	}));

	beforeEach(module('ui.router'));
	beforeEach(module('toastr'));

	var $controller, authService, $state, toastr, vm, deferred, $scope, $httpBackend;

	beforeEach(inject(function(_$rootScope_, _authService_, _$state_, _$controller_, _toastr_, _$q_, _$httpBackend_){
		$scope = _$rootScope_.$new();
		authService = _authService_;
		$state = _$state_;
		$controller = _$controller_;
		toastr = _toastr_;
		deferred = _$q_.defer();
		$httpBackend = _$httpBackend_;
		
		spyOn(authService, 'register').and.returnValue(deferred.promise);

		vm = $controller('RegisterController', {
			authService: authService,
			$state: $state,
			$scope: $scope
		});
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should exist", function(){
		$httpBackend.when('GET', '/templates/login.html').respond(200);
		expect(vm).toBeDefined();
		$httpBackend.flush();
	});

	it("should hvae register method", function(){
		$httpBackend.when('GET', '/templates/login.html').respond(200);
		expect(vm.register).toBeDefined();
		$httpBackend.flush();
	});

	describe("register method ", function(){
		it("should set state to login if successful.", function(){
			$httpBackend.when('GET', '/templates/login.html').respond(200);
			vm.register();
			// on success get request sent for login state.
			deferred.resolve('resolve');
			$httpBackend.flush();
		});

		it("should not change state if an error is returned", function(){
			$httpBackend.when('GET', '/templates/login.html').respond(200);
			vm.register();
			$httpBackend.flush();
		});
	});
})