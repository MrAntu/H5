const  gulp = require('gulp');
const  htmlmin = require('gulp-htmlmin');

// 使用gulp。task建立任务
gulp.task('first', () => {

    gulp.src('./src/css/base.css')
        .pipe(gulp.dest('dist/css'));
})
//html任务
gulp.task('htmlmin', () => {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

