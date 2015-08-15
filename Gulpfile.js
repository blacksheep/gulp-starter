(function(){
  'use strict';

  /*
   * --->  Loading External Node.js Modules  <------
   */
  var gulp = require('gulp');
  var sass = require('gulp-sass');
  var connect = require('connect');
  var serveStatic = require('serve-static')
  var livereload = require('gulp-livereload');
  var connectLivereload = require('connect-livereload');
  var opn = require('opn');

  /*
   * ---------->  Main Config  <-------------
   */
  var config = {
    rootDir: __dirname,
    servingPort: 3000,

    srcHtmlPath: ['./src/**/*.html', '!Gulpfile.js' ],
    srcScssPath: ['./src/scss/*.scss' ],

    buildHtmlPath: './build/',
    buildScssPath: './build/css/'
  };


  gulp.task('sass', function () {
    gulp.src(config.srcScssPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.buildScssPath))
    .pipe(livereload());
  });

  gulp.task('sass:watch', function () {
    gulp.watch(config.srcScssPath, ['sass']);
  });

  gulp.task('html', function () {
    gulp.src(config.srcHtmlPath)
    .pipe(gulp.dest(config.buildHtmlPath))
    .pipe(livereload());
  });

  gulp.task('html:watch', function () {
    gulp.watch(config.srcHtmlPath, ['html']);
  });

  // `gulp watch` task watching for file changes
  gulp.task('watch', [ 'html:watch', 'sass:watch'], function () {
    livereload.listen();
  });

  // `gulp serve` task loading the URL in your browser
  gulp.task('serve', ['connect'], function () {
    console.log('http://localhost:' + config.servingPort);
    return opn('http://localhost:' + config.servingPort);
  });

  // `gulp connect` task starting your server
  gulp.task('connect', function(){
    return connect()
    .use(connectLivereload())
    .use(serveStatic(config.buildHtmlPath))
    .listen(config.servingPort);
  });

  // The default task - called when you run `gulp` from CLI
  gulp.task('default', ['watch', 'html', 'sass', 'serve']);
}());
