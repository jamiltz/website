angular.module('bk-page-signup', [
        'ui.state'
    ])

    .config(function config( $stateProvider ) {
        $stateProvider.state('signup', {
            url: '/signup',
            views: {
                main: {
                    templateUrl: 'signup/signup.tpl.html',
                    controller: 'SignupCtrl'
                }
            }
        });
    })

    .controller('SignupCtrl', function SignupCtrl($scope, User, $location) {

        $scope.sendUser = function() {
            User.signup($scope.user)
                .then(function(res, stat) {

                    $location.path('/');

                }, function(res) {
                    $scope.error = res.reason;
                })
        };



    });