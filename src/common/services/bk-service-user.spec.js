describe('User', function() {
    describe('user signs up', function() {
        var httpBackend;
        var User;


        beforeEach(module('bk-service-user'));
        beforeEach(function() {
            inject(function($httpBackend, _User_) {
                httpBackend = $httpBackend;
                User = _User_;
            });
        });

        it('should return 409 because username is taken', function() {
            var returnData = {
                status: 409,
                reason: 'Username already taken'
            };

            httpBackend.expectPOST('/user').respond(returnData);
            var test = {
                handler: function() {}
            };
            spyOn(test, 'handler');
            var returnedPromise = User.signup();
            returnedPromise.then(test.handler);
            httpBackend.flush();
            expect(test.handler).toHaveBeenCalledWith(returnData);
        });


        it('should successfully sign up user', function() {

            var returnData = {
                user: {
                    username: 'Joe',
                    email: 'joe@gmail.com',
                    password: 'pass'
                },
                status : 201
            };

            httpBackend.expectPOST('/user').respond(201, returnData);
            var test = {
                handler: function() {}
            };
            spyOn(test, 'handler');
            var returnedPromise = User.signup();
            returnedPromise.then(test.handler);
            httpBackend.flush();

            expect(test.handler).toHaveBeenCalledWith(returnData);

        });
    });
});