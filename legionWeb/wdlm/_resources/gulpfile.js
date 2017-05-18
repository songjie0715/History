/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');


var STATIC_DIR = {
    jsDir: [
        '!./src/js/plugins/*.js',
        './src/js/**/*.js'
    ],
    cssDir: './src/'
};
var SRC_DIR = './';

gulp.task('sass', function () {
    gulp.src(STATIC_DIR.cssDir + '/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(SRC_DIR+'css/'));
});


gulp.task('jsCompile', function () {
    gulp.src(STATIC_DIR.jsDir)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(SRC_DIR+'/js/'));
});

gulp.task('watch', function () {
    gulp.watch(STATIC_DIR.cssDir + 'sass/*.scss', ['sass']);
    gulp.watch(STATIC_DIR.jsDir, ['jsCompile']);
});



gulp.task('default', ['watch', 'jsCompile', 'sass']);


