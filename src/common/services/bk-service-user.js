angular.module('bk-service-user', [])

.factory('User', function($http) {
    return {
        signup: function(data) {
            return $http.post('/user', data)
                .then(function(result) {
                    return result.data;
                });
        }
    };
});