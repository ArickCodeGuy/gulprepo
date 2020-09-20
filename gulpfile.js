var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var fileinclude = require('gulp-file-include');


gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function() {
	// may be in future it'll be compiled or smth
	return gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('html', function() {
	return gulp.src('app/**/*.html')
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch(['app/*.html', 'app/include/*.html'], gulp.series('html'));
	gulp.watch('app/js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('sass', 'js', 'html', 'watch'));