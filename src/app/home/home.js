angular.module('bk-page-home', [
    'ui.state'
])

.config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/:group',
            views: {
                main: {
                    templateUrl: 'home/home.tpl.html',
                    controller: 'HomeCtrl'
                }
            }
        });
    })

.controller('HomeCtrl', function HomeCtrl($scope, List, $stateParams) {
        $scope.type = '1st';
        console.log($stateParams)

        List.getGroupItems($stateParams.group).then(
            function(res) {
                $scope.type = $stateParams.group;
                $scope.items = res.items;
            },
            function(err) {
                console.log(err)
            }
        );


        $scope.groups = [
            'IQ Shoreditch',
            'Nido Liverpool Street',
            'Brixton South',
            'Westminster Uni',
            'SciencePo'
        ];


    })