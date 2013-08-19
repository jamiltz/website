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

    .controller('SignupCtrl', function SignupCtrl($scope, User, $state) {

        $scope.sendUser = function() {

            User.signup($scope.user)
                .then(function(res) {
                    $state.transitionTo('home');

                }, function(res) {
                    console.log(res)
                    $scope.error = res.data.reason;
                })
        };



    });