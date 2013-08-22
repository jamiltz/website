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


//            var data = {
//                name: $scope.item.name,
//                price: $scope.item.price,
//                location: $scope.item.location,
//                description: $scope.item.description,
//                pictures: $scope.pictures
//            }

            var str = JSON.stringify($scope.pictures);

            var form = new FormData();
            form.append('name', $scope.item.name)
            form.append('price', $scope.item.price)
            form.append('location', $scope.item.location)
            form.append('description', $scope.item.description)
            form.append('pictures', str)


//            $http.post('/1.0/item', data)
//                .success(function(d) {console.log(d)})
//                .error(function(e) {console.log(e)})

            var qs = document.querySelector.bind(document);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/1.0/item');

            xhr.upload.onprogress = function(e) {
                qs('#progress').value = e.loaded;
                qs('#progress').max = e.total;
            }

            xhr.onload = function() {
                console.log("Upload completed");
            }

            xhr.send(form);


        }

    })