// Karma configuration
// Generated on Thu May 26 2016 18:09:50 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',    
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        "bower_components/angular-ui-router/release/angular-ui-router.js",
        "bower_components/angular-local-storage/dist/angular-local-storage.js",
        "bower_components/angular-toastr/dist/angular-toastr.tpls.js",
        "bower_components/ng-sortable/dist/ng-sortable.js",
        'bower_components/toastr/toastr.js',
        'app/app.js',
        'app/services/auth.service.js',
        'app/auth.intercepter.js',
        'app/login.controller.js',
        'app/register.controller.js',
        'test/auth.service.spec.js',
        'test/register.controller.spec.js',
        'test/auth.intercepter.spec.js',
        'test/login.controller.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
