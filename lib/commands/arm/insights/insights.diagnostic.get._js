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
var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;
  var insightsDiagnosticCommand = cli.category('insights').category('diagnostic')
    .description($('Configure diagnostics for resources'))
    .command('get <resourceId>')
      .description($('Get the diagnostics for the resource.'))
      .usage('<resourceId> [options]')
      .option('-i, --resourceId <resourceId>', $('resource Id.'))
      .option('-s --subscription <subscription>', $('The subscription identifier.'))
      .execute(function (resourceId, options, _) {
        options.resourceId = options.resourceId || resourceId;

        if (!options.resourceId) {
          return cli.missingArgument('resourceId');
        }

        insightsDiagnosticCommand._prepareAndExecute(options, _);
      });

  insightsDiagnosticCommand._prepareAndExecute = function (options, _) {
    var client = insightsUtils.createInsightsManagementClient(log, options);

    var getResponse = client.serviceDiagnosticSettings.get(options.resourceId, options, _);

    log.silly(util.format('Response before filtering: %s', util.inspect(getResponse)));
   
    // Filtering out the retnetion policy data
    insightsUtils.removeRetentionPolicy(getResponse.metrics);
    insightsUtils.removeRetentionPolicy(getResponse.logs);

    insightsUtils.formatOutput(cli, log, options, getResponse);
  };
};
