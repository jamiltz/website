This is the project stucture for an angular app.

We use grunt.js to minify, concatenate...the angular app.

All those steps are in Gruntfile.js

In the build folder, we have shell scripts that can be run
on the server each time there is a push by using a web
hook.

About the angularJS file structure
Most of the application files should be organized by a feature.
Scripts and partials that are functionally realted to each other should go together.
The idea: ALL FILES CHANGING TOGETHER ARE GROUPED TOGETHER

However, there is an exception for files that CAN BE REUSED ACROSS THE APPLICATION
(persistence store access, localization, directives), they should be grouped together.