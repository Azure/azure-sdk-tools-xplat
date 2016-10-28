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

var __ = require('underscore');
var util = require('util');
var utils = require('../../../util/utils');
var insightsUtils = require('./insights.utils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;
  var insightsAlertsRulesCommand = cli.category('insights').category('alerts').category('rule')
    .description($('Manages alert rules'));

  // ** Defining the commands for this category
  insightsAlertsRulesCommand.command('list <resourceGroup>')
    .description($('List alert rules for a resource.'))
    .usage('<resourceGroup> [options]')
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))
    .option('-n --ruleName <ruleName>', $('The name of the rule to query.'))
    .option('-i --targetResourceId <targetResourceId>', $('The target resource of the query.'))
    .option('-s --subscription <subscription>', $('The subscription identifier.'))
    .execute(function (resourceGroup, options, _) {
      options.resourceGroup = options.resourceGroup || resourceGroup;

      if (!__.isString(options.resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      var client = insightsUtils.createInsightsManagementClient(log, options);

      insightsAlertsRulesCommand._executeCmd(client, options, _);
    });

  insightsAlertsRulesCommand.command('delete <resourceGroup> <ruleName>')
    .description($('Deletes an alert rule.'))
    .usage('<resourceGroup> <ruleName> [options]')
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))
    .option('-n --ruleName <ruleName>', $('The name of the rule to query.'))
    .option('-s --subscription <subscription>', $('The subscription identifier.'))
    .execute(function (resourceGroup, ruleName, options, _) {
      if (!__.isString(resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      if (!__.isString(ruleName)) {
        return cli.missingArgument('ruleName');
      }

      var client = insightsUtils.createInsightsManagementClient(log, options);

      insightsAlertsRulesCommand._executeDeleteCmd(client, resourceGroup, ruleName, options, _);
    });

  // *** The execute cmd functions
  insightsAlertsRulesCommand._executeCmd = function (client, options, _) {
    var progress = cli.interaction.progress($('Querying for alert rules'));
    var result = [];
    var response;
    try {
      if (!__.isString(options.ruleName) || options.ruleName === '') {
        log.silly('Query by resourceGroup or targetResourceId');

        if (__.isString(options.targetResourceId)) {
          options.filter = util.format('resourceId eq \'%s\'', options.targetResourceId);
        }

        response = client.alertRules.listByResourceGroup(options.resourceGroup, options, _);

        log.silly(!response ? util.inspect(response) : 'nothing in response');

        __.each(response, function (element) { result.push(element); });
      } else {
        log.silly('Query by name');
        response = client.alertRules.get(options.resourceGroup, options.ruleName, options, _);

        log.silly(!response ? util.inspect(response) : 'nothing in response');

        result.push({
          id: response.id,
          location: response.location,
          name: response.name,
          properties: response.properties,
          tags: response.Tags
        });
      }
    } finally {
      progress.end();
    }

    insightsUtils.formatOutputList(cli, log, options, result);
  };

  insightsAlertsRulesCommand._executeDeleteCmd = function (client, resourceGroup, ruleName, options, _) {
    var progress = cli.interaction.progress(util.format($('Deleting alert rule \"%s\"'), ruleName));
    var response = null;
    try {
      var responseTemp = client.alertRules.deleteMethod(resourceGroup, ruleName, options, _);

      response = {
        statusCode: 200,
        requestId: ''
      };

      // These are debugging messages
      log.silly(!responseTemp ? util.inspect(response) : 'nothing in response');
    } finally {
      progress.end();
    }

    insightsUtils.formatOutput(cli, log, options, response);
  };
};
