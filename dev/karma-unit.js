module.exports = function ( karma ) {
    karma.set({
        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: '../',

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: [
            'vendor/angular/angular.js',
                'vendor/ngcookies/angular-cookies.js',
                'vendor/angular-ui-router/release/angular-ui-router.js',
                'dev/templates-app.js',
                'dev/templates-common.js',
                'vendor/angular-mocks/angular-mocks.js',
                'src/app/account/account.js',
                'src/app/admin/admin.js',
                'src/app/admin/users.js',
                'src/app/app.js',
                'src/app/home/home.js',
                'src/app/item/item.js',
                'src/app/login/login.js',
                'src/app/signup/signup.js',
                'src/common/directives/bk-directive-fileupload.js',
                'src/common/directives/da-directive-hello.js',
                'src/common/services/bk-service-item.js',
                'src/common/services/bk-service-list.js',
                'src/common/services/bk-service-session.js',
                'src/common/services/bk-service-user.js',
                'src/common/services/myService.js',
                
            'src/**/*.spec.js',
      'src/**/*.coffee',
    ],

    frameworks: [ 'jasmine' ],
    plugins: [ 'karma-jasmine', 'karma-firefox-launcher', 'karma-chrome-launcher', 'karma-coffee-preprocessor' ],
    preprocessors: {
      '**/*.coffee': 'coffee',
    },

    /**
     * How to report, by default.
     */
    reporters: 'dots',

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

            /**
            * Disable file watching by default.
            */
            autoWatch: false,

            /**
            * The list of browsers to launch to test on. This includes only "Firefox" by
            * default, but other browser names include:
            * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
            *
            * Note that you can also use the executable name of the browser, like "chromium"
            * or "firefox", but that these vary based on your operating system.
            *
            * You may also leave this blank and manually navigate your browser to
            * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: [
      'Firefox'
    ]
  });
};

