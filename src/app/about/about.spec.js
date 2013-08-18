/**
 * Tests sit right alongside the file they are testing, which is more intuitive and
 * portable than seperating 'src' and 'test' directories. Additionally, the build
 * process will exclude all '.spec.js' files from the build automatically
 */

describe('Testing controller', function() {
    var $scope;
    var ctrl;

    beforeEach(module('da-about'));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();

        ctrl = $controller('AboutCtrl', {
            $scope: $scope
        });
    }));

    it('should publish something to the scope', function() {
        expect($scope.name).toEqual('James');
    });
});