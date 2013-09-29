angular.module('templates-common', ['directives/fileupload.tpl.html', 'directives/hello.tpl.html']);

angular.module("directives/fileupload.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/fileupload.tpl.html",
    "<input\n" +
    "        class=\"ipt--single\"\n" +
    "        type=\"file\"\n" +
    "        multiple\n" +
    "        accept=\"image/*\"\n" +
    "        onchange=\"angular.element(this).scope().readFilesAndDisplayPreview(files)\"\n" +
    "        ng-model=\"files\">\n" +
    "\n" +
    "<output id=\"list\"></output>");
}]);

angular.module("directives/hello.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/hello.tpl.html",
    "<h1> Just anothet thest  ddhddw {{ name }}</h1>");
}]);
