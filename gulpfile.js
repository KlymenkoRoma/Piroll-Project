var
    gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    cssnano = require("gulp-cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    gulpif = require("gulp-if"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    sync = require("browser-sync").create();

gulp.task("html", function(){
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});

var IS_DEV = true;

gulp.task("app_less", function () {
    return gulp.src("src/styles/**/*.less")
        .pipe(gulpif(IS_DEV, sourcemaps.init()))
        .pipe(less())
        .pipe(concat("main.min.css"))
        .pipe(cssnano())
        .pipe(gulpif(IS_DEV, sourcemaps.write(".")))
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream());
});

gulp.task("vendor_css", function () {
    return gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/slick-carousel/slick/slick.css",
        "node_modules/slick-carousel/slick/slick-theme.css",
        "node_modules/lightbox2/dist/css/lightbox.min.css",
        "node_modules/toastr/build/toastr.min.css"
    ])
        .pipe(gulpif(IS_DEV, sourcemaps.init()))
        .pipe(concat("vendor.min.css"))
        .pipe(cssnano())
        .pipe(gulpif(IS_DEV, sourcemaps.write(".")))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("js", function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/countup.js/dist/countUp.min.js",
        "node_modules/slick-carousel/slick/slick.min.js",
        "node_modules/lightbox2/dist/js/lightbox.min.js",
        "node_modules/toastr/build/toastr.min.js",
        "src/js/*.js"
    ])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
});

gulp.task("json", function(){
    return gulp.src("src/images.json")
        .pipe(gulp.dest("dist"));
});

gulp.task("images", function(){
    return gulp.src("src/images/*")
        .pipe(gulp.dest("dist/images"));
});

gulp.task("watch", ["html", "app_less", "vendor_css", "js", "json", "images"], function () {
    sync.init({
        server: "dist"
    });

    gulp.watch("src/styles/**/*.less", ["app_less"]);

    gulp.watch("src/index.html", ["html"]);
    gulp.watch("dist/index.html").on("change", sync.reload);

    gulp.watch("src/contact.html", ["html"]);
    gulp.watch("dist/contact.html").on("change", sync.reload);

    gulp.watch("src/js/*.js", ["js"]);
    gulp.watch("dist/js/*.js").on("change", sync.reload);
});

gulp.task("default", ["watch"]);