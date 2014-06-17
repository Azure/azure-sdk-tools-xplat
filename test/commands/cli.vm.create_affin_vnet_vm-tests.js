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
var timeout = isForceMocked ? 0 : 5000;

var suite;
var testPrefix = 'cli.vm.create_affin_vnet_vm-tests';

var currentRandom = 0;

describe('cli', function () {
  describe('vm', function () {
    var affinityName = 'xplataffintest',
    vmVnetName = 'xplattestvmVnet',
    vnetName = 'xplattestvnet',
    affinLabel = 'xplatAffinGrp',
    affinDesc = 'Test Affinty Group for xplat',
    location = process.env.AZURE_VM_TEST_LOCATION || 'West US',
    availSetName = 'Testset';

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

    //create a vm with vnet, affinity group and availability set
    describe('Create:', function () {
      it('Vm with affinity and vnet and availability', function (done) {
        getImageName('Linux', function (imageName) {
          getVnet('Created', function (virtualnetName, affinityName) {
            var cmd = util.format('vm create -A %s -n %s -a %s -w %s %s %s "azureuser" "Pa$$word@123" --json',
                availSetName, vmVnetName, affinityName, virtualnetName, vmVnetName, imageName).split(' ');
            suite.execute(cmd, function (result) {
              result.exitStatus.should.equal(0);
              vmToUse.Created = true;
              vmToUse.Name = vmVnetName;
              vmToUse.Delete = true;
              done();
            });
          });
        });
      });
    });

    // Get name of an image of the given category
    function getImageName(category, callBack) {
      var cmd = util.format('vm image list --json').split(' ');
      if (getImageName.imageName) {
        callBack(getImageName.imageName);
      } else {
        suite.execute(cmd, function (result) {
          var imageList = JSON.parse(result.text);
          imageList.some(function (image) {
            if (image.OS.toLowerCase() === category.toLowerCase() && image.Category.toLowerCase() === 'public') {
              getImageName.imageName = image.Name;
              return true;
            }
          });

          callBack(getImageName.imageName);
        });
      }
    }

    //get name of a vnet
    function getVnet(status, callback) {
      var cmd;
      if (getVnet.vnetName) {
        callback(getVnet.vnetName, getVnet.affinityName);
      } else {
        cmd = util.format('network vnet list --json').split(' ');
        suite.execute(cmd, function (result) {
          var vnetName = JSON.parse(result.text);
          var found = vnetName.some(function (vnet) {
              if (vnet.State == status) {
                getVnet.vnetName = vnet.Name;
                getVnet.affinityName = vnet.AffinityGroup;
                return true;
              }
            });
          if (!found) {
            getAffinityGroup(location, function (affinGrpName) {
              cmd = util.format('network vnet create %s -a %s --json', vnetName, affinGrpName).split(' ');
              suite.execute(cmd, function (result) {
                getVnet.vnetName = vnetName;
                getVnet.affinityName = affinGrpName;
                callback(getVnet.vnetName, getVnet.affinityName);
              });
            });
          } else {
            callback(getVnet.vnetName, getVnet.affinityName);
          }
        });
      }
    }

    // Get name of an affingroup of the given category
    function getAffinityGroup(location, callBack) {
      var cmd;
      if (getAffinityGroup.affinGrpName) {
        callBack(getAffinityGroup.affinGrpName);
      } else {
        cmd = util.format('account affinity-group list --json').split(' ');
        suite.execute(cmd, function (result) {
          var affinList = JSON.parse(result.text);
          var found = affinList.some(function (affinGrp) {
              if (affinGrp.location == location) {
                getAffinityGroup.affinGrpName = affinGrp.name;
                return true;
              }
            });
          if (!found) {
            cmd = util.format('account affinity-group create -l %s -e %s -d %s %s --json',
                'someloc', affinLabel, affinDesc, affinityName).split(' ');
            cmd[4] = location;
            suite.execute(cmd, function (result) {
              getAffinityGroup.affinGrpName = affinityName;
              callBack(affinityName);
            });
          } else
            callBack(getAffinityGroup.affinGrpName);
        });
      }
    }

    //wait for disk to be released from vm and after release delete the disk
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
