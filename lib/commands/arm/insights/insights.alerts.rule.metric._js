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
  var insightsMetricAlertsRulesCommand = cli.category('insights').category('alerts').category('rule').category('metric')
    .description($('Creates metric-based alerts rules'));

  insightsMetricAlertsRulesCommand.command('set <ruleName> <location> <resourceGroup> <windowSize> <operator> <threshold> <targetResourceId> <metricName> <timeAggregationOperator>')
    .description($('Create or set a metric alert rule.'))
    .usage('[options] <ruleName> <location> <resourceGroup> <windowSize> <operator> <threshold> <targetResourceId> <metricName> <timeAggregationOperator>')

    // Generic options
    .option('-x --disable', $('Flag to disable the rule.'))
    .option('-s --subscription <subscription>', $('The subscription identifier.'))

    // Common required
    .option('-n --ruleName <ruleName>', $('The name of the rule.'))
    .option('-d --description <description>', $('The description of the rule.'))
    .option('-l --location <location>', $('The location.'))
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))

    // Common optional
    .option('--windowSize <windowSize>', $('The time window size. Expected format hh:mm:ss.'))
    .option('-o --operator <operator>', $('The condition operator: GreaterThan, GreaterThanOrEqual, LessThan, LessThanOrEqual. Value is case insensitive.'))
    .option('-a --threshold <threshold>', $('The threshold.'))
    .option('-i --targetResourceId <targetResourceId>', $('The target resource Id.'))
    .option('-m --metricName <metricName>', $('The metric name.'))
    .option('--timeAggregationOperator <timeAggregationOperator>', $('The time aggregation operator: Average, Minimum, Maximum, Total. Value is case insensitve.'))
    .option('-z --actions <actions>', $('The list of alert rule actions. The list must be a json object (string) of an array. Example: \"[{\\\"customEmails\\\":[\\\"gu@ms.com\\\"]},{\\\"serviceUri\\\":\\\"http://foo.com\\\",\\\"properties\\\":[{\\\"key\\\":\\\"key1\\\",\\\"value\\\":\\\"value1\\\"},{\\\"key\\\":\\\"value1\\\",\\\"value\\\":\\\"key2\\\"}]}]'))

    .execute(function (ruleName, location, resourceGroup, windowSize, operator, threshold, targetResourceId, metricName, timeAggregationOperator, options, _) {
      options.ruleName = options.ruleName || ruleName;
      options.location = options.location || location;
      options.resourceGroup = options.resourceGroup || resourceGroup;
      options.windowSize = options.windowSize || windowSize;
      options.operator = options.operator || operator;
      options.threshold = options.threshold || threshold;
      options.targetResourceId = options.targetResourceId || targetResourceId;
      options.metricName = options.metricName || metricName;
      options.timeAggregationOperator = options.timeAggregationOperator || timeAggregationOperator;

      log.silly(util.inspect(options));

      if (!__.isString(options.ruleName)) {
        return cli.missingArgument('ruleName');
      }

      if (!__.isString(options.location)) {
        return cli.missingArgument('location');
      }

      if (!__.isString(options.resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      if (!__.isString(options.windowSize)) {
        return cli.missingArgument('windowSize');
      } else {
        //var t = options.windowSize;
        options.windowSize = insightsUtils.validateTimeSpan(options.windowSize);
        //throw new Error(util.format('Windows size: %s, transformed: %s', t, options.windowSize));
      }

      if (!__.isString(options.operator)) {
        return cli.missingArgument('operator');
      } else {
        var operatorTemp = options.operator.toLowerCase();
        if (operatorTemp != 'greaterthan' && operatorTemp != 'greaterthanorequal' && operatorTemp != 'lessthan' && operatorTemp != 'lessthanorequal') {
          throw new Error(util.format($('Invalid condition operator: %s'), options.operator));
        }
      }

      if (!__.isString(options.threshold)) {
        return cli.missingArgument('threshold');
      } else {
        options.threshold = parseFloat(options.threshold);
      }

      if (!__.isString(options.targetResourceId)) {
        return cli.missingArgument('targetResourceId');
      }

      if (!__.isString(options.metricName)) {
        return cli.missingArgument('metricName');
      }

      if (!__.isString(options.timeAggregationOperator)) {
        return cli.missingArgument('timeAggregationOperator');
      } else {
        var tempOperator = options.timeAggregationOperator.toLowerCase();
        if (tempOperator != 'average' && tempOperator != 'minimum' && tempOperator != 'maximum' && tempOperator != 'total') {
          throw new Error(util.format($('Invalid time aggregation operator: %s'), options.timeAggregationOperator));
        }
      }

      var client = insightsUtils.createInsightsManagementClient(log, options);
      var parameters = insightsMetricAlertsRulesCommand._createSdkCallParameters(client, options);

      insightsMetricAlertsRulesCommand._executeSetCmd(client, parameters, options, _);
      //insightsMetricAlertsRulesCommand._prepareAndExecuteSet(ruleName, location, resourceGroup, windowSize, operator, threshold, targetResourceId, metricName, timeAggregationOperator, options, _);

    });

  insightsMetricAlertsRulesCommand._createThresholdRuleCondition = function (options) {
    return {
      dataSource: {
        metricName: options.metricName,
        resourceUri: options.targetResourceId,
        odatatype: 'Microsoft.Azure.Management.Insights.Models.RuleMetricDataSource'
      },
      operator: options.operator,
      threshold: options.threshold,
      timeAggregation: options.timeAggregationOperator,
      windowSize: options.windowSize,
      odatatype: 'Microsoft.Azure.Management.Insights.Models.ThresholdRuleCondition'
    };
  };

  insightsMetricAlertsRulesCommand._createSdkCallParameters = function (client, options) {
    var condition = this._createThresholdRuleCondition(options);

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

    var parameters = {
      location: options.location,
      alertRuleResourceName: options.ruleName,
      isEnabled: !options.disabled,
      description: options.description,
      lastUpdatedTime: new Date(),
      condition: condition,
      actions: internalActions,
      tags: {}
    };

    if (options.targetResourceId) {
      parameters.tags['$type'] = 'Microsoft.WindowsAzure.Management.Common.Storage.CasePreservedDictionary,Microsoft.WindowsAzure.Management.Common.Storage';
      parameters.tags['hidden-link:' + options.targetResourceId] = 'Resource';
    }

    return parameters;
  };

  // *** The execute cmd functions
  insightsMetricAlertsRulesCommand._executeSetCmd = function (client, parameters, options, _) {
    var progress = cli.interaction.progress(util.format($('Creating or updating a metric alert rule \"%s\"'), options.ruleName));
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
