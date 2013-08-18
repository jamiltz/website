angular.module('bk-service-user', [])

.factory('User', function($http) {
    return {
        signup: function() {
            return $http.post('/user')
                .then(function(result) {
                    var obj = {
                        data: result.data,
                        status: result.status
                    };
                    return obj;
                });
        }
    };
});