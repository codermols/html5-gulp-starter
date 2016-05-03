var gulp 			= require('gulp'),
	uglify 			= require('gulp-uglify'),
	sass 			= require('gulp-sass'),
	livereload 		= require('gulp-livereload'),
	imagemin		= require('gulp-imagemin'),
	autoprefixer 	= require('gulp-autoprefixer');

// Error Handling
// Displays error in console
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// Script task
// Uglifies
gulp.task('scripts', function () {
	gulp.src('js/*.js')
		.pipe(uglify())
		.on('error', errorLog)
		.pipe(gulp.dest('./build/js'));

});

// Sass task
// Uglifies
gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
    	.pipe(sass({
    		outputStyle: 'compressed'
    		})
    	.on('error', errorLog))
    	.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    	.pipe(gulp.dest('./build/css/'))
    	.pipe(livereload());
});

// Image compresser task
// Compress
gulp.task('image', function () {
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./img'));
});

// Watch tasks
// Watches JS
gulp.task('watch', function () {
	livereload.listen();﻿

	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('./sass/**/*.scss', ['sass']);

});



gulp.task('default', ['scripts', 'sass', 'watch']);