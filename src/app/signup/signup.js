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
            console.log($state)

            User.signup($scope.user)
                .then(function(res, stat) {

                    $state.transitionTo('about');

                }, function(res) {
                    $scope.error = res.reason;
                })
        };



    });