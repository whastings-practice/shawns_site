var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

require('dotenv').load();

var NODE_ENV = process.env.NODE_ENV,
    PATHS = {
      src: ['./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json']
    };

gulp.task('serve', function() {
  if (NODE_ENV === 'production') {
    require('./keystone.js');
  } else {
    nodemon({
      script: 'keystone.js'
    });
  }
});
