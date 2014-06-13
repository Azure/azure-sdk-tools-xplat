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
var sinon = require('sinon');
var util = require('util');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var retry = 25;

var isForceMocked = !process.env.NOCK_OFF;

var utils = require('../../lib/util/utils');
var testUtils = require('../util/util');
var CLITest = require('../framework/cli-test');
var communityImageId = isForceMocked ? 'vmdepot-1-1-1' : process.env['AZURE_COMMUNITY_IMAGE_ID'];

// A common VM used by multiple tests
var vmToUse = {
  Name : null,
  Created : false,
  Delete : false
};

var vmPrefix = 'clitestvm';
var vmNames = [];

var suite;
var testPrefix = 'cli.vm.create_custom_comm-tests';
var currentRandom = 0;

describe('cli', function () {
  describe('vm', function () {
    var location = process.env.AZURE_VM_TEST_LOCATION || 'West US',
    customVmName = 'xplattestvmcustomdata';
    var fileName = 'customdata',
    certFile = process.env['SSHCERT'] || 'test/data/fakeSshcert.pem',
    vmsize = 'small',
    sshPort = '223';

    before(function (done) {
      suite = new CLITest(testPrefix, isForceMocked);

      if (suite.isMocked) {
        sinon.stub(crypto, 'randomBytes', function () {
          return (++currentRandom).toString();
        });

        utils.POLL_REQUEST_INTERVAL = 0;
      }

      suite.setupSuite(done);
    });

    after(function (done) {
      if (suite.isMocked) {
        crypto.randomBytes.restore();
      }
      suite.teardownSuite(done);
    });

    beforeEach(function (done) {
      suite.setupTest(done);
    });

    afterEach(function (done) {
      function deleteUsedVM(vm, callback) {
        if (vm.Created && vm.Delete && !isForceMocked) {
          var cmd = util.format('vm show %s --json', vm.Name).split(' ');
          suite.execute(cmd, function (result) {
            var vmObj = JSON.parse(result.text);
            var BlobDiskName = vmObj.OSDisk.DiskName;
            cmd = util.format('vm delete %s -q --json', vm.Name).split(' ');
            suite.execute(cmd, function (result) {
              vm.Name = null;
              vm.Created = vm.Delete = false;
              deleteDisk(BlobDiskName, callback);
            });
          });
        } else {
          callback();
        }
      }

      deleteUsedVM(vmToUse, function () {
        suite.teardownTest(done);
      });
    });

    //Create vm with custom data
    describe('Create:', function () {
      it('with custom data and community image', function (done) {
        generateFile(fileName, null, 'nodejs,python,wordpress');
        var cmd = util.format('vm create -o -e %s -z %s --ssh-cert %s --no-ssh-password %s %s testuser -l %s -d %s --json --verbose',
            sshPort, vmsize, certFile, customVmName, communityImageId, "some_loc", fileName).split(' ');
        cmd[14] = location;
        suite.execute(cmd, function (result) {
          var verboseString = result.text;
          var iPosCustom = verboseString.indexOf('CustomData:');
          iPosCustom.should.equal(-1);
          fs.unlinkSync(fileName);
          vmToUse.Name = customVmName;
          vmToUse.Created = true;
          vmToUse.Delete = true;
          done();
        });
      });
    });

    //create a file and write desired data given as input
    function generateFile(filename, fileSizeinBytes, data) {
      if (fileSizeinBytes)
        data = testUtils.generateRandomString(fileSizeinBytes);
      fs.writeFileSync(filename, data);
    }

    //wait for disk to be released from vm and once released delete vm
    function deleteDisk(diskName, callback) {
      var diskObj;
      var cmd = util.format('vm disk show %s --json', diskName).split(' ');
      suite.execute(cmd, function (result) {
        diskObj = JSON.parse(result.text);
        if (diskObj.AttachedTo && diskObj.AttachedTo.DeploymentName && retry != 0) {
          setTimeout(function () {
            retry--;
            deleteDisk(diskName, callback);
          }, 10000);
        } else {
          cmd = util.format('vm disk delete %s -b --json', diskName).split(' ');
          suite.execute(cmd, function (result) {
            callback();
          });
        }
      });
    }
  });
});
