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
var CLITest = require('../framework/cli-test');

// A common VM used by multiple tests
var vmToUse = {
  Name : null,
  Created : false,
  Delete : false
};

var vmPrefix = 'clitestvm';
var vmNames = [];
var timeout = isForceMocked ? 0 : 0; //30000;

var suite;
var testPrefix = 'cli.vm.create_win_rdp-tests';

var currentRandom = 0;

describe('cli', function () {
  describe('vm', function () {
    var location = process.env.AZURE_VM_TEST_LOCATION || 'West US',
    vmName = 'xplattestvm',
    vmUserName = 'azureuser',
    vmUserPass = 'PassW0rd$',
    vmImgName;

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

    //create a vm with windows image
    describe('Create:', function () {
      it('Windows Vm', function (done) {
        getImageName('Windows', function (ImageName) {
          var cmd = util.format('vm create -r %s %s %s %s %s -l %s --json',
              '3389', vmName, ImageName, vmUserName, vmUserPass, 'someLoc').split(' ');
          cmd[9] = location;
          suite.execute(cmd, function (result) {
            setTimeout(done, timeout);
          });
        });
      });
    });

    //create a vm with connect option
    describe('Create:', function () {
      it('with Connect', function (done) {
        var vmConnect = vmName + '-2';
        var cmd = util.format('vm create -l %s --connect %s %s %s %s --json',
            'someLoc', vmName, vmImgName, vmUserName, vmUserPass).split(' ');
        cmd[3] = location;
        suite.execute(cmd, function (result) {
          result.exitStatus.should.equal(0);
          vmToUse.Name = vmConnect;
          vmToUse.Created = true;
          vmToUse.Delete = true;
          setTimeout(done, timeout);
        });
      });
    });

    // Negative Test Case by specifying VM Name Twice
    describe('Negative test case:', function () {
      it('Specifying Vm Name Twice', function (done) {
        var vmNegName = 'xplattestvm';
        suite.execute('vm create %s %s "azureuser" "Pa$$word@123" --json --location %s',
          vmNegName, vmImgName, location, function (result) {
          result.exitStatus.should.equal(1);
          result.errorText.should.include('A VM with dns prefix "xplattestvm" already exists');
          done();
        });
      });
    });

    // Get name of an image of the given category
    function getImageName(category, callBack) {
      var cmd = util.format('vm image list --json').split(' ');
      suite.execute(cmd, function (result) {
        var imageList = JSON.parse(result.text);
        imageList.some(function (image) {
          if (image.OS.toLowerCase() === category.toLowerCase() && image.Category.toLowerCase() === 'public') {
            vmImgName = image.Name;
          }
        });
        callBack(vmImgName);
      });
    }

    //wait for disk to be released from vm and once released delete disk
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
