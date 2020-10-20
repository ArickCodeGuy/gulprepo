var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var beautify = require('gulp-beautify');
// check sourcemaps for working properly
// var sourcemaps = require('gulp-sourcemaps');
var webp = require('gulp-webp');
// adds <picture> <source> over img tag
var webpHtml = require('gulp-webp-html');
var minifyJs = require('gulp-uglify');
var minifyCss = require('gulp-uglifycss');

// compiling sass, beautifying it, moving to dist
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(beautify.css({indent_size: 2}))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

// transfer all .js files to dist. Also concat all into main.js
gulp.task('js', function() {
	// may be in future it'll be compiled or smth
	return gulp.src('app/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(beautify.js({indent_size: 2}))
		.pipe(gulp.dest('dist/js'));
});

// compiling html files
gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(webpHtml())
		.pipe(beautify.html({intent_size:2}))
		.pipe(gulp.dest('dist'));
});

// minifying all images, creating .webp version of it (if it's .png, .jpg, .gif), distributing to dist
gulp.task('imagemin', function() {
	return gulp.src('app/img/**')
		.pipe(changed('dist/img/'))
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});
gulp.task('webp', function() {
	return gulp.src('app/img/**')
		// source is .png, .jpg, .gif, but output should be .webp
		.pipe(changed('dist/img/',{extension: '.webp'}))
		.pipe(webp())
		.pipe(gulp.dest('dist/img'));
});
gulp.task('imgOpt', gulp.parallel('imagemin','webp'));

// adding bootstrap
gulp.task('bootstrap', function(){
	return gulp.src('node_modules/bootstrap/scss/bootstrap-grid.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/libs/bootstrap'));
});

//  adding libs to project
gulp.task('libs', gulp.parallel('bootstrap'));

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('app/**/*.html', gulp.series('html'));
	gulp.watch('app/js/*.js', gulp.series('js'));
	gulp.watch('app/img/*', gulp.series('imgOpt'));
});

// build task to just build project. Runs async
gulp.task('build', gulp.parallel('sass','js', 'html', 'imgOpt', 'libs'));

// default task to build project and watch changes. Runs sync
gulp.task('default', gulp.series('build', 'watch'));