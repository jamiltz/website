angular.module('bk-page-account', [
    'ui.state'
])

.config(function config( $stateProvider ) {
    $stateProvider.state('account', {
        url: '/account',
        views: {
            main: {
                templateUrl: 'account/account.tpl.html',
                controller: 'AccountCtrl'
            }
        }
    });
})

.controller('AccountCtrl', function Account($scope, $http) {

        $scope.sendItem = function() {


            var data = {
                name: $scope.item.name,
                price: $scope.item.price,
                location: $scope.item.location,
                description: $scope.item.description,
                pictures: $scope.pictures
            }


            $http.post('/1.0/item', data)
                .success(function(d) {console.log(d)})
                .error(function(e) {console.log(e)})


        }

    })