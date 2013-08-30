angular.module('bk-service-user', [])

.factory('User', function($http, Session, $rootScope, $state) {

    return {
        signup: function(data) {
            return $http.post('/1.0/user', data)
                .then(function(result) {
                    return result.data;
                });
        },
        login: function(user, pass) {
            return $http.post('/1.0/login', {username: user, pass: pass})
                .then(function(result) {
                    return result.data;
                });
        },
        autologin: function(redirect) {
            return $http.get('/1.0/autologin', {headers: {token: Session.getToken()}})
                .then(function(result) {return result.data})
                .then(
                    function(data) {
                        $http.defaults.headers.common['token'] = Session.getToken();
                        $rootScope.state = 'loggedIn';
                        $rootScope.auth = data.user;
                    },
                    function(err) {
                        if(!arguments.length) {

                        } else {
                            $state.transitionTo(redirect);
                        }

                    }
                )
        },
        logout: function() {
            return $http.delete('/1.0/logout', {headers: {token: Session.getToken()}})
                .then(function(result) {return result.data})
                .then(
                    function(data) {
                        $rootScope.state = 'loggedOut';
                        $state.transitionTo('home', {g: null});
                    }
                )
        },
        items: function() {
            return $http.get('/1.0/user/items', {headers: {token: Session.getToken()}})
                .then(function(result) {
                    return result.data
                })
        }

    };
});