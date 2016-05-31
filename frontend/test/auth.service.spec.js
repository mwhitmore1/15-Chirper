describe("auth service ", function(){
	
	var authService, apiUrl, httpBackend, $q, localStorageService;
	
	beforeEach(function(){
		module('app', function($provide){
			$provide.value('apiUrl', 'http://localhost:65315/');
		});

		module('LocalStorageModule');

		inject(function(_authService_, _$httpBackend_, _$q_, _localStorageService_){
			authService = _authService_;
			$q = _$q_; 
			localStorageService = _localStorageService_;
			httpBackend = _$httpBackend_;

			httpBackend.when('GET', '/templates/login.html').respond(200);
		});

		httpBackend.flush();
	});

//	beforeEach(module('LocalStorageModule'));


	// beforeEach(inject(function(_authService_, _$httpBackend_, _$q_, _localStorageService_){
	// 	authService = _authService_;
	// 	$q = _$q_; 
	// 	localStorageService = _localStorageService_;
	// 	httpBackend = _$httpBackend_;

	// 	expect(authService).toBeDefined();
	// 	expect(localStorageService.set).toBeDefined();
	// 	httpBackend.when('GET', '/templates/login.html').respond(function(){});
	// }));

	afterEach(function(){
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it("should exits", inject(function(){
		expect(authService).toBeDefined();
		expect(authService.state).toBeDefined();
	}));

//// register method

	it("register method should return data on successful call.", function(){
		
		expect(authService.register).toBeDefined();
		
		var registration = {
			emailAddress: 'newfake@email.com',
			password: 'FakePassword123_',
			confirmPasswork: 'FakePassword123_'
		};
		
		// check that a successful call will work.
		httpBackend.whenPOST("http://localhost:65315/accounts/register").respond(200, {'data':'data'});
		var result = authService.register(registration);
		httpBackend.flush();

		result.then(function(response){
			expect(response.data).toEqual({'data':'data'});
		}, function(error){
			expect(error).toBeUndefined();
		});
		
	});


	it("register method should throw an error on unsuccessful call", function(){
		expect(authService.register).toBeDefined();
		
		var registration = {
			emailAddress: 'newfake@email.com',
			password: 'FakePassword123_',
			confirmPasswork: 'FakePassword123_'
		};
		
		// check that a successful call will work.
		httpBackend.expectPOST("http://localhost:65315/accounts/register").respond(500);
		var result = authService.register(registration);

		httpBackend.flush();

		result.then(function(response){
			expect(response).toBeUndefined();
		}, function(error){
			expect(error.status).toBe(500);
		});
	});

///// Login method
	describe("login method ", function(){

		it("login method should exist", function(){
			expect(authService.login).toBeDefined();
		});

		it("login method should change state to logged in", function(){
			expect(localStorageService).toBeDefined();
			httpBackend.when('POST', 'http://localhost:65315/token').respond(200);
			authService.login('username', 'password');
			httpBackend.flush();
			expect(authService.state.loggedIn).toBe(true);
		});

		it("should return data on successful call.", function(){
			
			expect(authService.register).toBeDefined();
			
			var registration = {
				emailAddress: 'newfake@email.com',
				password: 'FakePassword123_',
				confirmPasswork: 'FakePassword123_'
			};
			
			// check that a successful call will work.
			httpBackend.whenPOST("http://localhost:65315/accounts/register").respond(200, {'data':'data'});
			var result = authService.register(registration);

			httpBackend.flush();

			result.then(function(response){
				expect(response.data).toEqual({'data':'data'});
			}, function(error){
				expect(error).toBeUndefined();
			});
			
		});

		it("should throw an error on unsuccessful call", function(){
			expect(authService.register).toBeDefined();
			
			var registration = {
				emailAddress: 'newfake@email.com',
				password: 'FakePassword123_',
				confirmPasswork: 'FakePassword123_'
			};
			
			// check that a successful call will work.
			httpBackend.expectPOST("http://localhost:65315/accounts/register").respond(500);
			var result = authService.register(registration);

			httpBackend.flush();

			result.then(function(response){
				expect(response).toBeUndefined();
			}, function(error){
				expect(error.status).toBe(500);
			});
		});
	});

//// Logout method
	describe("logout method ", function(){
		
		var $location;
		beforeEach(inject(function(_$location_){
			$location = _$location_;
		}));

		it("logout method should work", function(){
			expect(authService.logout).toBeDefined();
		});

		it('should set loggedIn to false', function(){
			authService.state.loggedIn = true;
			authService.logout();
			expect(authService.state.loggedIn).toBe(false);
		});

		it('should remove authorization from local storage', function(){
			localStorageService.set('authorizationData', 'data');
			authService.logout();
			var data = localStorageService.get('authorizationData');
			expect(data).toBeNull();			
		});

		it('should redirect to loging', function(){
			$location.path(['#/notlogin']);
			authService.logout();
			expect($location.path()).toEqual('/#/login');
		});
	});

//// init method
	describe("init method ", function(){

		var $location;
		beforeEach(inject(function(_$location_){
			$location = _$location_;
		}));

		it("init method should work", function(){
			expect(authService.init).toBeDefined();
		});

		it('should set loggedIn to true', function(){
			authService.state.loggedIn = false;
			authService.init();
			expect(authService.state.loggedIn).toBe(true);
		});

		it('should redirect to loging', function(){
			$location.path(['#/notposts']);
			authService.init();
			expect($location.path()).toEqual('/#/posts');
		});
	});
});