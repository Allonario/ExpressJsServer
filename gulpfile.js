import gulp from 'gulp'
import less from 'gulp-less'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import copy from 'gulp-copy'

const paths = {
    js: './public/js/**/*.js',
    less: './public/less/**/*.less',
    img: './public/img/**/*',
};

gulp.task('less', () => {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('./gulp/css'));
});

gulp.task('js', () => {
    return gulp.src(paths.js)
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./gulp/js'));
});

gulp.task('copy-img', () => {
    return gulp.src(paths.img)
        .pipe(gulp.dest('./gulp/img'));
});

gulp.task('watch', () => {
    gulp.watch(paths.less, gulp.series('less'))
    gulp.watch(paths.js, gulp.series('js'))
    gulp.watch(paths.img, gulp.series('copy-img'))
});

gulp.task('default', gulp.series('less', 'js', 'copy-img', 'watch'));
