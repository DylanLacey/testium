/*
Copyright (c) 2013, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var cache$, copy, downloadFile, fs, move;
  fs = require('fs');
  cache$ = require('fs.extra');
  copy = cache$.copy;
  move = cache$.move;
  downloadFile = require('./download');
  module.exports = function (binPath, tempPath, version) {
    return function (callback) {
      var binFilePath, file, tempFilePath, url;
      url = 'http://selenium.googlecode.com/files/selenium-server-standalone-' + version + '.jar';
      file = 'selenium.jar';
      binFilePath = '' + binPath + '/' + file;
      if (fs.existsSync(binFilePath))
        return callback();
      console.log('[testium] grabbing selenium standalone server ' + version);
      tempFilePath = '' + tempPath + '/selenium_' + version + '.jar';
      if (fs.existsSync(tempFilePath)) {
        return copy(tempFilePath, binFilePath, callback);
      } else {
        return downloadFile(url, tempFilePath, function (error) {
          if (null != error)
            return callback(error);
          return copy(tempFilePath, binFilePath, callback);
        });
      }
    };
  };
}.call(this);
