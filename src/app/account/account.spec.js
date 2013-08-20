describe('Account', function() {
    var $scope;
    var ctrl;

    beforeEach(module('bk-page-account'));

    it('should show the form to add sell a new Item', function() {
        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            ctrl = $controller('AccountCtrl', {
                $scope: $scope
            });
        });

        expect($scope.name).toEqual('James');



    })
})