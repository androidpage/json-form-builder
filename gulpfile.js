const replace = require('gulp-replace');
const gulp = require('gulp');

gulp.task('map-css', function(){
    return gulp.src("dist/**/*.js")
        .pipe(replace(/require\(.+\.module\.scss.{1}\)/, function(match){
            console.log(match);
            const res = match.replace("scss", "css");
            console.log(res);
            return res;
        }))
        .pipe(gulp.dest("./dist/"));
});

//  /require\(".+\.module\.scss"\