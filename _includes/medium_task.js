// comment: running a repeated task

gulp.task('medium', function (cb) {
    exec('node medium.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});