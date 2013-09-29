angular.module('da-users', ['ui.state']).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('users', {
      url: '/users',
      views: {
        main: {
          templateUrl: 'admin/users.tpl.html',
          controller: 'UsersCtrl'
        }
      }
    });
  }
]).controller('UsersCtrl', [
  '$scope',
  function AboutCtrl($scope) {
    $scope.name = 'James';
    $scope.name = 'James';
  }
]);