angular.module('bk-page-item', [
    'ui.state'
])

.config(function config($stateProvider) {
        $stateProvider.state('item', {
            url: '/item/:ref',
            views: {
                main: {
                    templateUrl: 'item/item.tpl.html',
                    controller: 'ItemCtrl'
                }
            },
            resolve: {
                rItem: function ($stateParams, Item) {
                    console.log($stateParams)

                    return Item.getItem($stateParams.ref)
                        .then(function(res) {
                            console.log(res)
                            return res.item;
                        }, function(err) {
                            console.log(err)
                        });
                }
            }
        })
    })

.controller('ItemCtrl', function ItemCtrl($scope, rItem) {
        console.log(rItem)
        $scope.item = rItem;
    })