/**
 * This file/modules contains all configuration for the build process.
 */
module.exports = {
    /**
     * The 'build_dir' is where our project is compiled during development and the
     * 'compile_dir' is where our app resides once it completely builds.
     */
    dev_dir: 'dev',
    dist_dir: 'dist',

    dev_files: {
        css: 'dev/css'
    },

    /**
     * This is a collection of file patterns that refer to our app code (the stuff
     * in 'src/'). These file paths are used in the configuration of build tasks.
     * 'js' is all the javascript less the tests. 'ctpl' contains our reusable components'
     * ('src/common') template HTML files, and 'atpl' contains the view templates.
     * 'html' is just our main HTML file, 'sass' is our style code and 'unit' contains our app's
     * unit tests.
     */
    src_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js', '!src/**/*.e2e.js'],
        jsunit: [ 'src/**/*.spec.js'],

        atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        sass: 'src/sass/*.scss',
        sassDir: 'src/sass/'
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     */
    vendor_files: {
        js: [
            'vendor/angular/angular.js',
            'vendor/ngcookies/angular-cookies.js',
            'vendor/angular-ui-router/release/angular-ui-router.js'
        ],
        css: [
        ]
    }
};