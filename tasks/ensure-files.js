/* jshint undef: false, unused: false */

var fs = require('fs');

/**
 * @param {Array<string>} files
 * @param {Function} cb
 */

function ensureFiles(files, cb) {
  var missingFiles = files.reduce(function(prev, filePath) {
    var fileFound = false;

    try {
      fileFound = fs.statSync(filePath).isFile();
    } catch (e) { }

    if (!fileFound) {
      prev.push(filePath + ' Not Found');
    }

    return prev;
  }, []);

	var err;
  if (missingFiles.length) {
    err = new Error('Missing Required Files\n' + missingFiles.join('\n'));
  }

  if (cb) {
    cb(err);
  } else if (err) {
    throw err;
  }
}

module.exports = ensureFiles;
