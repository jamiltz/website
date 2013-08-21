angular.module('bk-service-item', [])

.factory('Item', function($http) {
        return {
            getItem: function(ref) {
                return $http.get('/1.0/item/' + ref)
                    .then(function(result) {
                        return result.data;
                    })
            }
        }
    })