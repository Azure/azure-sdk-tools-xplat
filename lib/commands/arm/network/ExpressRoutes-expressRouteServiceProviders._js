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

// Warning: This code was generated by a tool.
// 
// Changes to this file may cause incorrect behavior and will be lost if the
// code is regenerated.

'use strict';
var profile = require('../../../util/profile');
var utils = require('../../../util/utils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var network = cli.category('network')
    .description($('Commands to manage network resources'));
  var expressRoutes = network.category('express-route')
    .description($('Commands to manage express routes'));
  var expressRouteServiceProviders = expressRoutes.category('provider')
    .description($('Commands to manage express route service providers'));

  expressRouteServiceProviders.command('list')
    .description($('List express route service providers'))
    .usage('[options]')
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var expressRouteServiceProvider = null;
      var progress;
      try {
        if(typeof networkManagementClient.expressRouteServiceProviders.listAll != 'function') {
          progress = cli.interaction.progress($('Getting the express route service providers'));
          expressRouteServiceProvider = networkManagementClient.expressRouteServiceProviders.list( _);
        } else {
          if(options.resourceGroup) {
            progress = cli.interaction.progress($('Getting the express route service providers'));
            expressRouteServiceProvider = networkManagementClient.expressRouteServiceProviders.list( _);
          } else {
            progress = cli.interaction.progress($('Getting the express route service providers'));
            expressRouteServiceProvider = networkManagementClient.expressRouteServiceProviders.listAll(_);
          }
        }
      } finally {
        progress.end();
      }

      cli.interaction.formatOutput(expressRouteServiceProvider, function(expressRouteServiceProvider) {
        if (expressRouteServiceProvider.length === 0) {
          cli.output.warn($('No express route service providers found'));
        } else {
          cli.output.table(expressRouteServiceProvider, function (row, provider) {
            row.cell($('Name'), provider.name);
            var bandwidths = provider.bandwidthsOffered.map(function (b) {
              return b.offerName;
            });
            row.cell($('Bandwidths offered'), bandwidths);
            row.cell($('Peering locations'), provider.peeringLocations.join());
          });
        }
      });
    });
};
