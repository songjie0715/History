/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var STATIC_DIR = {
    jsDir: [
        './src/js/*.js'
    ]
};
var SRC_DIR = './';


gulp.task('jsCompile', function () {
    gulp.src(STATIC_DIR.jsDir)
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(SRC_DIR+'/js/'));
});


gulp.task('default', ['jsCompile']);


