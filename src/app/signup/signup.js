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

    .controller('SignupCtrl', function SignupCtrl($scope, User) {

        $scope.sendUser = function() {
            User.signup($scope.user)
                .then(function(res) {
                    if(res.status === 409) {
                        $scope.error = res.reason;
                    } else if (res.status === 201) {
                        console.log(res);
                    }


                })
        };



    });