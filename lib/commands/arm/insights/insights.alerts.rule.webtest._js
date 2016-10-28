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
  var insightsWebtestAlertsRulesCommand = cli.category('insights').category('alerts').category('rule').category('webtest')
    .description($('Creates webtest alerts rules'));
  
  insightsWebtestAlertsRulesCommand.command('set <ruleName> <location> <resourceGroup> <windowSize> <failedLocationCount> <metricName> <webtestResourceUri>')
    .description($('Create a webtest alert rule.'))
    .usage('<ruleName> <location> <resourceGroup> <windowSize> <failedLocationCount> <metricName> <webtestResourceUri> [options]')

    // Generic options
    .option('-x --disable', $('Flag to disable the rule.'))
    .option('-s --subscription <subscription>', $('The subscription identifier.'))

    // Common required
    .option('-n --ruleName <ruleName>', $('The name of the rule.'))
    .option('-d --description <description>', $('The description of the rule.'))
    .option('-l --location <location>', $('The location.'))
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))
    .option('-m --metricName <metricName>', $('The metric name.'))

    .option('--windowSize <windowSize>', $('The time window size. Expected format hh:mm:ss.'))
    .option('-f --failedLocationCount <failedLocationCount>', $('The failed location count.'))
    .option('-i --webtestResourceUri <webtestResourceUri>', $('The webtest resource Id.'))
    .option('-y --metricNamespace <metricNamespace>', $('The metric namespace.'))
    .option('-z --actions <actions>', $('The list of alert rule actions. The list must be a json object (string) of an array. Example: "[{\\\"customEmails\\\":[\\\"gu@ms.com\\\"]},{\\\"serviceUri\\\":\\\"http://foo.com\\\",\\\"properties\\\":[{\\\"key\\\":\\\"key1\\\",\\\"value\\\":\\\"value1\\\"},{\\\"key\\\":\\\"value1\\\",\\\"value\\\":\\\"key2\\\"}]}]"'))

    .execute(function (ruleName, location, resourceGroup, windowSize, failedLocationCount, metricName, webtestResourceUri, options, _) {
      options.ruleName = options.ruleName || ruleName;
      options.location = options.location || location;
      options.resourceGroup = options.resourceGroup || resourceGroup;
      options.windowSize = options.windowSize || windowSize;
      options.failedLocationCount = options.failedLocationCount || failedLocationCount;
      options.metricName = options.metricName || metricName;
      options.webtestResourceUri = options.webtestResourceUri || webtestResourceUri;

      if (!__.isString(options.ruleName)) {
        return cli.missingArgument('ruleName');
      }

      if (!__.isString(options.location)) {
        return cli.missingArgument('location');
      }

      if (!__.isString(options.resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      if (options.windowSize) {
        options.windowSize = insightsUtils.validateTimeSpan(options.windowSize);
      } else {
        options.windowSize = insightsUtils.defaultWindowSize;
      }

      if (!__.isString(options.failedLocationCount)) {
        return cli.missingArgument('failedLocationCount');
      } else {
        options.failedLocationCount = parseInt(options.failedLocationCount);
      }

      if (!__.isString(options.metricName)) {
        return cli.missingArgument('metricName');
      }

      if (!__.isString(options.webtestResourceUri)) {
        return cli.missingArgument('webtestResourceUri');
      }

      log.silly(util.inspect(options));

      var client = insightsUtils.createInsightsManagementClient(log, options);
      var parameters = insightsWebtestAlertsRulesCommand._createSdkCallParameters(client, options);

      log.silly(util.format('Parameters: %s', util.inspect(parameters)));

      insightsWebtestAlertsRulesCommand._executeSetCmd(client, parameters, options, _);
    });

  // ** The Prepare and Execute functions
  insightsWebtestAlertsRulesCommand._createLocationThresholdRuleCondition = function (options) {
    return {
      dataSource: {
        metricName: options.metricName,
        metricNamespace: options.metricNamespace,
        resourceUri: options.webtestResourceUri,
        odatatype: 'Microsoft.Azure.Management.Insights.Models.RuleMetricDataSource'
      },
      failedLocationCount: options.failedLocationCount,
      windowSize: options.windowSize,
      odatatype: 'Microsoft.Azure.Management.Insights.Models.LocationThresholdRuleCondition'
    };
  };

  insightsWebtestAlertsRulesCommand._createSdkCallParameters = function (client, options) {
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

    var condition = this._createLocationThresholdRuleCondition(options);
    var parameters = {
      location: options.location,
      alertRuleResourceName: options.ruleName,
      isEnabled: !options.disabled,
      description: (__.isUndefined(options.description) || __.isNull(options.description)) ? '' : options.description,
      lastUpdatedTime: new Date(),
      condition: condition,
      actions: internalActions,
      tags: {}
    };

    parameters.tags['hidden-link:' + options.webtestResourceUri] = 'Resource';

    return parameters;
  };

  insightsWebtestAlertsRulesCommand._executeSetCmd = function (client, parameters, options, _) {
    var progress = cli.interaction.progress(util.format($('Creating or updating a webtest alert rule \"%s\"'), options.ruleName));
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
