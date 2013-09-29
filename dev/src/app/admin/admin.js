angular.module('da-admin', ['ui.state']).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      views: {
        main: {
          templateUrl: 'admin/admin.tpl.html',
          controller: 'AdminCtrl'
        }
      }
    });
  }
]).controller('AdminCtrl', [
  '$scope',
  'myService',
  function AdminCtrl($scope, myService) {
    $scope.name = 'James';
    $scope.name = 'James';
    $scope.content = myService.action();
  }
]);