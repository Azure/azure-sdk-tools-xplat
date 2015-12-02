/**
 * Copyright (c) Microsoft.  All rights reserved.
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

var should = require('should');
var util = require('util');
var testUtils = require('../util/util');
var CLITest = require('../framework/cli-test');

var suite;
var svcPrefix = 'cliths';
var testPrefix = 'cli.invoke.tests';
var svcNames = [];
var scripts = [];

var requiredEnvironment = [
  { name: 'AZURE_CLOUD_SERVICE_TEST_LOCATION', defaultValue: 'Central US'}
];

describe('cli', function() {
  describe('invoke', function() {
    var svcName, location, timeout, retry = 5;
    var paramFile = './test/data/cli.invoke.tests.json';
    testUtils.TIMEOUT_INTERVAL = 10000;

    before(function(done) {
      suite = new CLITest(this, testPrefix, requiredEnvironment);
      suite.setupSuite(function() {
        svcName = suite.generateId(svcPrefix, svcNames);
        timeout = suite.isPlayback() ? 0 : testUtils.TIMEOUT_INTERVAL;
        location = process.env.AZURE_CLOUD_SERVICE_TEST_LOCATION;
        done();
      });
    });

    after(function(done) {
      suite.teardownSuite(done);
    });

    beforeEach(function(done) {
      suite.setupTest(done);
    });

    afterEach(function(done) {
      suite.teardownTest(done);
    });

    var func = function(script, callback) {
      var cmd = util.format(script).split(' ');
      testUtils.executeCommand(suite, retry, cmd, function(result) {
        result.exitStatus.should.equal(0);
        if (callback) {
          callback();
        }
      });
    };

    var finish = null;
    var test = function(i) {
      if (i >= 0 && i < scripts.length - 1) {
        func(scripts[i], function() {
          test(i + 1);
        });
      }
      else if (i == scripts.length - 1) {
        func(scripts[i], finish);
      }
    };

    describe('hosted-service:', function() {
      it('test hosted-service operations', function(done) {
        scripts = [
          "invoke hosted-service list",
          "invoke hosted-service parameters generate create --parameter-file __param_file__",
          "invoke hosted-service parameters remove hosted-service-create-parameters --parameter-file __param_file__ --service-name",
          "invoke hosted-service parameters remove hosted-service-create-parameters --parameter-file __param_file__ --label --extended-properties",
          "invoke hosted-service parameters remove hosted-service-create-parameters --parameter-file __param_file__",
          "invoke hosted-service parameters add hosted-service-create-parameters --parameter-file __param_file__ --service-name __svc_name__ --label test --description test --location __svc_loc__",
          "invoke hosted-service create --parameter-file __param_file__",
          "invoke hosted-service get --service-name __svc_name__",
          "invoke hosted-service delete --service-name __svc_name__",
          "invoke hosted-service list"
        ];
        
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i]) {
            scripts[i] = scripts[i].replace("__param_file__", paramFile).replace("__svc_name__", svcName).replace("__svc_loc__", location.replace(" ", "&#032;"));
            scripts[i] = "node cli.js " + scripts[i];
          }
        }

        finish = done;
        test(0);
      });
    });

    describe('hosted-service:', function() {
      it('test hosted-service operations using patch', function(done) {
        scripts = [
          "invoke hosted-service list",
          "invoke hosted-service parameters generate create --parameter-file __param_file__",
          //TODO: Patch Methods Not Working in Test Mode
          /*"invoke hosted-service parameters patch --parameter-file __param_file__ --operation replace --path /serviceName --value __svc_name__",
          "invoke hosted-service parameters patch --parameter-file __param_file__ --operation replace --path /label --value __svc_name__",
          "invoke hosted-service parameters patch --parameter-file __param_file__ --operation replace --path /description --value __svc_name__",
          "invoke hosted-service parameters patch --parameter-file __param_file__ --operation replace --path /location --value __svc_loc__",
          "invoke hosted-service parameters patch --parameter-file __param_file__ --operation remove --path /affinityGroup",
          "invoke hosted-service create --parameter-file __param_file__",
          "invoke hosted-service get --service-name __svc_name__",
          "invoke hosted-service delete  --service-name __svc_name__",*/
          "invoke hosted-service list"
        ];
        
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i]) {
            scripts[i] = scripts[i].replace("__param_file__", paramFile).replace("__svc_name__", svcName).replace("__svc_loc__", location.replace(" ", "&#032;"));
            scripts[i] = "node cli.js " + scripts[i];
          }
        }

        finish = done;
        test(0);
      });
    });

  });
});