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

.controller('HomeCtrl', function HomeCtrl($scope, List) {
        $scope.type = '1st';

        List.all().then(
            function(res) {
                console.log(res)
                $scope.items = res.items;
            },
            function(err) {
                console.log(err)
            }
        )

    })