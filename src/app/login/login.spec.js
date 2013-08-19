describe('Login', function() {
    var $scope;
    var ctrl;
    var response;

    var mockUser = {
        login: function() {
            return {
                then: function(callback) {
                    callback(response);
                }
            }
        }
    };

    beforeEach(module('bk-page-login'));

    it('should return 401 if username is not found', function() {
        response = {
            status: 401,
            reason: 'Sorry, this username was not found'
        };
        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            ctrl = $controller('LoginCtrl', {
                $scope: $scope,
                User: mockUser
            });
        });

        $scope.loginUser();
        expect($scope.error).toEqual('Sorry, this username was not found');
    })
})