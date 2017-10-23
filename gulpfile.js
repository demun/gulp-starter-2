// 변수 설정
const autoprefixer = require('autoprefixer');
const babel        = require('gulp-babel');
const bs           = require('browser-sync');
const changed      = require('gulp-changed');
const concat       = require('gulp-concat');
const del          = require('del');
const eslint       = require('gulp-eslint');
const fileinclude  = require('gulp-file-include');
const gulp         = require('gulp');
const gutil        = require('gulp-util');
const imagemin     = require('gulp-imagemin');
const minimist     = require('minimist');
const nano         = require('gulp-cssnano');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');
const prettify     = require('gulp-prettify');
const postcss      = require('gulp-postcss');
const sequence     = require('run-sequence');
const uglify       = require('gulp-uglify');
const sass         = require('gulp-sass');

// 경로 설정
const path = {
  build: 'build',
  src: 'src',
};

// 빌드 옵션 설정
const options = minimist(process.argv.slice(2), {
  string: ['env'],
  default: {
    env: 'dev',
  },
});

// 스트림 오류 잡기
const gulpSrc = gulp.src;
gulp.src = function onError(...args) {
  return gulpSrc
    .apply(gulp, args)
    // Catch errors
    .pipe(plumber(function onError(error) {
      gutil.log(gutil.colors.red(`Error (${error.plugin}):${error.message}`));
      this.emit('end');
    }));
};

// 폴더 및 파일 삭제
gulp.task('clean', () => del('./build'));
gulp.task('clean:css', () => del('./build/css'));
gulp.task('clean:js', () => del('./build/js'));


// Javascript task
// -----------------------------
// bower js -> build/js/bundle.js
gulp.task('js:vendor', () => { 
  var allfiles = [
    `./bower_components/jquery/dist/jquery.js`, 
    `./bower_components/xzoom/dist/xzoom.min.js`,
    `./bower_components/swiper/dist/js/swiper.js`
  ];
  gulp.src(allfiles)
  .pipe(changed(`${path.build}/js`))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(`${path.build}/js`))
});

// src main.js -> build/js/main.js
gulp.task('js:main', () => gulp
  .src(`${path.src}/js/*.js`)
  // .pipe(eslint())
  .pipe(eslint({
    configFile: 'eslint.json'
  }))
  .pipe(eslint.format())
  .pipe(babel())
  .pipe(concat('main.js'))
  .pipe(gulp.dest(`${path.build}/js`))
);

// js -> min.js
gulp.task('js:concat', () => {
  gulp.src(`${path.build}/js/*.js`)
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulp.dest(`${path.build}/js`))
});





// CSS task
// -----------------------------

// bower_components *.css -> src .css
gulp.task('css:vendor', () => { 
  var allfiles = [
    `./bower_components/icomoon-bower/style.css`, 
    `./bower_components/font-awsome/css/font-awesome.css`,
    `./bower_components/xzoom/dist/xzoom.css`,
    `./bower_components/swiper/dist/css/swiper.css`
  ];
  gulp.src(allfiles)
  // .pipe(changed(`${path.src}/css`))
  .pipe(concat(`bundle.css`))
  .pipe(gulp.dest(`${path.build}/css`))
});

// scss -> css
gulp.task('scss', () => 
  gulp.src(`${path.src}/scss/*.scss`)
  .pipe(sass({
    outputStyle: 'expanded',
  }))
  .pipe(postcss([
    autoprefixer,
  ]))
  // .pipe(concat(`main.css`))
  .pipe(gulp.dest(`${path.build}/css`))
);

// src css -> build css, min.css
gulp.task('css:min', () => {
  gulp.src(`${path.build}/css/*.css`)
  .pipe(nano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(`${path.build}/css`))
});


// Views task
// -----------------------------
gulp.task('views', () => gulp
  .src(`${path.src}/views/files/**/*.html`)
  .pipe(changed(path.build, {
    extension: '.html',
  }))
  .pipe(fileinclude({
    prefix: '@@',
      basepath: '@file',
      context: {
        name: 'example'
      },
  }))
  .pipe(prettify({ indent_size: 2 }))
  .pipe(gulp.dest(path.build))
);





// 폰트 복사
gulp.task('fonts', () => gulp
  // Select files
  .src(`${path.src}/fonts/**/*`)
  // Check for changes
  .pipe(changed(`${path.build}/fonts`))
  // Save files
  .pipe(gulp.dest(`${path.build}/fonts`))
);


// vendors fonts
gulp.task('fonts:vendor', () => { 
  var allfiles = [
    `./bower_components/icomoon-bower/fonts/**/*`, 
    `./bower_components/font-awsome/fonts/**/*`
  ];
  gulp.src(allfiles)
  .pipe(changed(`${path.build}/fonts`))
  .pipe(gulp.dest(`${path.build}/fonts`))
});


// 이미지 최적화
gulp.task('images', () => gulp
  .src(`${path.src}/images/**/*`)
  .pipe(imagemin())
  // .pipe(changed(`${path.build}/images`))
  .pipe(gulp.dest(`${path.build}/images`))
);



// Assets
gulp.task('assets', (callback) => sequence(
  ['fonts'],
  ['images'],
  ['fonts:vendor'],
  callback
));

// server
gulp.task('server', () => {
  // 로컬 서버 생성 및 초기화
  bs.create();
  bs.init({
    notify: false,
    server: `./${path.build}`,
    open: 'local',
    ui: false,
  });
  // 빌드 변경 및 브라우저 리로드 관찰
  bs.watch(`${path.build}/**/*`).on('change', bs.reload);
  gulp.watch(`./${path.src}/fonts/**/*`, ['fonts']);
  gulp.watch(`./${path.src}/images/**/*`, ['images']);
  gulp.watch(`./${path.src}/scss/**/*.scss`, ['css:task']);
  gulp.watch(`./${path.src}/js/*.js`, ['js:task']);
  gulp.watch(`./${path.src}/views/**/*.html`, ['views']);
});


// Default task
gulp.task('default', (callback) => sequence(
  ['build'],
  ['server'],
  callback
));


// Build static assets
gulp.task('build', (callback) => sequence(
  ['clean'],
  ['assets'],
  ['js:task'],
  ['css:task'],
  ['views'],
  callback
));


// css task
gulp.task('css:task', (callback) => sequence(
  // ['clean:css'],
  ['css:vendor'],
  ['scss'],
  ['css:min'],
  callback
));

// javascript task
gulp.task('js:task', (callback) => sequence(
  // ['clean:js'],
  ['js:vendor'],
  ['js:main'],
  ['js:concat'],
  callback
));

