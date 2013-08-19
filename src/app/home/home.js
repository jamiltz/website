angular.module('bk-page-home', [
    'ui.state'
])

.config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                main: {
                    templateUrl: 'home/home.tpl.html',
                    controller: 'HomeCtrl'
                }
            }
        });
    })

.controller('HomeCtrl', function HomeCtrl($scope) {

        $scope.test = "working"

        $scope.type = '1st';

    })