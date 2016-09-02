/**
 * Created by Jan on 11.8.2016.
 */
import _gulp from 'gulp';
import gulpHelp from 'gulp-help';
import babel from 'gulp-babel';
import server from 'gulp-develop-server';
import eslint from 'gulp-eslint';
import del from 'del';
import { sequelize } from './app/database/source/models';

const gulp = gulpHelp(_gulp);

const config = {
  src: './app/**/*.js',
  build: './build',
  cnfg: './app/config/config.json',
  app: './build/server.js'
};

gulp.task('syncModel', 'Synchronize model with database', () => {
  sequelize.sync({ force: true });
});

gulp.task('start-server', 'Start the app server at port 2020', () => {
  server.listen({ path: config.app });
});

gulp.task('build', 'Clen last build and build the application again', ['clean'], () => {
  gulp.src(config.cnfg)
    .pipe(gulp.dest(config.build + '/config'));

  return gulp.src(config.src)
    .pipe(babel())
    .pipe(gulp.dest(config.build));
});

gulp.task('clean', 'Clean the build directory, directory of compile application', () => {
  return del.sync([config.build + '/**/*']);
});

gulp.task('lint', () => {
  return gulp.src(config.src)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('watch-files', 'Watching app files for changes', () => {
  gulp.watch(config.src, ['build', server.restart]);
});

gulp.task('default', ['start-server', 'watch-files']);