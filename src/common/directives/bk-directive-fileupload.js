angular.module('bk-directive-fileupload', [])

.directive('fileupload', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/fileupload.tpl.html',
            scope: {
                pictures: '='
            },
            link: function(scope, elt, attrs) {
                var j = 0;
                scope.pictures = [];

                scope.readFilesAndDisplayPreview = function(files) {

                    var length = files.length;
                    for(var i = 0, f=files[i]; i<length; i++) {

                        //Check the file is an image
                        if(!f.type.match('image.*')) {
                            continue
                        };
                        var reader = new FileReader();

                        //Use a closure + immediately invoked expression because we need
                        //to keep a reference of the current id, that's j
                        reader.onload = (function(id) {
                            return function(e) {
                                scope.pictures.push(e.target.result.split(',')[1]);
                                var span = document.createElement('span');
                                span.innerHTML = "<img class='thumb' src='"+ e.target.result +"'>" +
                                    "<button class='btn--upload' data-id='"+ id +"'data-src='"+ e.target.result.split(',')[1] +"' onclick='uploadIndividualImage(this)' >Upload individual image</button>" +
                                    "<br>"
                                document.getElementById('list').insertBefore(span, null);
                            }
                        })(j)
                        reader.readAsDataURL(f);

                        //Iterate through j, what we use as index iteration
                        j++;
                    }



                }


                function uploadIndividualImage(elt) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:4000/api/upload');

                    xhr.upload.onprogress = function(e) {
                        qs('.progress-'+ elt.dataset.id).value = e.loaded;
                        qs('.progress-'+ elt.dataset.id).max = e.total;
                    }

                    xhr.onload = function() {
                        console.log("Upload completed");
                    }

                    var form = new FormData();
                    form.append('file', elt.dataset.src);
                    xhr.send(form);
                }
            }
        }
    })