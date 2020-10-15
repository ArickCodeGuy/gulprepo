var gulp = require('gulp');
var watch = require('gulp-watch');
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var beautify = require('gulp-beautify');
// check sourcemaps for working
var sourcemaps = require('gulp-sourcemaps');
var webp = require('gulp-webp');
var webpHtml = require('gulp-webp-html');


// compiling sass, beautifying it, moving to dist
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(beautify.css({indent_size: 2}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

// just transfering js file from one folder to another
gulp.task('js', function() {
	// may be in future it'll be compiled or smth
	return gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));
});

// compiling html files
gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(webpHtml())
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(beautify.html({intent_size:2}))
		.pipe(gulp.dest('dist'));
});

// minifying all images, creating .webp version of it (if it's .png, .jpg, .gif), distributing to dist
gulp.task('imagemin', function() {
	return gulp.src('app/img/**')
		.pipe(changed('dist/img'))
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(webp())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('app/*.html', gulp.series('html'));
	gulp.watch('app/js/*.js', gulp.series('js'));
	gulp.watch('app/img/**', gulp.series('imagemin'));
});

gulp.task('default', gulp.series('sass', 'js', 'html', 'watch'));