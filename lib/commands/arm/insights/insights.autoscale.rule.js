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
  var insightsAutoscaleRulesCommand = cli.category('insights').category('autoscale').category('rule')
    .description($('Manages autoscale rules'));

  // ** Defining the commands for this category
  insightsAutoscaleRulesCommand.command('create <metricName> <metricResourceId> <conditionOperatorType> <metricStatisticType> <threshold> <timeGrain> <actionCooldown> <actionDirection> <actionType> <scaleValue>')
    .description($('Create or set an autoscale rule.'))
    .usage('<metricName> <metricResourceId> <conditionOperatorType> <metricStatisticType> <threshold> <timeGrain> <actionCooldown> <actionDirection> <actionType> <scaleValue> [options]')

    .option('-m --metricName <metricName>', $('The metric name.'))
    .option('-i --metricResourceId <metricResourceId>', $('The resource Id.'))
    .option('-o --conditionOperatorType <conditionOperatorType>', $('The condition operator: Equals, NotEquals, GreaterThan, GreaterThanOrEqual, LessThan, LessThanOrEqual. The value is case insensitive.'))
    .option('-r --metricStatisticType <metricStatisticType>', $('The metric statistic type: Average, Min, Max, Sum. The value is case insensitive.'))
    .option('-t --threshold <threshold>', $('The threshold.'))
    .option('-n --timeGrain <timeGrain>', $('The time grain. Expected format hh:mm:ss.'))
    .option('-c --actionCooldown <actionCooldown>', $('The scale action cooldown time. Expected format hh:mm:ss.'))
    .option('-d --actionDirection <actionDirection>', $('The scale action direction: None, Increase, Decrease. The value is case insensitive.'))
    .option('-y --actionType <actionType>', $('The scale action type name. This argument is ignored since only ChangeCount is supported. The argument remains for backwards compatibility only.'))
    .option('-l --scaleValue <scaleValue>', $('The scale action value.'))

    // Optional
    .option('-a --timeAggregationOperator <timeAggregationOperator>', $('The time aggregation operator: Average, Minimum, Maximum, Total. The value is case insensitive.'))
    .option('-w --windowSize <windowSize>', $('The time window size. Expected format hh:mm:ss.'))

    .execute(function (metricName, metricResourceId, conditionOperatorType, metricStatisticType, threshold, timeGrain, actionCooldown, actionDirection, actionType, scaleValue, options) {
      insightsAutoscaleRulesCommand._checkParameters(metricName, metricResourceId, conditionOperatorType, metricStatisticType, threshold, timeGrain, actionCooldown, actionDirection, scaleValue, options);
      insightsAutoscaleRulesCommand._executeSetCmd(options);
    });

  insightsAutoscaleRulesCommand._checkParameters = function (metricName, metricResourceId, conditionOperatorType, metricStatisticType, threshold, timeGrain, actionCooldown, actionDirection, scaleValue, options) {
    options.metricName = options.metricName || metricName;
    options.metricResourceId = options.metricResourceId || metricResourceId;
    options.conditionOperatorType = options.conditionOperatorType || conditionOperatorType;
    options.metricStatisticType = options.metricStatisticType || metricStatisticType;
    options.threshold = options.threshold || threshold;
    options.timeGrain = options.timeGrain || timeGrain;
    options.actionCooldown = options.actionCooldown || actionCooldown;
    options.actionDirection = options.actionDirection || actionDirection;
    options.scaleValue = options.scaleValue || scaleValue;

    // The framework checks the presence of mandatory parameters, and they are always strings 
    // Checking parameters values and setting default values for optionals
    if (!options.metricName) {
      return cli.missingArgument('metricName');
    }

    if (!options.metricResourceId) {
      return cli.missingArgument('metricResourceId');
    }

    if (!options.conditionOperatorType) {
      return cli.missingArgument('conditionOperatorType');
    } else {
      insightsUtils.validateEnumerationParameter(options.conditionOperatorType, '|equals|notequals|greaterthan|greaterthanorequal|lessthan|lessthanorequal|', 'Invalid condition operator: %s');
    }

    if (!options.metricStatisticType) {
      return cli.missingArgument('metricStatisticType');
    } else {
      insightsUtils.validateEnumerationParameter(options.metricStatisticType, '|average|min|max|sum|', 'Invalid metric statistics type: %s');
    }

    if (!options.threshold) {
      return cli.missingArgument('threshold');
    } else {
      options.threshold = parseFloat(options.threshold);
    }

    if (!options.timeGrain) {
      return cli.missingArgument('timeGrain');
    } else {
      options.timeGrain = insightsUtils.validateTimeSpan(options.timeGrain);

      if (timeGrain < insightsUtils.minimumTimeGrain) {
        throw new Error(util.format($('TimeGrain %s is shorter than the minimum allowed %s'), timeGrain, insightsUtils.minimumTimeGrain.toISOString()));
      }
    }

    if (!options.actionCooldown) {
      return cli.missingArgument('actionCooldown');
    } else {
      options.actionCooldown = insightsUtils.validateTimeSpan(options.actionCooldown);
    }

    if (!options.actionDirection) {
      return cli.missingArgument('actionDirection');
    } else {
      insightsUtils.validateEnumerationParameter(options.actionDirection, '|none|increase|decrease|', 'Invalid scale action direction: %s');
    }

    // Set this options to the only supported value
    options.actionType = 'ChangeCount';

    if (!options.scaleValue) {
      return cli.missingArgument('scaleValue');
    }

    // Check the optionals if present
    if (options.timeAggregationOperator) {
      insightsUtils.validateEnumerationParameter(options.timeAggregationOperator, '|average|minimum|maximum|total|', 'Invalid time aggregation operator: %s');
    }

    if (!__.isString(options.timeWindow)) {
      options.timeWindow = insightsUtils.minimumTimeWindow;
    } else {
      options.timeWindow = insightsUtils.validateTimeSpan(options.timeWindow);
      if (options.TimeWindow < insightsUtils.minimumTimeWidow) {
        throw new Error(util.format($('TimeWindow %s is shorter than the minimum allowed %s'), options.timeWindow, insightsUtils.minimumTimeWindow.toISOString()));
      }
    }
  };

  // *** The execute cmd functions
  insightsAutoscaleRulesCommand._executeSetCmd = function (options) {
    log.silly(util.format('Options: %s', util.inspect(options)));

    // Object creation
    var trigger = {
      metricName: options.metricName,
      metricResourceUri: options.metricResourceId,
      operator: options.conditionOperatorType,
      statistic: options.metricStatisticType,
      threshold: options.threshold,
      timeAggregation: options.timeAggregationOperator,
      timeGrain: options.timeGrain.toISOString(),
      timeWindow: options.timeWindow.toISOString()
    };

    var action = {
      cooldown: options.actionCooldown.toISOString(),
      direction: options.actionDirection,
      type: options.actionType,
      value: options.scaleValue
    };

    var response = {
      metricTrigger: trigger,
      scaleAction: action
    };

    // Output setting
    if (options.json) {
      cli.output.json(response);
    } else {
      log.data(JSON.stringify(response).replace(/"/g, '\\"'));
    }
  };
};
