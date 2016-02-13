'use strict';
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
const plugins = gulpLoadPlugins({
  rename:{
    'gulp-util': 'util',
    'gulp-if': 'if',
    'gulp-streamify': 'streamify',
    'gulp-autoprefixer': 'autoprefixer',
    'gulp-cssmin': 'cssmin',
    'gulp-sass': 'sass',
    'gulp-concat': 'concat',
    'gulp-plumber': 'plumber',
    'gulp-uglify': 'uglify',
    'gulp-sourcemaps': 'sourcemaps',
    'gulp-imagemin': 'imagemin',
    'gulp-size': 'size',
    'gulp-notify': 'notify'
  },
  scope: 'devDependencies'
});

const production = process.env.NODE_ENV === 'production';
const dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'react-notifications',
  'underscore'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', () => {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(production, plugins.uglify({ mangle: false })))
    .pipe(plugins.size({
      title: "Vendor Libraries"
    }))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', () => {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(plugins.if(production, plugins.streamify(plugins.uglify({ mangle: false }))))
    .pipe(plugins.size({
      title: "Vendor Bundle"
    }))
    .pipe(plugins.notify("Vendor Bundle done!"))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], () => {
  return browserify({ entries: 'app/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .pipe(plugins.streamify(plugins.sourcemaps.init({ loadMaps: true })))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(plugins.if(production, plugins.streamify(plugins.uglify({ mangle: false }))))
    .pipe(plugins.streamify(plugins.sourcemaps.write('.')))
    .pipe(plugins.size({
      title: "App Bundle"
    }))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], () => {
  let bundler = watchify(browserify({ entries: 'app/main.js', debug: true }, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] })
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    let start = Date.now();
    return bundler.bundle()
      .on('error', (err) => {
        plugins.util.log(plugins.util.colors.red(err.toString()));
      })
      .on('end', () => {
        plugins.util.log(plugins.util.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(plugins.streamify(plugins.sourcemaps.init({ loadMaps: true })))
      .pipe(plugins.streamify(plugins.sourcemaps.write('.')))
      .pipe(plugins.size({
        title: "App Bundle"
      }))
      .pipe(gulp.dest('public/js/'))
      .pipe(plugins.notify("App Bundle done!"));
  }
});


/*
  /--------------------------------------------------------------------------
  / JPG and PNG image optimization
  / -------------------------------------------------------------------------
*/

gulp.task('images', () => {
	return gulp.src('./app/img/*')
		.pipe(plugins.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
			use: [imageminJpegtran({progressive: true}),imageminPngquant()]
		}))
		.pipe(gulp.dest('public/img'))
		.pipe(plugins.size({
			title:"Images"
		}));
});


/*
 |--------------------------------------------------------------------------
 | Copy web fonts to dist
 |--------------------------------------------------------------------------
*/

gulp.task('fonts', () => {
  return gulp.src('bower_components/bootstrap-sass/assets/fonts/**')
    .pipe(plugins.size({
      title:"Fonts"
    }))
    .pipe(gulp.dest('public/fonts/'))
});

/*
 |--------------------------------------------------------------------------
 | Compile sass stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', () => {
  return gulp.src('app/stylesheets/main.sass')
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error in styles task: <%= error.message %>")}))
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.if(production, plugins.cssmin()))
    .pipe(plugins.size({
      title:"Styles"
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
  gulp.watch('app/stylesheets/**/*.sass', ['styles']);
});

gulp.task('default', ['styles','fonts', 'images','vendor', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'images','vendor', 'browserify']);
