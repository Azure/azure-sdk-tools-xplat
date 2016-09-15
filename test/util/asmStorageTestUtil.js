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
var util = require('util');
var testUtils = require('../util/util');
exports = module.exports = asmStorageTestUtil;
var retry = 5;

/**
 * @class
 * Initializes a new instance of the asmStorageTestUtil class.
 * @constructor
 *
 * Example use of this class:
 *
 * //creates test class
 * var storageUtil = new asmStorageTestUtil();
 */

function asmStorageTestUtil() {
  this.timeout = 3000000;
}

asmStorageTestUtil.prototype.createStorageAccount = function(storageObject, timeout, suite, callback) {
  var cmd = util.format('storage account create %s --type LRS --location "%s" --json', storageObject.name, storageObject.location);
  testUtils.executeCommand(suite, retry, cmd, function(result) {
    result.exitStatus.should.equal(0);
    var cmd = util.format('storage account keys list %s --json', storageObject.name);
    testUtils.executeCommand(suite, retry, cmd, function(result) {
      var account = JSON.parse(result.text);
      storageObject.key = account.secondaryKey;
      callback();
    });
  });
};

asmStorageTestUtil.prototype.removeStorageAccount = function(storageAccountPrefix, timeout, suite, callback) {
  var cmd = util.format('storage account delete %s --quiet --json', storageAccountPrefix);
  testUtils.executeCommand(suite, retry, cmd, function(result) {
    result.exitStatus.should.equal(0);
    callback();
  });
};