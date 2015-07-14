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
var CLITest = require('../../../framework/arm-cli-test');
var profile = require('../../../../lib/util/profile');
var utils = require('../../../../lib/util/utils');

var testPrefix = 'arm-cli-appserviceplan-tests';

var planname;
var createdPlans = [];
var location = 'West US';
var createdGroups = [];
var createdResources = [];
var subscription = profile.current.getSubscription();
var resourceClient = utils.createResourceClient(subscription);
var hostingPlanName, groupName;

describe('arm', function () {
  var suite;

  before(function (done) {
    suite = new CLITest(this, testPrefix);
    suite.setupSuite(function () {
      planname = suite.generateId('appsvcplanclitest', createdPlans);
      groupName = suite.generateId('testrg1', createdGroups);
     // console.log(">>>>>>>creating group" + groupName);
      if (!suite.isPlayback()) {
        suite.execute('group create %s --location %s --json', groupName, location, function (result) {
          result.exitStatus.should.equal(0);
          done();
        });
      //  console.log(">>>>>>>DONE creating group" + groupName + " at location " + location + " plan name is " + planname);
      } else {
        done();
      }

    });
  });

  after(function (done) {
    suite.teardownSuite(function () {
      if (!suite.isPlayback()) {
        createdGroups.forEach(function (item) {
          suite.execute('group delete %s --quiet --json', item, function (result) {
            result.exitStatus.should.equal(0);
            done();
          })
        });
      } else {
        done();
      }
    });
  });

  beforeEach(function (done) {
    suite.setupTest(done);
  });

  afterEach(function (done) {
    suite.teardownTest(done);
  });

  describe('appserviceplan', function () {

    it('create should work', function (done) {
      suite.execute('appserviceplan create --resourcegroup %s --name %s --location %s --sku Free --numberofworkers 0 --workersize 0 --json', groupName, planname, location, function (result) {
        result.exitStatus.should.equal(0);
        done();
      });
    });

    it('list should work', function (done) {
      suite.execute('appserviceplan list --resourcegroup %s --json', groupName, function (result) {
        result.exitStatus.should.equal(0);
        var output = JSON.parse(result.text);
        output.length.should.be.above(0);
        done();
      });
    });

    it('show should work', function (done) {
      suite.execute('appserviceplan show --resourcegroup %s --name %s --json', groupName, planname, function (result) {
        result.exitStatus.should.equal(0);
        var appserviceplan = JSON.parse(result.text);
        appserviceplan.webHostingPlan.name.should.equal(planname);
        done();
      });
    });

    it('delete should work', function (done) {
      suite.execute('appserviceplan delete --resourcegroup %s --name %s -q --json', groupName, planname, function (result) {
        result.exitStatus.should.equal(0);
        done();
      });
    });
  });
});