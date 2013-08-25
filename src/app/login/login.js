angular.module('bk-page-login', [
        'ui.state'
    ])

    .config(function config( $stateProvider ) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                main: {
                    templateUrl: 'login/login.tpl.html',
                    controller: 'LoginCtrl'
                }
            }
        });
    })

    .controller('LoginCtrl', function LoginCtrl($scope, User, $state, $http, $rootScope, Session) {

        $scope.loginUser = function() {
            User.login($scope.user.username, $scope.user.pass)
                .then(function(res) {

                    $rootScope.state = 'loggedIn';

                    Session.setToken(res.token);

                    $http.defaults.headers.common['token'] = Session.getToken();

                    $rootScope.auth = res.user;
                    $state.transitionTo('home');
                }, function(res) {
                    $scope.error = res.data.reason;
                })
        }



    });