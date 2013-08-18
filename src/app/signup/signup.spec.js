describe('Signup', function() {
    var $scope;
    var ctrl;

    var response = {
        username: 'Joe',
        email: 'joe@gmail.com',
        password: 'pass'
    };
    var mockUser = {
        signup: function() {
            return response;
        }
    }

    beforeEach(module('bk-page-signup'));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();

        ctrl = $controller('SignupCtrl', {
            $scope: $scope,
            User: mockUser
        });
    }));



    it('should signup user when sendUser is called', function() {
        console.log($scope.sendUser());


    });
});