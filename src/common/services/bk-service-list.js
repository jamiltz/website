angular.module('bk-service-list', [])

.factory('List', function($http) {
        return {
            all: function() {
                return $http.get('/1.0/items')
                    .then(function(result) {
                        return result.data;
                    })
            }
        }
    })