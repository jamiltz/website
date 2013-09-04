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
        },
        resolve: {
            user: ['User', function(User) {
                User.autologin('login')
            }],
            rGroups: ['List', function(List) {
                return List.getGroups()
                    .then(
                    function(res) {
                        return res.groups;
                    },
                    function(err) {
                        console.log(err);
                    }
                )
            }]
        }
    });
})

.controller('AccountCtrl', function Account($scope, List, rGroups, Session, User, Item, $state) {

        $scope.groups = rGroups;

        User.items().then(
            function(res) {
                $scope.items = res.items
            },
            function(err) {
            }
        )

        $scope.updateItem = function(item, idx) {
            console.log(item)
            var item_to_update = JSON.parse(JSON.stringify(item));
            delete item_to_update.seller_id;
            delete item_to_update.pictures;
            delete item_to_update.ref;

            Item.updateItem(item_to_update).then(
                function(res) {
                    //console.log(res);
                    console.log(idx)
                    console.log('isEditing' + idx)
                    $scope.isEditing0 = false;
                }
            )

        }

        $scope.removeItem = function(ref, idx) {
            Item.removeItem(ref).then(
                function(res) {
                    if(res.status === 204) {

                        User.items().then(
                            function(res) {
                                $scope.items = res.items
                            },
                            function(err) {
                            }
                        )

                    }
                }
            )
        }

        $scope.canSave = function() {
            return $scope.newItemForm.$dirty && $scope.newItemForm.$valid;
        }

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
            form.append('group', $scope.item.group)
            form.append('pictures', str)


//            $http.post('/1.0/item', data)
//                .success(function(d) {console.log(d)})
//                .error(function(e) {console.log(e)})

            var qs = document.querySelector.bind(document);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/1.0/item');

            xhr.setRequestHeader("token", Session.getToken());

            xhr.upload.onprogress = function(e) {
                qs('#progress').value = e.loaded;
                qs('#progress').max = e.total;
            }

            xhr.onload = function() {
                isAddingItem = false;
            }

            xhr.send(form);


        }

    })
.controller('s-ItemCtrl', function($scope, Item) {
        $scope.updateItem = function(item) {
            console.log(item)
            var item_to_update = JSON.parse(JSON.stringify(item));
            delete item_to_update.seller_id;
            delete item_to_update.pictures;
            delete item_to_update.ref;

            Item.updateItem(item_to_update).then(
                function(res) {
                    $scope.isEditing = false;
                }
            )

        }


    })