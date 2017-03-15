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

var util = require('util');
var utils = require('../../../util/utils');
var insightsUtils = require('./insights.utils');
var moment = require('moment');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;
  var insightsDiagnosticCommand = cli.category('insights').category('diagnostic')
    .description($('Configure diagnostics for resources'))
    .command('set <resourceId>')
    .description($('Set the diagnostics for the resource.'))
    .usage('<resourceId> [options]')
    .option('-i, --resourceId <resourceId>', $('resource Id.'))
    .option('-e, --enabled <enabled>', $('Mandatory flag to signal whether the configuration is enabled or disabled.'))
    .option('-a, --storageId <storageId>', $('storage account Id.'))
    .option('-b, --serviceBusRuleId <serviceBusRuleId>', $('service bus authorization rule Id.'))
    .option('-c, --categories <categories>', $('comma separated list of categories to be affected. Valid values vary per resource type.'))
    .option('-t, --timegrains <timegrains>', $('comma separated list of timegrains to be affected in ISO 8601 format. Example: \'PT1M\' for 1 minute.'))
    .option('-r, --retentionEnabled', $('flag to enable the retention policy.'))
    .option('-w, --workspaceId <workspaceId>', $('The workspace id.'))
    .option('-d, --retentionInDays <retentionInDays>', $('The number of days of the retention policy.'))
    .option('-s, --subscription <subscription>', $('The subscription identifier.'))
    .execute(function (resourceId, options, _) {
      options.resourceId = options.resourceId || resourceId;
      if (!options.resourceId) {
        return cli.missingArgument('resourceId');
      }

      options.enabled = JSON.parse(options.enabled);
      if (!options.enabled) {
        return cli.missingArgument('enabled');
      }

      var client = insightsUtils.createInsightsManagementClient(log, options);

      if (options.enabled &&
          insightsUtils.isEmptyOrSpaces(options.storageId) &&
          insightsUtils.isEmptyOrSpaces(options.serviceBusRuleId)) {
        throw new Error($('StorageId and serviceBusRuleId cannot both be null when enabling'));
      }

      if (options.categories) {
        options.categories = options.categories.split(',');
      }

      if (options.timegrains) {
        options.timegrains = options.timegrains.split(',');
      }

      log.silly(util.format('Input options: %s', util.inspect(options)));

      insightsDiagnosticCommand._executeCmd(client, options, _);
    });

  insightsDiagnosticCommand._executeCmd = function (client, options, _) {
    var resource = {
      location: '',
      logs: [],
      metrics: [],
      storageAccountId: '',
      serviceBusRuleId: '',
      workspaceId: ''
    };
    var getResponse = client.serviceDiagnosticSettings.get(options.resourceId, options, _);
    log.silly(util.format('Response before filtering: %s', util.inspect(getResponse)));

    if (getResponse) {
      resource.location = getResponse.location || '';
      resource.logs = getResponse.logs;
      resource.metrics = getResponse.metrics;
      resource.serviceBusRuleId = getResponse.serviceBusRuleId;
      resource.storageAccountId = getResponse.storageAccountId;
      resource.workspaceId = getResponse.workspaceId;
    }

    // Filtering out the retnetion policy data
    insightsUtils.removeRetentionPolicy(resource.metrics);
    insightsUtils.removeRetentionPolicy(resource.logs);

    var i = 0;
    var j = 0;
    
    if (!options.categories && !options.timegrains) {
      for (i = 0; i < getResponse.logs.length; i++) {
        resource.logs[i].enabled = options.enabled;
      }

      for (i = 0; i < getResponse.metrics.length; i++) {
        resource.metrics[i].enabled = options.enabled;
      }
    }
    else {
      if (options.categories) {
        for (i = 0; i < options.categories.length; i++) {
          var logSettings = null;
          for (j = 0; j < resource.logs.length; j++) {
            if (resource.logs[j].category === options.categories[i]) {
              logSettings = resource.logs[j];
            }
          }

          if (!logSettings) {
              throw new Error(util.format($('Log category \'%s\' is not available'), options.categories[i]));
          }

          logSettings.enabled = options.enabled;
        }   
      }

      if (options.timegrains) {
        for (i = 0; i < options.timegrains.length; i++) {
          var metricSettings = null;

          for (j = 0; j < resource.metrics.length; j++) {
            if (resource.metrics[j].timeGrain.toISOString() === options.timegrains[i].toUpperCase()) {
              resource.metrics[j].timeGrain = moment.duration(resource.metrics[j].timeGrain);
              metricSettings = getResponse.metrics[j];
            }
          }

          if (!metricSettings) {
              throw new Error(util.format('Metric timegrain \'%s\' is not available', options.timegrains[i]));
          }

          metricSettings.enabled = options.enabled;
        }
      }
    }

    if (!insightsUtils.isEmptyOrSpaces(options.storageId))
    {
      resource.storageAccountId = options.storageId;
    }

    if (!insightsUtils.isEmptyOrSpaces(options.serviceBusRuleId))
    {
      resource.serviceBusRuleId = options.serviceBusRuleId;
    }

    if (!insightsUtils.isEmptyOrSpaces(options.workspaceId)) {
      resource.workspaceId = options.workspaceId;
    }

    client.serviceDiagnosticSettings.createOrUpdate(options.resourceId, resource, options, _);

    insightsUtils.formatOutput(cli, log, options, resource);
  };
};
