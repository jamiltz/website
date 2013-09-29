angular.module('bk-directive-fileupload', []).directive('fileupload', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/fileupload.tpl.html',
    scope: { pictures: '=' },
    link: function (scope, elt, attrs) {
      var j = 0;
      scope.pictures = [];
      scope.readFilesAndDisplayPreview = function (files) {
        var length = files.length;
        for (var i = 0, f = files[i]; i < length; i++) {
          if (!f.type.match('image.*')) {
            continue;
          }
          ;
          var reader = new FileReader();
          reader.onload = function (id) {
            return function (e) {
              scope.pictures.push(e.target.result.split(',')[1]);
              var span = document.createElement('span');
              span.innerHTML = '<img class=\'thumb\' src=\'' + e.target.result + '\'>' + '<br>';
              document.getElementById('list').insertBefore(span, null);
            };
          }(j);
          reader.readAsDataURL(f);
          j++;
        }
      };
    }
  };
});