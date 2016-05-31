describe("The module should ", function(){
	it("exist", function(){
		(module('app'))
		expect(app).toBeDefined();
	});
});