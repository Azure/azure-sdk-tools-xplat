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
  var insightsAlertsCommand = cli.category('insights').category('alerts')
    .description($('Manages alert rules'))
    .command('list <resourceId>')
      .description($('List alert logs for a resource.'))
      .usage('[options] <resourceId>')
      .option('-i --resourceId <resourceId>', $('The resource Id.'))
      .option('-b --startTime <startTime>', $('The start time of the query.'))
      .option('-e --endTime <endTime>', $('The end time of the query.'))
      .option('--status <status>', $('The status.'))
      .option('--caller <caller>', $('Caller to look for when querying.'))
      .option('-d --detailedOutput', $('Shows the details of the events in the log.'))
      .option('-s --subscription <subscription>', $('The subscription identifier.'))
      .execute(function (resourceId, options, _) {
        insightsAlertsCommand._prepareAndExecute(resourceId, options, _);
      });

  insightsAlertsCommand._filterByResourceId = function (resourceId) {
    if (__.isString(resourceId)) {
      var resourceIdLowerCase = resourceId.toLowerCase();
      return function (record) { return __.isString(record.resourceId) && record.resourceId.toLowerCase() === resourceIdLowerCase; };
    } else {
      return insightsUtils.passAllFilter;
    }
  };

  insightsAlertsCommand._processGeneralParameters = function (options) {
    var queryFilter = insightsUtils.validateDateTimeRangeAndAddDefaultsEvents(options.startTime, options.endTime);
    log.silly('s2');
    queryFilter = insightsUtils.addConditionIfPresent(queryFilter, 'status', options.status);
    queryFilter = insightsUtils.addConditionIfPresent(queryFilter, 'caller', options.caller);

    return queryFilter;
  };

  insightsAlertsCommand._prepareAndExecute = function (resourceId, options, _) {
    if (!__.isString(resourceId)) {
      return cli.missingArgument('resourceId');
    }

    var client = insightsUtils.createInsightsClient(log, options);

    var queryFilter = this._processGeneralParameters(options);
    log.silly('s3');
    queryFilter = insightsUtils.addConditionIfPresent(queryFilter, 'eventSource', insightsUtils.alertsEventSourceName);
    options.filter = queryFilter;
    options.select = !options.detailedOutput ? insightsUtils.selectedFields : null;

    this._executeEventsCmd(client, this._filterByResourceId(resourceId), options, _);
  };

  insightsAlertsCommand._executeEventsCmd = function (client, keepTheRecord, options, _) {
    var progress = cli.interaction.progress(util.format($('Querying \"%s\"'), options.filter));
    var result = [];
    try {
      var response = client.events.list(options, _);

      // These are debugging messages
      log.silly(!response ? util.inspect(response) : 'nothing in response');

      var recordFilter = function (element) { if (keepTheRecord(element)) { result.push(element); }};
      __.each(response, recordFilter);

      var nextLink = response.nextLink;
      while (nextLink) {
        log.silly('Following nextLink');
        response = client.events.listNext(nextLink, options, _);
        __.each(response.value, recordFilter);
        nextLink = response.nextLink;
      }
    } finally {
      progress.end();
    }

    insightsUtils.formatOutputList(cli, log, options, result);
  };
};
