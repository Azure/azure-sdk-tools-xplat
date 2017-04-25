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
var util = require('util');
var _ = require('underscore');

var testUtils = require('../../../util/util');
var CLITest = require('../../../framework/arm-cli-test');
var utils = require('../../../../lib/util/utils');
var NetworkTestUtil = require('../../../util/networkTestUtil');
var tagUtils = require('../../../../lib/commands/arm/tag/tagUtils');
var networkUtil = new NetworkTestUtil();

var generatorUtils = require('../../../../lib/util/generatorUtils');
var profile = require('../../../../lib/util/profile');
var $ = utils.getLocaleString;

var testPrefix = 'arm-network-express-route-peering-tests',
  groupName = 'xplat-test-peering',
  location;
var index = 0;

var expressRouteCircuitName;
var expressRouteCircuitId;

var expressRouteCircuitPeerings = {
  peeringType: 'AzurePublicPeering',
  peerAsn: '1',
  peerAsnNew: '2',
  primaryPeerAddressPrefix: '10.0.0.0/30',
  primaryPeerAddressPrefixNew: '11.0.0.0/30',
  secondaryPeerAddressPrefix: '12.0.0.0/30',
  secondaryPeerAddressPrefixNew: '13.0.0.0/30',
  vlanId: '1',
  vlanIdNew: '2',

  init: function() { this.name = this.peeringType; return this; }
}.init();
delete expressRouteCircuitPeerings.init;
expressRouteCircuitPeerings.expressRouteCircuitName = 'expressRouteCircuitName';

var expressRouteCircuit = {
  serviceProviderName: 'Interxion',
  peeringLocation: 'London',
  location: 'brazilsouth',
};

var expressRouteCircuitPeeringsDefault = {
  peerAsn: '1',
  peerAsnNew: '2',
  primaryPeerAddressPrefix: '10.0.0.0/30',
  primaryPeerAddressPrefixNew: '11.0.0.0/30',
  secondaryPeerAddressPrefix: '12.0.0.0/30',
  secondaryPeerAddressPrefixNew: '13.0.0.0/30',
  vlanId: '1',
  vlanIdNew: '2',
  peeringType: 'AzurePrivatePeering',
  expressRouteCircuitName: 'expressRouteCircuitName',
  name: 'AzurePrivatePeering',
  group: groupName
};

var peeringTypeOutOfRange = {
  name: 'Peering',
  peeringType: 'Peering',
  peerAsn: '1',
  vlanId: '1',
  primaryPeerAddressPrefix: '10.0.0.0/30',
  secondaryPeerAddressPrefix: '12.0.0.0/30',
  expressRouteCircuitName: 'expressRouteCircuitName',
  group: groupName
};
var invalidPrimaryPrefix = {
  name: 'AzurePrivatePeering',
  peeringType: 'AzurePrivatePeering',
  peerAsn: '1',
  vlanId: '1',
  primaryPeerAddressPrefix: '1.1.1.1',
  secondaryPeerAddressPrefix: '12.0.0.0/30',
  expressRouteCircuitName: 'expressRouteCircuitName',
  group: groupName
};
var invalidSecondaryPrefix = {
  name: 'AzurePrivatePeering',
  peeringType: 'AzurePrivatePeering',
  peerAsn: '1',
  vlanId: '1',
  primaryPeerAddressPrefix: '10.0.0.0/30',
  secondaryPeerAddressPrefix: '1.1.1.1',
  expressRouteCircuitName: 'expressRouteCircuitName',
  group: groupName
};
var msPeering = {
  name: 'MicrosoftPeering',
  peeringType: 'MicrosoftPeering',
  peerAsn: '120',
  vlanId: '121',
  primaryPeerAddressPrefix: '10.0.0.0/30',
  secondaryPeerAddressPrefix: '11.0.0.0/30',
  advertisedPublicPrefixes: '12.0.0.0/30',
  advertisedPublicPrefixesState: 'Configuring',
  customerAsn: '23',
  routingRegistryName: 'ARIN',
  expressRouteCircuitName: 'expressRouteCircuitName',
  group: groupName
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
        location = expressRouteCircuitPeerings.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        expressRouteCircuitPeerings.location = location;
        expressRouteCircuitPeerings.group = groupName;
        expressRouteCircuitPeerings.name = suite.isMocked ? expressRouteCircuitPeerings.name : suite.generateId(expressRouteCircuitPeerings.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            var cmd = 'network express-route circuit create -g {1} -n expressRouteCircuitName --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location} --json'.formatArgs(expressRouteCircuit, groupName);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              var output = JSON.parse(result.text);
              peeringTypeOutOfRange.expressRouteCircuitId = suite.isMocked ? output.id : suite.generateId(peeringTypeOutOfRange.expressRouteCircuitId, null);
              invalidPrimaryPrefix.expressRouteCircuitId = suite.isMocked ? output.id : suite.generateId(invalidPrimaryPrefix.expressRouteCircuitId, null);
              invalidSecondaryPrefix.expressRouteCircuitId = suite.isMocked ? output.id : suite.generateId(invalidSecondaryPrefix.expressRouteCircuitId, null);
              msPeering.expressRouteCircuitId = suite.isMocked ? output.id : suite.generateId(msPeering.expressRouteCircuitId, null);
              done();
            });
          });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
          peeringTypeOutOfRange.expressRouteCircuitId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'expressRouteCircuits', peeringTypeOutOfRange.expressRouteCircuitName) : suite.generateId(peeringTypeOutOfRange.expressRouteCircuitId, null)
          invalidPrimaryPrefix.expressRouteCircuitId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'expressRouteCircuits', invalidPrimaryPrefix.expressRouteCircuitName) : suite.generateId(invalidPrimaryPrefix.expressRouteCircuitId, null)
          invalidSecondaryPrefix.expressRouteCircuitId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'expressRouteCircuits', invalidSecondaryPrefix.expressRouteCircuitName) : suite.generateId(invalidSecondaryPrefix.expressRouteCircuitId, null)
          msPeering.expressRouteCircuitId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'expressRouteCircuits', msPeering.expressRouteCircuitName) : suite.generateId(msPeering.expressRouteCircuitId, null)
          done();
        }
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

    describe('express route circuit peerings', function () {
      this.timeout(hour);
      it('create should create express route circuit peerings', function (done) {
        var cmd = 'network express-route peering create -g {group} -n {name} --type {peeringType} --peer-asn {peerAsn} --primary-address-prefix {primaryPeerAddressPrefix} --secondary-address-prefix {secondaryPeerAddressPrefix} --vlan-id {vlanId} --circuit-name {expressRouteCircuitName}  --json'.formatArgs(expressRouteCircuitPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuitPeerings.name);
          output.peeringType.toLowerCase().should.equal(expressRouteCircuitPeerings.peeringType.toLowerCase());
          output.peerASN.should.equal(parseInt(expressRouteCircuitPeerings.peerAsn, 10));
          output.primaryPeerAddressPrefix.toLowerCase().should.equal(expressRouteCircuitPeerings.primaryPeerAddressPrefix.toLowerCase());
          output.secondaryPeerAddressPrefix.toLowerCase().should.equal(expressRouteCircuitPeerings.secondaryPeerAddressPrefix.toLowerCase());
          output.vlanId.should.equal(parseInt(expressRouteCircuitPeerings.vlanId, 10));
          done();
        });
      });
      it('show should display express route circuit peerings details', function (done) {
        var cmd = 'network express-route peering show -g {group} -n {name} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(expressRouteCircuitPeerings.name);
          output.peeringType.toLowerCase().should.equal(expressRouteCircuitPeerings.peeringType.toLowerCase());
          output.peerASN.should.equal(parseInt(expressRouteCircuitPeerings.peerAsn, 10));
          output.primaryPeerAddressPrefix.toLowerCase().should.equal(expressRouteCircuitPeerings.primaryPeerAddressPrefix.toLowerCase());
          output.secondaryPeerAddressPrefix.toLowerCase().should.equal(expressRouteCircuitPeerings.secondaryPeerAddressPrefix.toLowerCase());
          output.vlanId.should.equal(parseInt(expressRouteCircuitPeerings.vlanId, 10));
          done();
        });
      });
      it('set should update express route circuit peerings', function (done) {
        var cmd = 'network express-route peering set -g {group} -n {name} --peer-asn {peerAsnNew} --primary-address-prefix {primaryPeerAddressPrefixNew} --secondary-address-prefix {secondaryPeerAddressPrefixNew} --vlan-id {vlanIdNew} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuitPeerings.name);
          output.peerASN.should.equal(parseInt(expressRouteCircuitPeerings.peerAsnNew, 10));
          output.primaryPeerAddressPrefix.toLowerCase().should.equal(expressRouteCircuitPeerings.primaryPeerAddressPrefixNew.toLowerCase());
          output.secondaryPeerAddressPrefix.toLowerCase().should.equal(expressRouteCircuitPeerings.secondaryPeerAddressPrefixNew.toLowerCase());
          output.vlanId.should.equal(parseInt(expressRouteCircuitPeerings.vlanIdNew, 10));
          done();
        });
      });
      it('list should display all express route circuit peerings in resource group', function (done) {
        var cmd = 'network express-route peering list -g {group} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === expressRouteCircuitPeerings.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete express route circuit peerings', function (done) {
        var cmd = 'network express-route peering delete -g {group} -n {name} --quiet --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitPeerings);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network express-route peering show -g {group} -n {name} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitPeerings);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
      it('create with defaults should create express route circuit peerings with default values', function (done) {
        var cmd = 'network express-route peering create -g {group} -n {name} --peer-asn {peerAsn} --primary-address-prefix {primaryPeerAddressPrefix} --secondary-address-prefix {secondaryPeerAddressPrefix} --vlan-id {vlanId} --circuit-name {expressRouteCircuitName}  --json'.formatArgs(expressRouteCircuitPeeringsDefault);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuitPeeringsDefault.name);
          output.peeringType.toLowerCase().should.equal(expressRouteCircuitPeeringsDefault.peeringType.toLowerCase());
          var cmd = 'network express-route peering delete -g {group} -n {name} --quiet --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitPeeringsDefault);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            done();
          });
        });
      });

      it('create should fail for peering type out of range', function (done) {
        var cmd = ('network express-route peering create -g {group} -n {name} --type {peeringType} --peer-asn {peerAsn} --vlan-id {vlanId} --primary-address-prefix {primaryPeerAddressPrefix} --secondary-address-prefix {secondaryPeerAddressPrefix} --circuit-name {expressRouteCircuitName}  --json').formatArgs(peeringTypeOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for invalid primary prefix', function (done) {
        var cmd = ('network express-route peering create -g {group} -n {name} --peer-asn {peerAsn} --vlan-id {vlanId} --primary-address-prefix {primaryPeerAddressPrefix} --secondary-address-prefix {secondaryPeerAddressPrefix} --circuit-name {expressRouteCircuitName}  --json').formatArgs(invalidPrimaryPrefix);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for invalid secondary prefix', function (done) {
        var cmd = ('network express-route peering create -g {group} -n {name} --peer-asn {peerAsn} --vlan-id {vlanId} --primary-address-prefix {primaryPeerAddressPrefix} --secondary-address-prefix {secondaryPeerAddressPrefix} --circuit-name {expressRouteCircuitName}  --json').formatArgs(invalidSecondaryPrefix);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });

      // Commented out because of MS Peering server side issue.
      /*
       it('create should pass for ms peering', function (done) {
       var cmd = ('network express-route peering create -g {group} -n {name} --type {peeringType} --peer-asn {peerAsn} --vlan-id {vlanId} --primary-address-prefix {primaryPeerAddressPrefix} --secondary-address-prefix {secondaryPeerAddressPrefix} --ms-advertised-public-prefixes {advertisedPublicPrefixes} --ms-advertised-public-prefix-state {advertisedPublicPrefixesState} --ms-customer-asn {customerAsn} --ms-routing-registry-name {routingRegistryName} --circuit-name {expressRouteCircuitName}  --json').formatArgs(msPeering);
       testUtils.executeCommand(suite, retry, cmd, function (result) {
       result.exitStatus.should.equal(0);
       var output = JSON.parse(result.text);
       output.name.should.equal(msPeering.name);
       output.peeringType.toLowerCase().should.equal(msPeering.peeringType.toLowerCase());
       output.peerASN.should.equal(parseInt(msPeering.peerAsn, 10));
       output.vlanId.should.equal(parseInt(msPeering.vlanId, 10));
       output.primaryPeerAddressPrefix.toLowerCase().should.equal(msPeering.primaryPeerAddressPrefix.toLowerCase());
       output.secondaryPeerAddressPrefix.toLowerCase().should.equal(msPeering.secondaryPeerAddressPrefix.toLowerCase());
       msPeering.advertisedPublicPrefixes.split(',').forEach(function(item) { output.microsoftPeeringConfig.advertisedPublicPrefixes.should.containEql(item) });
       output.microsoftPeeringConfig.advertisedPublicPrefixesState.toLowerCase().should.equal(msPeering.advertisedPublicPrefixesState.toLowerCase());
       output.microsoftPeeringConfig.customerASN.should.equal(parseInt(msPeering.customerAsn, 10));
       output.microsoftPeeringConfig.routingRegistryName.toLowerCase().should.equal(msPeering.routingRegistryName.toLowerCase());

       done();
       });
       });
       */
    });
  });
});
