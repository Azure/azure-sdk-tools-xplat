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

var __ = require('underscore');

var utils = require('../../util/utils');
var $ = utils.getLocaleString;

function StorageClient(cli, subscription) {
  this.cli = cli;
  this.subscription = subscription;

  this.serviceManagementService = this.createServiceManagementService();
}

__.extend(StorageClient.prototype, {
  getStorageAccountKeys: function (name, _) {
    var self = this;

    var progress = self.cli.progress($('Getting storage account keys'));
    try {
      var response = utils.doServiceManagementOperation(self.serviceManagementService, 'getStorageAccountKeys', name, _);
      return response.body.StorageServiceKeys;
    } finally {
      progress.end();
    }
  },

  createServiceManagementService: function() {
    var self = this;
    var account = self.cli.category('account');
    var subscriptionId = account.lookupSubscriptionId(self.subscription);
    return utils.createServiceManagementService(subscriptionId, account, self.cli.output);
  }
});

module.exports = StorageClient;