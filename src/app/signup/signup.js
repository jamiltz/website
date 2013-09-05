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

    .controller('SignupCtrl', function SignupCtrl($rootScope, User, $state, Session, $scope) {

        $scope.sendUser = function() {

            User.signup($scope.user)
                .then(function(res) {
                    console.log(res)
                    User.login(res.user.username, $scope.user.pass)
                        .then(
                            function(res) {
                                $rootScope.current = res.user;
                                Session.setToken(res.token);
                                $state.transitionTo('account');
                            }, function (err) {
                                console.log(err);
                            }
                        )

                }, function(res) {
                    console.log(res)
                    $scope.error = res.data.reason;
                });
        };

        $scope.canSave = function(form_name) {
            return $scope[form_name].$dirty && $scope[form_name].$valid;
        };

    });