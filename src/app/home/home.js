angular.module('bk-page-home', [
    'ui.state'
])

.config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/?g',
            views: {
                main: {
                    templateUrl: 'home/home.tpl.html',
                    controller: 'HomeCtrl'
                }
            },
            resolve: {
                rGroups: ['List', function(List) {
                    return List.getGroups().then(
                        function(res) {
                            return res.groups;
                        }
                    )
                }],
                rList: ['List', '$stateParams', function(List, $stateParams) {
                    var group;
                    if($stateParams.g) {
                        group = $stateParams.g
                    } else {
                        group = ''
                    }
                    return List.getGroupItems(group).then(
                        function(res) {
                            return res.items;

                        },
                        function(err) {
                            console.log(err)
                        }
                    );
                }],
                user: ['User', function(User) {
                    User.autologin()
                }]
            }
        });
    })

.controller('HomeCtrl', function HomeCtrl($scope, List, $stateParams, rList, rGroups) {

        $scope.items = rList;
        $scope.groups = rGroups;


        $scope.sortField = undefined;
        $scope.reverse = false;
        $scope.sort = function (fieldName) {
            if ($scope.sortField === fieldName) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortField = fieldName;
                $scope.reverse = false;
            }
        };


        $scope.isSortUp = function (fieldName) {
            return $scope.sortField === fieldName && !$scope.reverse;
        };
        $scope.isSortDown = function (fieldName) {
            return $scope.sortField === fieldName && $scope.reverse;
        };


        $scope.type = '1st';
        console.log($stateParams);

        $scope.type = $stateParams.g;

    })