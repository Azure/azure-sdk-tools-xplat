/**
* Copyright 2012 Microsoft Corporation
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

require('should');
var sinon = require('sinon');
var fs = require('fs');

var executeCmd = require('../framework/cli-executor').execute;

describe('cli', function(){
  describe('account', function() {
    describe('import', function() {
      beforeEach(function (done) {
        sinon.stub(fs, 'writeFileSync', function () {});
        done();
      });

      afterEach(function (done) {
        fs.writeFileSync.restore();
        done();
      });

      it('should not import invalid certificate', function(done) {
        var cmd = 'node cli.js account import ./test/data/account-credentials.publishsettings'.split(' ');
        executeCmd(cmd, function (result) {
          result.errorText.should.match(/The server failed to authenticate the request. Verify that the certificate is valid and is associated with this subscription/);
          result.exitStatus.should.equal(1);
          done();
        });
      });
    });
  });
});