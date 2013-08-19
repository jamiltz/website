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

    .controller('LoginCtrl', function LoginCtrl($scope, User, $state, $http, $rootScope) {

        $scope.loginUser = function() {
            User.login($scope.user.username, $scope.user.pass)
                .then(function(res) {
                    $http.defaults.headers.common['Authorization'] = User.getAuthHeader();
                    $rootScope.state = 'loggedIn';
                    $rootScope.auth = res;
                    $state.transitionTo('about');
                }, function(res) {
                    $scope.error = res.data.reason;
                })
        }



    });