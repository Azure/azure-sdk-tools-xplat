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

var testPrefix = 'arm-network-route-table-route-tests',
  groupName = 'xplat-test-route',
  location;
var index = 0;

var routeTableName;
var routeTableId;
var routes = {
  addressPrefix: '10.0.0.0/8',
  addressPrefixNew: '11.0.0.0/8',
  nextHopType: 'VirtualNetworkGateway',
  nextHopTypeNew: 'VnetLocal',
  name: 'routeName'
}
routes.routeTableName = 'routeTableName';


var routeTable = {
  location: 'westus',
};
var invalidPrefixes = {
  addressPrefix: '10.11.12.13/8',
  nextHopType: 'Internet',
  routeTableName: 'routeTableName',
  name: 'invalidPrefixesName',
  group: groupName
};
var nextHopTypeOutOfRange = {
  nextHopType: 'NextHop',
  addressPrefix: '10.0.0.0/16',
  routeTableName: 'routeTableName',
  name: 'nextHopTypeOutOfRangeName',
  group: groupName
};
var updateNextHopTypeFromVirtualApplianceToAny = {
  nextHopType: 'VirtualAppliance',
  nextHopTypeNew: 'VnetLocal',
  addressPrefix: '10.0.0.0/16',
  nextHopIpAddress: '10.0.0.42',
  routeTableName: 'routeTableName',
  name: 'updateNextHopTypeFromVirtualApplianceToAnyName',
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
        location = routes.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        routes.location = location;
        routes.group = groupName;
        routes.name = suite.isMocked ? routes.name : suite.generateId(routes.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
          var cmd = 'network route-table create -g {1} -n routeTableName --location {location} --json'.formatArgs(routeTable, groupName);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            invalidPrefixes.routeTableId = suite.isMocked ? output.id : suite.generateId(invalidPrefixes.routeTableId, null);
            nextHopTypeOutOfRange.routeTableId = suite.isMocked ? output.id : suite.generateId(nextHopTypeOutOfRange.routeTableId, null);
            updateNextHopTypeFromVirtualApplianceToAny.routeTableId = suite.isMocked ? output.id : suite.generateId(updateNextHopTypeFromVirtualApplianceToAny.routeTableId, null);
              done();
            });
        });
        } else {
          var subscriptionId = profile.current.getSubscription().id;
          invalidPrefixes.routeTableId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'routeTables', invalidPrefixes.routeTableName) : suite.generateId(invalidPrefixes.routeTableId, null)
          nextHopTypeOutOfRange.routeTableId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'routeTables', nextHopTypeOutOfRange.routeTableName) : suite.generateId(nextHopTypeOutOfRange.routeTableId, null)
          updateNextHopTypeFromVirtualApplianceToAny.routeTableId = suite.isMocked ? generatorUtils.generateResourceIdCommon(subscriptionId, groupName, 'routeTables', updateNextHopTypeFromVirtualApplianceToAny.routeTableName) : suite.generateId(updateNextHopTypeFromVirtualApplianceToAny.routeTableId, null)
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

    describe('routes', function () {
      this.timeout(hour);
      it('create should create routes', function (done) {
        var cmd = 'network route-table route create -g {group} -n {name} --address-prefix {addressPrefix} --next-hop-type {nextHopType} --route-table-name {routeTableName}  --json'.formatArgs(routes);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
          output.name.should.equal(routes.name);
          output.addressPrefix.toLowerCase().should.equal(routes.addressPrefix.toLowerCase());
          output.nextHopType.toLowerCase().should.equal(routes.nextHopType.toLowerCase());
          done();
        });
      });
      it('show should display routes details', function (done) {
        var cmd = 'network route-table route show -g {group} -n {name} --route-table-name {routeTableName} --json'.formatArgs(routes);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(routes.name);
          output.addressPrefix.toLowerCase().should.equal(routes.addressPrefix.toLowerCase());
          output.nextHopType.toLowerCase().should.equal(routes.nextHopType.toLowerCase());
          done();
        });
      });
      it('set should update routes', function (done) {
        var cmd = 'network route-table route set -g {group} -n {name} --address-prefix {addressPrefixNew} --next-hop-type {nextHopTypeNew} --route-table-name {routeTableName} --json'.formatArgs(routes);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
          output.name.should.equal(routes.name);
          output.addressPrefix.toLowerCase().should.equal(routes.addressPrefixNew.toLowerCase());
          output.nextHopType.toLowerCase().should.equal(routes.nextHopTypeNew.toLowerCase());
          done();
        });
      });
      it('list should display all routes in resource group', function (done) {
        var cmd = 'network route-table route list -g {group} --route-table-name {routeTableName} --json'.formatArgs(routes);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === routes.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete routes', function (done) {
        var cmd = 'network route-table route delete -g {group} -n {name} --quiet --route-table-name {routeTableName} --json'.formatArgs(routes);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network route-table route show -g {group} -n {name} --route-table-name {routeTableName} --json'.formatArgs(routes);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });

      it('create should fail for invalid prefixes', function (done) {
        var cmd = ('network route-table route create -g {group} -n {name} --address-prefix {addressPrefix} --next-hop-type {nextHopType} --route-table-name {routeTableName}  --json').formatArgs(invalidPrefixes);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should fail for next hop type out of range', function (done) {
        var cmd = ('network route-table route create -g {group} -n {name} --next-hop-type {nextHopType} --address-prefix {addressPrefix} --route-table-name {routeTableName}  --json').formatArgs(nextHopTypeOutOfRange);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.not.equal(0);
          done();
        });
      });
      it('create should pass for update next hop type from virtual appliance to any', function (done) {
        var cmd = ('network route-table route create -g {group} -n {name} --next-hop-type {nextHopType} --address-prefix {addressPrefix} --next-hop-ip-address {nextHopIpAddress} --route-table-name {routeTableName}  --json').formatArgs(updateNextHopTypeFromVirtualApplianceToAny);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(updateNextHopTypeFromVirtualApplianceToAny.name);
          output.nextHopType.toLowerCase().should.equal(updateNextHopTypeFromVirtualApplianceToAny.nextHopType.toLowerCase());
          output.addressPrefix.toLowerCase().should.equal(updateNextHopTypeFromVirtualApplianceToAny.addressPrefix.toLowerCase());
          output.nextHopIpAddress.toLowerCase().should.equal(updateNextHopTypeFromVirtualApplianceToAny.nextHopIpAddress.toLowerCase());

          var cmd = ('network route-table route set -g {group} -n {name} --next-hop-type {nextHopTypeNew} --route-table-name {routeTableName}  --json').formatArgs(updateNextHopTypeFromVirtualApplianceToAny);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.name.should.equal(updateNextHopTypeFromVirtualApplianceToAny.name);
          output.nextHopType.toLowerCase().should.equal(updateNextHopTypeFromVirtualApplianceToAny.nextHopTypeNew.toLowerCase());

            var cmd = ('network route-table route delete -g {group} -n {name} --route-table-name {routeTableName} --json --quiet').formatArgs(updateNextHopTypeFromVirtualApplianceToAny);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              done();
            });
          });
        });
      });
    });
  });
});
