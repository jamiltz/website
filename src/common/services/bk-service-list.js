angular.module('bk-service-list', [])

.factory('List', function($http) {
        return {
            getGroupItems: function(group) {
                return $http.get('/1.0/items/?group=' + group)
                    .then(function(result) {
                        return result.data;
                    })
            }
        }
    })