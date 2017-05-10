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
'use strict';

var should = require('should');
var path = require('path');
var fs = require('fs');
var util = require('util');
var testUtils = require('../../../util/util');
var CLITest = require('../../../framework/arm-cli-test');
var testprefix = 'arm-cli-vm-create-tests';
var groupPrefix = 'xplatTestGVMCreate';
var availprefix = 'xplatTestaAvail';
var profile = require('../../../../lib/util/profile');
var NetworkTestUtil = require('../../../util/networkTestUtil');
var VMTestUtil = require('../../../util/vmTestUtil');
var requiredEnvironment = [{
  name: 'AZURE_VM_TEST_LOCATION',
  defaultValue: 'southeastasia'
}, {
  name: 'SSHCERT',
  defaultValue: 'test/myCert.pem'
}];

var groupName,
  vmPrefix = 'xplatvm',
  nicName = 'xplattestnic',
  location,
  username = 'azureuser',
  password = 'Brillio@2015',
  storageAccount = 'xplatteststorage1',
  storageCont = 'xplatteststoragecnt1',
  vNetPrefix = 'xplattestvnet',
  subnetName = 'xplattestsubnet',
  publicipName = 'xplattestip',
  dnsPrefix = 'xplattestipdns',
  tags = 'a=b;b=c;d=',
  sshcert,
  IaasDiagPublisher,
  IaasDiagExtName,
  IaasDiagVersion,
  datafile = 'test/data/testdata.json',
  latestLinuxImageUrn = null;

describe('arm', function() {
  describe('compute', function() {
    var suite, retry = 5;
    var networkUtil = new NetworkTestUtil();
    var vmTest = new VMTestUtil();
    before(function(done) {
      suite = new CLITest(this, testprefix, requiredEnvironment);
      suite.setupSuite(function() {
        location = process.env.AZURE_VM_TEST_LOCATION;
        sshcert = process.env.SSHCERT;
        groupName = suite.generateId(groupPrefix, null);
        availprefix = suite.generateId(availprefix, null);
        vmPrefix = suite.isMocked ? vmPrefix : suite.generateId(vmPrefix, null);
        nicName = suite.isMocked ? nicName : suite.generateId(nicName, null);
        storageAccount = suite.generateId(storageAccount, null);
        storageCont = suite.generateId(storageCont, null);
        vNetPrefix = suite.isMocked ? vNetPrefix : suite.generateId(vNetPrefix, null);
        subnetName = suite.isMocked ? subnetName : suite.generateId(subnetName, null);
        publicipName = suite.isMocked ? publicipName : suite.generateId(publicipName, null);
        dnsPrefix = suite.generateId(dnsPrefix, null);
        tags = 'a=b;b=c;d=';

        // Get real values from test/data/testdata.json file and assign to the local variables
        var data = fs.readFileSync(datafile, 'utf8');
        var variables = JSON.parse(data);
        IaasDiagPublisher = variables.IaasDiagPublisher_Linux.value;
        IaasDiagExtName = variables.IaasDiagExtName_Linux.value;
        IaasDiagVersion = variables.IaasDiagVersion_Linux.value;
        done();
      });
    });
    after(function(done) {
      this.timeout(vmTest.timeoutLarge * 10);
      vmTest.deleteUsedGroup(groupName, suite, function(result) {
        suite.teardownSuite(done);
      });
    });
    beforeEach(function(done) {
      suite.setupTest(done);
    });
    afterEach(function(done) {
      suite.teardownTest(done);
    });
    describe('vm', function() {

      it('create should pass', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        vmTest.checkImagefile(function() {
          vmTest.createGroup(groupName, location, suite, function(result) {
			//var cmd = makeCommandStr('availability-set', 'set', paramFileName, '--parse --platform-update-domain-count 3 --platform-fault-domain-count 2 --managed true').split(' ')
			//testUtils.executeCommand(suite, retry, cmd, function(result) {
            //  result.exitStatus.should.equal(0);
              networkUtil.createVnet(groupName, vNetPrefix, location, '10.0.0.0/16', suite, function () {
                networkUtil.createSubnet(groupName, vNetPrefix, subnetName, '10.0.0.0/24', suite, function () {
                  var subscription = profile.current.getSubscription();
                  var subnetId = '/subscriptions/' + subscription.id + '/resourceGroups/' + groupName +
                    '/providers/Microsoft.Network/VirtualNetworks/' + vNetPrefix + '/subnets/' + subnetName;
                  if (VMTestUtil.linuxImageUrn === '' || VMTestUtil.linuxImageUrn === undefined) {
                    vmTest.GetLinuxSkusList(location, suite, function (result) {
                      vmTest.GetLinuxImageList(location, suite, function (result) {
                        latestLinuxImageUrn = VMTestUtil.linuxImageUrn.substring(0, VMTestUtil.linuxImageUrn.lastIndexOf(':')) + ':latest';
                        var cmd = util.format('vm create %s %s %s Linux -f %s -Q %s -u %s -p %s -z Standard_D1 -S %s -i %s -w %s -M %s --tags %s --json',
                          groupName, vmPrefix, location, nicName, latestLinuxImageUrn, username, password,
                          subnetId, publicipName, dnsPrefix, sshcert, tags).split(' ');
                        testUtils.executeCommand(suite, retry, cmd, function (result) {
                          result.exitStatus.should.equal(0);
                          done();
                        });
                      });
                    });
                  } else {
                    latestLinuxImageUrn = VMTestUtil.linuxImageUrn.substring(0, VMTestUtil.linuxImageUrn.lastIndexOf(':')) + ':latest';
                    var cmd = util.format('vm create %s %s %s Linux -f %s -Q %s -u %s -p %s -z Standard_D1 -S %s -i %s -w %s -M %s --tags %s --json',
                          groupName, vmPrefix, location, nicName, latestLinuxImageUrn, username, password,
                          subnetId, publicipName, dnsPrefix, sshcert, tags).split(' ');
                    testUtils.executeCommand(suite, retry, cmd, function (result) {
                      result.exitStatus.should.equal(0);
                      done();
                    });
                  }
                });
              });
            });
          });
        });
      
      it('stop should pass', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm stop %s %s --json', groupName, vmPrefix).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
      });
      });
	  
      it('list should display all VMs in resource group', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm list %s --json', groupName).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
          var allResources = JSON.parse(result.text);
          allResources.some(function(res) {
            return res.name === vmPrefix;
          }).should.be.true;
          allResources.some(function(res) {
            return res.resourceGroupName === groupName;
          }).should.be.true;
          done();
        });
      });

      it('list all should display all VMs in subscription', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm list %s --json', '').split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
          var allResources = JSON.parse(result.text);
          allResources.some(function(res) {
            return res.name === vmPrefix;
          }).should.be.true;
          done();
        });
      });

      it('list-ip-address should display all VMs and corresponding public IP address in subscription', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm list-ip-address %s --json', '').split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
          var allResources = JSON.parse(result.text);
          allResources.some(function(res) {
            if(res && res.networkProfile && res.networkProfile.networkInterfaces[0]
              && res.networkProfile.networkInterfaces[0].expanded
              && res.networkProfile.networkInterfaces[0].expanded.ipConfigurations[0].publicIPAddress) {
              var vmPublicIpName = res.networkProfile.networkInterfaces[0].expanded.ipConfigurations[0].publicIPAddress.expanded.name;
              return vmPublicIpName.indexOf(publicipName) !== -1;
            } else {
              return false;
            }
          }).should.be.true;
          done();
        });
      });

      it('show should display details about VM', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm show %s %s --json', groupName, vmPrefix).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
          var allResources = JSON.parse(result.text);
          allResources.name.should.equal(vmPrefix);
          allResources.availabilitySet.id.toLowerCase().should.containEql(availprefix.toLowerCase());
          var cmd = util.format('vm show %s %s', groupName, vmPrefix).split(' ');
          testUtils.executeCommand(suite, retry, cmd, function(result) {
            result.exitStatus.should.equal(0);
            result.text.should.containEql(dnsPrefix + '.' + location.toLowerCase() + '.cloudapp.azure.com');
            var cmd = util.format('availset show %s %s --json', groupName, availprefix).split(' ');
            testUtils.executeCommand(suite, retry, cmd, function(result) {
              result.exitStatus.should.equal(0);
              var avSetResult = JSON.parse(result.text);
              avSetResult.name.should.equal(availprefix);
              avSetResult.virtualMachines.some(function(res) {
                return (res.id.toLowerCase()).indexOf(vmPrefix) !== -1;
              }).should.be.true;
              done();
            });
          });
        });
      });

      it('get-instance-view should get instance view of the VM', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm get-instance-view %s %s --json', groupName, vmPrefix).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          should(result.text.indexOf('diagnosticsProfile') > -1).ok;
          should(result.text.indexOf('bootDiagnostics') > -1).ok;
          var storageUriStr = util.format('\"storageUri\": \"https://%s.blob.core.windows.net/\"', storageAccount);
          should(result.text.indexOf(storageUriStr) > -1).ok;
          result.exitStatus.should.equal(0);
          done();
        });
      });

      it('get-serial-output should get serial output of the VM', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm get-serial-output %s %s', groupName, vmPrefix).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          should(result.text.indexOf('bootdiagnostics') > -1 || result.text.indexOf('bootDiagnostics') > -1).ok;
          should(result.text.indexOf('serialconsole.log') > -1).ok;
          result.exitStatus.should.equal(0);
          done();
        });
      });
    
      it('set should be able to update the VM size', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        vmTest.getVMSize(location, suite, function() {
          var cmd = util.format('vm set -z %s %s --json', 'Standard_D2', groupName, vmPrefix).split(' ');
          testUtils.executeCommand(suite, retry, cmd, function(result) {
            result.exitStatus.should.equal(0);
            done();
          });
        });
      });

      it('delete should delete VM 1', function(done) {
        this.timeout(vmTest.timeoutLarge * 10);
        var cmd = util.format('vm delete %s %s --quiet --json', groupName, vmPrefix).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
        });
      });
	});
	
	function deleteUsedGroup(callback) {
      if (!suite.isPlayback()) {
        var cmd = util.format('group delete %s --quiet --json', groupName).split(' ');
        testUtils.executeCommand(suite, retry, cmd, function(result) {
          result.exitStatus.should.equal(0);
          callback();
        });
      } else callback();
    }
	});
});