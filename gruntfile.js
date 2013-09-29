module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var taskConfig = {

        pkg : grunt.file.readJSON('package.json'),

        /**
         * The directories to delete when 'grunt clean' is executed
         */
        clean: [
            '<%= dev_dir %>',
            '<%= dist_dir %>'
        ],

        copy: {
            dev_appjs: {
                files: [
                    {
                        src: ['<%= src_files.js %>'],
                        dest: '<%= dev_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            dev_vendorjs: {
                files: [
                    {
                        src: ['<%= vendor_files.js %>'],
                        dest: '<%= dev_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            dev_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= dev_dir %>/assets',
                        cwd: 'src/assets',
                        expand: true
                    }
                ]
            },
            dist_assets: {
                files: [
                    {
                        src: [ '**' ],
                        dest: '<%= dist_dir %>/assets',
                        cwd: '<%= dev_dir %>/assets',
                        expand: true
                    }
                ]
            }
        },

        /**
         * For rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then execute the listed tasks when they do.
         * This just saves us from having to type 'grunt' into the command-line every time we want
         * to see what we're working on; we can instead just leave 'grunt watch' running in a background
         * terminal. Set it and forget about it.
         *
         * But we don't want the same things to happen for all files
         */
        delta: {
            /**
             * By default, we want the livereload to happen for all tasks, this is overridden in
             * some tasks where browser resources are unaffected. It runs by default on port
             * 35729, which your browser plugin should auto-detect.
             */
            options: {
                livereload: true
            },
            sass: {
                files: '<%= src_files.sass %>',
                tasks: ['compass:dev']
            },
            /**
             * When index.html changes, we need to change it.
             */
            html: {
                files: '<%= src_files.html %>',
                tasks: ['index:dev']
            },
            /**
             * When our templates change, we only rewrite the template cache
             */
            tpls: {
                files: [
                    '<%= src_files.atpl %>',
                    '<%= src_files.ctpl %>'
                ],
                tasks: ['html2js']
            },
            /**
             * When our JavaScript source files change, we want to run lint,
             * test and copy to the dev folder
             */
            jssrc: {
                files: [
                    '<%= src_files.js %>'
                ],
                tasks: ['karma:unit:run', 'copy:dev_appjs']
            },
            /**
             * When a JavaScript unit test file changes, we only want to run the unit tests.
             * We don't want to do any live reload.
             */
            jsunit: {
                files: [
                    '<%= src_files.jsunit %>'
                ],
                tasks: ['karma:unit:run'],
                options: {
                    livereload: false
                }
            },
            /**
             * When assets are changed, copy them. Note that will *not* copy new files,
             * so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: [ 'copy:dev_assets' ]
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%= src_files.sassDir %>',
                    cssDir: '<%= dev_files.css %>',
                    relativeAssets: true,
                    require: 'susy'

                }

            },
            compile: {
                options: {
                    sassDir: '<%= src_files.sassDir %>',
                    cssDir: '<%= dev_files.css %>',
                    relativeAssets: true,
                    require: 'susy'
                }
            }

        },

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files
         * and places them into JavaScript files as string that are added
         * to AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from 'src/app'
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: [ '<%= src_files.atpl %>' ],
                dest: '<%= dev_dir %>/templates-app.js'
            },

            /**
             * These are the templates from 'src/common'
             */
            common: {
                options: {
                    base: 'src/common'
                },
                src: [ '<%= src_files.ctpl %>' ],
                dest: '<%= dev_dir %>/templates-common.js'
            }
        },

        /**
         * The Karma configuration
         */
        karma: {
            options: {
                configFile: '<%= dev_dir %>/karma-unit.js'
            },
            unit: {
                runnerPort: 9101,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= dev_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    'vendor/angular-mocks/angular-mocks.js',
                    '<%= src_files.js %>'
                ]
            }
        },


        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            dev: {
                dir: '<%= dev_dir %>',
                src: [
                    '<%= compass.dev.options.cssDir %>/*.css',
                    '<%= vendor_files.js %>',
                    '<%= dev_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            dist: {
                dir: '<%= dist_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    'dist/assets/*.css'
                ]
            }
        },


        /**
         * 'grunt concat' concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The 'compile_js' target is the concatenation of our application source code
             * and all specified vendor source code into a single file
             */
            compile_js: {
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= dev_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    'module.suffix'
                ],
                dest: '<%= dist_dir %>/assets/<%= pkg.name %>.js'
            },

            compile_css: {
                src: [
                    '<%= dev_dir %>/css/*.css'
                ],
                dest: '<%= dist_dir %>/assets/<%= pkg.name %>.css'
            }
        },

        /**
         * 'ng-min' annotates the sources before minifying. That is, it allows us to code
         * without the array syntax.
         */
        ngmin: {
            compile: {
                files: [
                    {
                        src: [ '<%= src_files.js %>' ],
                        cwd: '<%= dev_dir %>',
                        dest: '<%= dev_dir %>',
                        expand: true
                    }
                ]
            }
        },

        /**
         * Minify the source!
         */
        uglify: {
            compile: {
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        }



    };

    var userConfig = require('./build.config.js');

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the 'watch' task to 'delta' (that's why the configuration var above os 'delta')
     * and then add a new task called 'watch' that does a clean build before
     * watching for changes.
     */
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);

    /**
     * The 'build' task gets your app ready to run for development and testing
     */
    grunt.registerTask('build', [
        'clean', 'html2js', 'copy:dev_appjs', 'copy:dev_vendorjs', 'copy:dev_assets', 'compass:dev', 'index:dev', 'karmaconfig'
    ]);

    grunt.registerTask('compile', [
        'compass:compile', 'ngmin', 'concat', 'uglify', 'index:dist', 'copy:dist_assets'
    ]);

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.css$/ );
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles the list
     * into variables for the template to use and then runs the compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp( '^('+grunt.config.data.dev_dir+'|'+grunt.config.data.dist_dir+')\/', 'g' );
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
            console.log(file.replace( dirRE, '' ));
            return file.replace( dirRE, '' );
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        styles: cssFiles,
                        scripts: jsFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });


    /**
     * In order to avoid having to specify manually the files needed for karma to run,
     * we use grunt to manage the list for us. The 'karma/*' files are compiled
     * as grunt templates for use by Karma
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {

        var jsFiles = filterForJS( this.filesSrc );
        grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('dev_dir') + '/karma-unit.js', {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

};