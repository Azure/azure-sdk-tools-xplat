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

var generatorUtils = require('../../../../lib/util/generatorUtils');
var profile = require('../../../../lib/util/profile');
var $ = utils.getLocaleString;

var testPrefix = 'arm-network-express-route-circuit-tests',
  groupName = 'xplat-test-circuit',
  location;
var index = 0;

var expressRouteCircuitName;
var expressRouteCircuitId;

var expressRouteCircuits = {
  skutier: 'Standard',
  skutierNew: 'Premium',
  skufamily: 'MeteredData',
  skufamilyNew: 'UnlimitedData',
  serviceProviderName: 'Interxion',
  peeringLocation: 'London',
  bandwidthInMbps: '100',
  bandwidthInMbpsNew: '200',
  location: 'brazilsouth',
  name: 'expressRouteCircuitName'
};


var expressRouteCircuitsDefault = {
  serviceProviderName: 'Interxion',
  peeringLocation: 'London',
  location: 'brazilsouth',
  skuTier: 'Standard',
  skuFamily: 'MeteredData',
  bandwidthInMbps: '100',
  name: 'expressRouteCircuitsDefaultName',
  group: groupName
};

var skuTierOutOfRange = {
  skutier: 'NonStandard',
  serviceProviderName: 'Equinix',
  peeringLocation: 'Seattle',
  location: 'westus',
  name: 'skuTierOutOfRangeName',
  group: groupName
};
var skuFamilyOutOfRange = {
  skufamily: 'AnyData',
  serviceProviderName: 'Equinix',
  peeringLocation: 'Seattle',
  location: 'westus',
  name: 'skuFamilyOutOfRangeName',
  group: groupName
};
var invalidBandwidth = {
  bandwidthInMbps: '42',
  serviceProviderName: 'Equinix',
  peeringLocation: 'Seattle',
  location: 'westus',
  name: 'invalidBandwidthName',
  group: groupName
};
var invalidServiceProvider = {
  serviceProviderName: 'FakeProvider',
  peeringLocation: 'Seattle',
  location: 'westus',
  name: 'invalidServiceProviderName',
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
        location = expressRouteCircuits.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        expressRouteCircuits.location = location;
        expressRouteCircuits.group = groupName;
        expressRouteCircuits.name = suite.isMocked ? expressRouteCircuits.name : suite.generateId(expressRouteCircuits.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            done();
          });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
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

    describe('express route circuits', function () {
      this.timeout(hour);
      it('create should create express route circuits', function (done) {
        var cmd = 'network express-route circuit create -g {group} -n {name} --sku-tier {skutier} --sku-family {skufamily} --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --bandwidth-in-mbps {bandwidthInMbps} --location {location}  --json'.formatArgs(expressRouteCircuits);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuits.name);
          output.sku.tier.toLowerCase().should.equal(expressRouteCircuits.skutier.toLowerCase());
          output.sku.family.toLowerCase().should.equal(expressRouteCircuits.skufamily.toLowerCase());
          output.serviceProviderProperties.serviceProviderName.toLowerCase().should.equal(expressRouteCircuits.serviceProviderName.toLowerCase());
          output.serviceProviderProperties.peeringLocation.toLowerCase().should.equal(expressRouteCircuits.peeringLocation.toLowerCase());
          output.serviceProviderProperties.bandwidthInMbps.should.equal(parseInt(expressRouteCircuits.bandwidthInMbps, 10));
          done();
        });
      });
      it('show should display express route circuits details', function (done) {
        var cmd = 'network express-route circuit show -g {group} -n {name} --json'.formatArgs(expressRouteCircuits);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(expressRouteCircuits.name);
          output.sku.tier.toLowerCase().should.equal(expressRouteCircuits.skutier.toLowerCase());
          output.sku.family.toLowerCase().should.equal(expressRouteCircuits.skufamily.toLowerCase());
          output.serviceProviderProperties.serviceProviderName.toLowerCase().should.equal(expressRouteCircuits.serviceProviderName.toLowerCase());
          output.serviceProviderProperties.peeringLocation.toLowerCase().should.equal(expressRouteCircuits.peeringLocation.toLowerCase());
          output.serviceProviderProperties.bandwidthInMbps.should.equal(parseInt(expressRouteCircuits.bandwidthInMbps, 10));
          done();
        });
      });
      it('set should update express route circuits', function (done) {
        var cmd = 'network express-route circuit set -g {group} -n {name} --sku-tier {skutierNew} --sku-family {skufamilyNew} --bandwidth-in-mbps {bandwidthInMbpsNew} --json'.formatArgs(expressRouteCircuits);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuits.name);
          output.sku.tier.toLowerCase().should.equal(expressRouteCircuits.skutierNew.toLowerCase());
          output.sku.family.toLowerCase().should.equal(expressRouteCircuits.skufamilyNew.toLowerCase());
          output.serviceProviderProperties.bandwidthInMbps.should.equal(parseInt(expressRouteCircuits.bandwidthInMbpsNew, 10));
          done();
        });
      });
      it('list should display all express route circuits in resource group', function (done) {
        var cmd = 'network express-route circuit list -g {group} --json'.formatArgs(expressRouteCircuits);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === expressRouteCircuits.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete express route circuits', function (done) {
        var cmd = 'network express-route circuit delete -g {group} -n {name} --quiet --json'.formatArgs(expressRouteCircuits);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network express-route circuit show -g {group} -n {name} --json'.formatArgs(expressRouteCircuits);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
      it('create with defaults should create express route circuits with default values', function (done) {
        var cmd = 'network express-route circuit create -g {group} -n {name} --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location}  --json'.formatArgs(expressRouteCircuitsDefault);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuitsDefault.name);
          output.sku.tier.toLowerCase().should.equal(expressRouteCircuitsDefault.skuTier.toLowerCase());;
          output.sku.family.toLowerCase().should.equal(expressRouteCircuitsDefault.skuFamily.toLowerCase());;
          output.serviceProviderProperties.bandwidthInMbps.should.equal(parseInt(expressRouteCircuitsDefault.bandwidthInMbps, 10));
          var cmd = 'network express-route circuit delete -g {group} -n {name} --quiet --json'.formatArgs(expressRouteCircuitsDefault);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            done();
          });
        });
      });

      it('create should fail for sku tier out of range', function (done) {
        var cmd = ('network express-route circuit create -g {group} -n {name} --sku-tier {skutier} --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location}  --json').formatArgs(skuTierOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for sku family out of range', function (done) {
        var cmd = ('network express-route circuit create -g {group} -n {name} --sku-family {skufamily} --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location}  --json').formatArgs(skuFamilyOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for invalid bandwidth', function (done) {
        var cmd = ('network express-route circuit create -g {group} -n {name} --bandwidth-in-mbps {bandwidthInMbps} --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location}  --json').formatArgs(invalidBandwidth);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for invalid service provider', function (done) {
        var cmd = ('network express-route circuit create -g {group} -n {name} --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location}  --json').formatArgs(invalidServiceProvider);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
    });
  });
});
