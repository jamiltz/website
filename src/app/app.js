/**
 * Bootstrapping file for the angular app. Always remember that the
 * execution context of this file is in the browser, thus we need to call the templates-main module
 * that contains all the templates we need
 */
angular.module( 'main', [
        'templates-app',
        'templates-common',
        'bk-page-signup',
        'da-users',
        'da-admin',
        'ui.state',
        'ui.router',
        'da-service',
        'bk-service-user',
        'bk-page-login',
        'bk-page-home',
        'bk-page-account',
        'bk-directive-fileupload',
        'bk-service-list',
        'bk-page-item',
        'bk-service-item'
    ])

    .config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider ) {
        $urlRouterProvider.otherwise( '/' );

        $locationProvider.html5Mode(true);

//        $httpProvider.interceptors.push(function() {
//            return {
//                'request': function(config) {
//                    if(config.url === 'signup/signup.tpl.html') {
//                        return config;
//                    }
//                    config.url = '1.0' + config.url;
//                    return config;
//                }
//            };
//        });


    })

    .run( function run ( $rootScope ) {

        $rootScope.state = 'loggedOut';

    })

    .controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

//        d3.select('body')
//            .append('h1')
//            .text('Hey Thet')
//            .style('color', 'red');

    })
;