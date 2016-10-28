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
  var insightsLogAlertsRulesCommand = cli.category('insights').category('alerts').category('rule').category('log')
    .description($('Creates event-based alerts rules'));

  // ** Defining the commands for this category
  insightsLogAlertsRulesCommand.command('set <ruleName> <location> <resourceGroup> <operationName>')
    .description($('Create or set an event-based alert rule.'))
    .usage('<ruleName> <location> <resourceGroup> <operationName> [options]')

    // Generic options
    .option('-x --disable', $('Flag to disable the rule.'))
    .option('-s --subscription <subscription>', $('The subscription identifier.'))

    // Common required
    .option('-n --ruleName <ruleName>', $('The name of the rule.'))
    .option('-d --description <description>', $('The description of the rule.'))
    .option('-l --location <location>', $('The location.'))
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))

    .option('-p --operationName <operationName>', $('The operation name.'))

    .option('-z --actions <actions>', $('The list of alert rule actions. The list must be a json object (string) of an array. Example: \"[{\\\"customEmails\\\":[\\\"gu@ms.com\\\"]},{\\\"serviceUri\\\":\\\"http://foo.com\\\",\\\"properties\\\":[{\\\"key\\\":\\\"key1\\\",\\\"value\\\":\\\"value1\\\"},{\\\"key\\\":\\\"value1\\\",\\\"value\\\":\\\"key2\\\"}]}]'))
    .option('-i --targetResourceId <targetResourceId>', $('The target resource Id.'))
    .option('-k --targetResourceProvider <targetResourceProvider>', $('The target resource provider.'))
    .option('-z --targetResourceGroup <targetResourceGroup>', $('The target resource group.'))
    .option('-f --level <level>', $('The level for the rule.'))
    .option('-u --status <status>', $('The status.'))
    .option('-b --subStatus <subStatus>', $('The substatus.'))

    .execute(function (ruleName, location, resourceGroup, operationName, options, _) {
      options.ruleName = options.ruleNAme || ruleName;
      options.location = options.location || location;
      options.resourceGroup = options.resourceGroup || resourceGroup;
      options.operationName = options.operationName || operationName;

      if (!__.isString(options.ruleName)) {
        return cli.missingArgument('ruleName');
      }

      if (!__.isString(options.location)) {
        return cli.missingArgument('location');
      }

      if (!__.isString(options.resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      if (!__.isString(options.operationName)) {
        return cli.missingArgument('operationName');
      }

      log.silly(util.format('options: %s', util.inspect(options)));

      var client = insightsUtils.createInsightsManagementClient(log, options);
      var parameters = insightsLogAlertsRulesCommand._createSdkCallParameters(client, options);

      insightsLogAlertsRulesCommand._executeSetCmd(client, parameters, options, _);
    });

  // ** The Prepare and Execute functions
  insightsLogAlertsRulesCommand._createEventRuleCondition = function(client, options) {
    if (!__.isString(options.operationName)) {
      return cli.missingArgument('operationName');
    }

    var dataSource = {
      level: options.level,
      operationName: options.operationName,
      resourceGroupName: options.targetResourceGroup,
      resourceProviderName: options.targetResourceProvider,
      resourceUri: options.targetResourceId,
      status: options.status,
      subStatus: options.subStatus,
      odatatype: 'Microsoft.Azure.Management.Insights.Models.RuleManagementEventDataSource'
    };

    var ruleCondition = {
      dataSource: dataSource,
      odatatype: 'Microsoft.Azure.Management.Insights.Models.ManagementEventRuleCondition'
    };

    return ruleCondition;
  };

  insightsLogAlertsRulesCommand._createSdkCallParameters = function (client, options) {
    var internalActions = [];
    if (!__.isUndefined(options.actions) && !__.isNull(options.actions)) {
      var actionsMapper = {
        required: false,
        serializedName: 'properties.actions',
        type: {
          name: 'Sequence',
          element: {
            required: false,
            serializedName: 'RuleActionElementType',
            type: {
              name: 'Composite',
              polymorphicDiscriminator: {
                serializedName: 'odata.type',
                clientName: 'odatatype'
              },
              uberParent: 'RuleAction',
              className: 'RuleAction'
            }
          }
        }
      };

      internalActions = JSON.parse(options.actions);
      log.silly(util.format('About to serialize: %s', util.inspect(internalActions)));
      internalActions = client.deserialize(actionsMapper, internalActions, 'actions');
      log.silly(util.format('Parsed actions: %s', util.inspect(internalActions)));
      if (!__.isArray(internalActions)) {
        throw new Error($('Invalid actions argument: array expected.'));
      }
    }

    var condition = this._createEventRuleCondition(client, options);
    var alertRuleResource = {
      location: options.location,
      alertRuleResourceName: options.ruleName,
      isEnabled: !options.disabled,
      description: options.description,
      lastUpdatedTime: new Date(),
      condition: condition,
      actions: internalActions,
      tags: {}
    };

    if (options.targetResourceId && options.targetResourceId !== '') {
      alertRuleResource.tags['$type'] = 'Microsoft.WindowsAzure.Management.Common.Storage.CasePreservedDictionary,Microsoft.WindowsAzure.Management.Common.Storage';
      alertRuleResource.tags['hidden-link:' + options.targetResourceId] = 'Resource';
    }

    return alertRuleResource;
  };

  insightsLogAlertsRulesCommand._executeSetCmd = function (client, parameters, options, _) {
    var progress = cli.interaction.progress(util.format($('Creating or updating a log alert rule \"%s\"'), options.ruleName));
    var response = null;
    try {
      var responseTemp = client.alertRules.createOrUpdate(options.resourceGroup, options.ruleName, parameters, options, _);

      response = {
        statusCode: 200,
        requestId: '',
        response: responseTemp
      };

      // These are debugging messages
      log.silly(!responseTemp ? util.inspect(response) : 'nothing in response');
    } finally {
      progress.end();
    }

    insightsUtils.formatOutput(cli, log, options, response);
  };
};
