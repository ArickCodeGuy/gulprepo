var gulp = require('gulp');
var watch = require('gulp-watch');
// var sass = require('gulp-sass');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var beautify = require('gulp-beautify');


gulp.task('sass', function() {
	return gulp.src('app/scss/**/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(beautify.css({indent_size: 2}))
		.pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
	// may be in future it'll be compiled or smth
	return gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**')
		.pipe(changed('dist/img'))
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
})

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('app/*.html', gulp.series('html'));
	gulp.watch('app/js/*.js', gulp.series('js'));
	gulp.watch('app/img/**', gulp.series('imagemin'));
});

gulp.task('default', gulp.series('sass', 'js', 'html', 'watch'));