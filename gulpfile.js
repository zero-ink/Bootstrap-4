const gulp = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

/* BOWER */
const bower = require('gulp-bower');

/* JS ES6 */
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify');
const tap = require('gulp-tap');
const babel = require('babelify');
const minify = require('gulp-minify');
const gutil = require('gulp-util');
const clean = require('gulp-rimraf');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const browserify = require('browserify');
const notify = require("gulp-notify");

/* server */
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');

/* ERROR Report */
const reportError = function(error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}

/* Folder Path */

const sourceFile = 'source/';
const publicFile = 'public/';
const pathTo = require('./package.json').sourcePath;
const pathFrom = require('./package.json').sourcePath;

/* SASS WATCH Styling */
gulp.task('styles', function() {
    gulp.src('./source/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css/'));
    gutil.log('\n===========================\nWatch is running! \nSCSS is running! :-D\n===========================');
});

/* JS Minify to one JS File */
gulp.task('compress', function() {
    return gulp.src(`${pathFrom.root + pathTo.source}/js/**/*.js`, {
            read: false
        })
        .pipe(tap((file) => {
            file.contents = browserify(file.path, {
                    debug: true
                }).transform(babel, {
                    presets: ['es2015']
                }).bundle()
                .on('error', notify.onError({
                    title: "Failed running browserify for JS 'Work on your CODE quality!'",
                    message: "Error: <%= error.message %>"
                }));
        }))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${pathFrom.root + pathTo.public}/js/`));
    gutil.log('\n===========================\nWatch is running! \nJavaScript is running! :-D\n===========================');
});

/* BOWER */
gulp.task('bower', function() {
    return bower('./bower_components')
        .pipe(gulp.dest('./libs/'));
});

/* WATCHING YOU ;-) */
gulp.task('watch', function() {
    gulp.watch('./source/js/**/*.js', ['compress']);
    gulp.watch('./plugins/**/*.js', ['scripts']);
    gulp.watch('./source/sass/**/*.scss', ['styles']);
    gulp.watch('./bower.json', ['bower']);
});

/* run server */
gulp.task('connect-sync', function() {
    connect.server({}, function() {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });
    gulp.watch('**/*.php').on('change', function() {
        browserSync.reload();
    });
    gulp.watch('./public/**/*.js').on('change', function() {
        browserSync.reload();
    });
    gulp.watch('./public/**/*.css').on('change', function() {
        browserSync.reload();
    });
});

gulp.task('default', ['compress', 'styles', 'bower', 'watch', 'connect-sync'], function() {
    return gutil.log('\n===========================\nGulp is running! \nhave some fun! :-D\n===========================');
});
