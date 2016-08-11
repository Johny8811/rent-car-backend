/**
 * Created by Jan on 25.7.2016.
 */
import path from 'path';
import fs from 'fs';

fs.readdirSync(__dirname).forEach((file) => {
    /* If its the current file ignore it */
  if (file === 'index.js') {
    return;
  } else if (file === 'connections') {
    return;
  }

    /* Store module with its name (from filename) */
  module.exports[path.basename(file, '.js')] = require(path.join(__dirname, file));
});
