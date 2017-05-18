/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

var SRC_DIR = './';


gulp.task('minify-css', function () {
    gulp.src(SRC_DIR+'css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(SRC_DIR+'css/'))
});


gulp.task('build', ['minify-css']);


