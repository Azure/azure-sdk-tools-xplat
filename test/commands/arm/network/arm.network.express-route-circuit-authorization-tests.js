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

var testPrefix = 'arm-network-express-route-authorization-tests',
  groupName = 'xplat-test-authorization',
  location;
var index = 0;

var expressRouteCircuitName;
var expressRouteCircuitId;

var expressRouteCircuitAuthorizations = {
  name: 'expressRouteCircuitAuthorizationName'
};
expressRouteCircuitAuthorizations.expressRouteCircuitName = 'expressRouteCircuitName';

var expressRouteCircuit = {
  serviceProviderName: 'Interxion',
  peeringLocation: 'London',
  location: 'brazilsouth'
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
        location = expressRouteCircuitAuthorizations.location || process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);
        expressRouteCircuitAuthorizations.location = location;
        expressRouteCircuitAuthorizations.group = groupName;
        expressRouteCircuitAuthorizations.name = suite.isMocked ? expressRouteCircuitAuthorizations.name : suite.generateId(expressRouteCircuitAuthorizations.name, null);
        if(!suite.isPlayback()) {
          networkUtil.createGroup(groupName, location, suite, function () {
            var cmd = 'network express-route circuit create -g {1} -n expressRouteCircuitName --service-provider-name {serviceProviderName} --peering-location {peeringLocation} --location {location} --json'.formatArgs(expressRouteCircuit, groupName);
            testUtils.executeCommand(suite, retry, cmd, function (result) {
              result.exitStatus.should.equal(0);
              var output = JSON.parse(result.text);
              done();
            });
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

    describe('express route circuit authorizations', function () {
      this.timeout(hour);
      it('create should create express route circuit authorizations', function (done) {
        var cmd = 'network express-route authorization create -g {group} -n {name}  --circuit-name {expressRouteCircuitName}  --json'.formatArgs(expressRouteCircuitAuthorizations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuitAuthorizations.name);

          done();
        });
      });
      it('show should display express route circuit authorizations details', function (done) {
        var cmd = 'network express-route authorization show -g {group} -n {name} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitAuthorizations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.name.should.equal(expressRouteCircuitAuthorizations.name);

          done();
        });
      });
      it('set should update express route circuit authorizations', function (done) {
        var cmd = 'network express-route authorization set -g {group} -n {name}  --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitAuthorizations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);
          output.name.should.equal(expressRouteCircuitAuthorizations.name);

          done();
        });
      });
      it('list should display all express route circuit authorizations in resource group', function (done) {
        var cmd = 'network express-route authorization list -g {group} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitAuthorizations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var outputs = JSON.parse(result.text);
          _.some(outputs, function (output) {
            return output.name === expressRouteCircuitAuthorizations.name;
          }).should.be.true;
          done();
        });
      });
      it('delete should delete express route circuit authorizations', function (done) {
        var cmd = 'network express-route authorization delete -g {group} -n {name} --quiet --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitAuthorizations);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          cmd = 'network express-route authorization show -g {group} -n {name} --circuit-name {expressRouteCircuitName} --json'.formatArgs(expressRouteCircuitAuthorizations);
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
