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

var utils = require('../../../util/utils');
var insightsUtils = require('./insights.utils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;
  var insightLogProfilesCommand = cli.category('insights').category('logprofile')
    .description($('Configure log profiles'))
    .command('add <logProfileName> <storageId> <locations>')
      .description($('Add a new log profile.'))
      .usage('<logProfileName> <storageId> <locations> [options]')
      .option('-n, --name <logProfileName>', $('resource Id.'))
      .option('-a, --storageId <storageId>', $('storage account Id.'))
      .option('-l, --locations <locations>', $('comma separated list of locations of the resources to be included in the log profile.'))
      .option('-b, --serviceBusRuleId <servicesBusRuleId>', $('the authorization rule id of the service bus.'))
      .option('-c, --categories <categories>', $('comma separated list of categories to be included in the captured logs.'))
      .option('-t, --retentionInDays <retentionInDays>', $('the number of days the logs will be kept before being delete.'))
      .option('-s, --subscription <subscription>', $('The subscription identifier.'))
      .execute(function (logProfileName, storageId, locations, options, _) {
        options.logProfileName = options.logProfileName || logProfileName;
        options.storageId = options.storageId || storageId;
        options.locations = options.locations || locations;

        if (!options.logProfileName) {
          return cli.missingArgument('logProfileName');
        }

        if (!options.storageId) {
          return cli.missingArgument('storageId');
        }

        if (options.locations) {
          options.locations = options.locations.split(',');
        } else {
          return cli.missingArgument('locations');
        }

        if (options.categories) {
          options.categories = options.categories.split(',');
        }
        else {
          options.categories = ['Action', 'Delete', 'Write'];
        }

        var client = insightsUtils.createInsightsManagementClient(log, options);

        insightLogProfilesCommand._executeCmd(client, options, _);
      });

  insightLogProfilesCommand._executeCmd = function (client, options, _) {
    var retentionPolicy = {
      enabled: false,
      days: 0
    };

    if (options.retentionInDays) {
      retentionPolicy.enabled = true;
      retentionPolicy.days = parseInt(options.retentionInDays);
    }

    var logProfile = {
      location: '',
      categories: options.categories,
      locations: options.locations,
      retentionPolicy: retentionPolicy,
      serviceBusRuleId: options.serviceBusRuleId,
      storageAccountId: options.storageId
    };

    var result = client.logProfiles.createOrUpdate(options.logProfileName, logProfile, options, _);
    insightsUtils.formatOutput(cli, log, options, result);
  };
};
