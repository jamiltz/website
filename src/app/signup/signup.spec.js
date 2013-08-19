describe('Signup', function() {
    var $scope;
    var ctrl;
    var response;

    var mockUser = {
        signup: function() {
            return {
                then: function(callback) {
                    callback(response);
                }
            }
        }
    }

    beforeEach(module('bk-page-signup'));


    it('should return error message (409) with username already registered', function() {
        response = {
            status: 409,
            reason: 'Username already taken'
        };
        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            ctrl = $controller('SignupCtrl', {
                $scope: $scope,
                User: mockUser
            });
        })


        $scope.sendUser();
        expect($scope.error).toEqual('Username already taken');
    });

//    it('should return success message (201)', function() {
//        response = {
//            status: 201,
//            user: 'Username already taken'
//        };
//        inject(function($rootScope, $controller) {
//            $scope = $rootScope.$new();
//
//            ctrl = $controller('SignupCtrl', {
//                $scope: $scope,
//                User: mockUser
//            });
//        })
//
//
//        $scope.sendUser();
//        expect($scope.error).toEqual('Username already taken');
//    });
});