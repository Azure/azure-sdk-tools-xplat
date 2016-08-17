﻿/**
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
var util = require('util');
var _ = require('underscore');

var testUtils = require('../../../util/util');
var CLITest = require('../../../framework/arm-cli-test');
var utils = require('../../../../lib/util/utils');
var NetworkTestUtil = require('../../../util/networkTestUtil');
var tagUtils = require('../../../../lib/commands/arm/tag/tagUtils');
var networkUtil = new NetworkTestUtil();

var testPrefix = 'arm-network-virtualnetworkpeerings-tests',
  groupName = 'xplat-test-virtual-network-peerings',
  location;

var virtualNetworkPeerings = {
  allowForwardedTraffic: 'true',
  allowForwardedTrafficNew: 'true',
  allowGatewayTransit: 'true',
  allowGatewayTransitNew: 'true',
  allowVirtualNetworkAccess: 'true',
  allowVirtualNetworkAccessNew: 'true',
  name: 'virtualNetworkPeeringsName'
};

var requiredEnvironment = [{
  name: 'AZURE_VM_TEST_LOCATION',
  defaultValue: 'westus'
}];

describe('arm', function () {
  describe('network', function () {
    var suite, retry = 5;
    var hour = 60 * 60000;

    before(function (done) {
      suite = new CLITest(this, testPrefix, requiredEnvironment);
      suite.setupSuite(function () {
        location = virtualNetworkPeerings.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        virtualNetworkPeerings.location = location;
        virtualNetworkPeerings.group = groupName;
        virtualNetworkPeerings.name = suite.isMocked ? virtualNetworkPeerings.name : suite.generateId(virtualNetworkPeerings.name, null);
        done();
      });
    });
    after(function (done) {
      this.timeout(hour);
      networkUtil.deleteGroup(groupName, suite, function () {
        suite.teardownSuite(done);
      });
    });
    beforeEach(function (done) {
      suite.setupTest(done);
    });
    afterEach(function (done) {
      suite.teardownTest(done);
    });

    describe('virtual network peering', function () {
      this.timeout(hour);
      it('create should create virtual network peering', function (done) {
        networkUtil.createGroup(groupName, location, suite, function () {

          var cmd = util.format('network vnet create -g {group} -n virtualNetworkName1 --location westus ' +
            '--json').formatArgs(virtualNetworkPeerings);
          testUtils.executeCommand(suite, retry, cmd, function (virtualNetwork) {
            virtualNetwork.exitStatus.should.equal(0);
            virtualNetwork = JSON.parse(virtualNetwork.text);
            var cmd = util.format('network vnet create -g {group} -n virtualNetworkPeeringName2 --location westus ' +
              '--address-prefixes 11.0.0.0/8 --json').formatArgs(virtualNetworkPeerings);
            testUtils.executeCommand(suite, retry, cmd, function (remoteVnet) {
              remoteVnet.exitStatus.should.equal(0);
              remoteVnet = JSON.parse(remoteVnet.text);
              virtualNetworkPeerings.peeringId = remoteVnet.id;
              var cmd = util.format('network vnet peering create -g {group} -n {name} --allow-forwarded-traffic {allowForwardedTraffic} ' +
                '--allow-gateway-transit {allowGatewayTransit} --allow-vnet-access {allowVirtualNetworkAccess}  ' +
                '--vnet-name virtualNetworkName1 --remote-vnet-id {peeringId} --json').formatArgs(virtualNetworkPeerings);
              testUtils.executeCommand(suite, retry, cmd, function (result) {
                result.exitStatus.should.equal(0);
                var output = JSON.parse(result.text);
                output.name.should.equal(virtualNetworkPeerings.name);
                output.allowForwardedTraffic.should.equal(utils.parseBool(virtualNetworkPeerings.allowForwardedTraffic));
                output.allowGatewayTransit.should.equal(utils.parseBool(virtualNetworkPeerings.allowGatewayTransit));
                output.allowVirtualNetworkAccess.should.equal(utils.parseBool(virtualNetworkPeerings.allowVirtualNetworkAccess));
                done();
              });
            });
          });
        });
      });

      it('show should display virtual network peering details', function (done) {
        var cmd = 'network vnet peering show -g {group} -n {name}  --vnet-name virtualNetworkName1 --json'.formatArgs(virtualNetworkPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(virtualNetworkPeerings.name);
            output.allowForwardedTraffic.should.equal(utils.parseBool(virtualNetworkPeerings.allowForwardedTraffic));
            output.allowGatewayTransit.should.equal(utils.parseBool(virtualNetworkPeerings.allowGatewayTransit));
            output.allowVirtualNetworkAccess.should.equal(utils.parseBool(virtualNetworkPeerings.allowVirtualNetworkAccess));

          done();
        });
      });

      it('set should update virtual network peering', function (done) {
        var cmd = util.format('network vnet peering set -g {group} -n {name} --allow-forwarded-traffic {allowForwardedTrafficNew} ' +
          '--allow-gateway-transit {allowGatewayTransitNew} --allow-vnet-access {allowVirtualNetworkAccessNew} ' +
          '--vnet-name virtualNetworkName1 --json').formatArgs(virtualNetworkPeerings);
        networkUtil.createGroup(groupName, location, suite, function () {
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.name.should.equal(virtualNetworkPeerings.name);
            output.allowForwardedTraffic.should.equal(utils.parseBool(virtualNetworkPeerings.allowForwardedTrafficNew));
            output.allowGatewayTransit.should.equal(utils.parseBool(virtualNetworkPeerings.allowGatewayTransitNew));
            output.allowVirtualNetworkAccess.should.equal(utils.parseBool(virtualNetworkPeerings.allowVirtualNetworkAccessNew));

            done();
          });
        });
      });

      it('list should display all virtual network peering in resource group', function (done) {
        var cmd = 'network vnet peering list -g {group}  --vnet-name virtualNetworkName1 --json'.formatArgs(virtualNetworkPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === virtualNetworkPeerings.name;
          }).should.be.true;
          done();
        });
      });

      it('delete should delete virtual network peering', function (done) {
        var cmd = 'network vnet peering delete -g {group} -n {name} --quiet  --vnet-name virtualNetworkName1 --json'.formatArgs(virtualNetworkPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network vnet peering show -g {group} -n {name}  --vnet-name virtualNetworkName1 --json'.formatArgs(virtualNetworkPeerings);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
    });
  });
});
