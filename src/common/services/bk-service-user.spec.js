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




        iit('should successfully sign up user', function() {
            var returnData =
                {
                    username: 'Joe',
                    email: 'joe@gmail.com',
                    password: 'pass'
                }
            ;
            var response = {
                data : {
                    username : 'Joe',
                    email : 'joe@gmail.com',
                    password : 'pass'
                },
                status : 201
            };
            httpBackend.expectPOST('/user').respond(201, returnData);
            var test = {
                handler: function() {console.log('Hello')}
            };
            spyOn(test, 'handler');
            var returnedPromise = User.signup();
            returnedPromise.then(test.handler);
            httpBackend.flush();

            console.log(returnedPromise)

            expect(test.handler).toHaveBeenCalledWith(response);

        });
    });
});