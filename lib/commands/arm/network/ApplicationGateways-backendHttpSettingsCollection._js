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

var generatorUtils = require('../../../util/generatorUtils');
var resourceUtils = require('../resource/resourceUtils');
var util = require('util');
var validation = require('../../../util/validation');

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var network = cli.category('network')
    .description($('Commands to manage network resources'));
  var applicationGateways = network.category('application-gateway')
    .description($('Commands to manage application gateways'));
  var backendHttpSettingsCollection = applicationGateways.category('http-settings')
    .description($('Commands to manage backend http settings collection'));

  backendHttpSettingsCollection.command('create [resource-group] [gateway-name] [name] [port]')
    .description($('Create a backend http settings collection'))
    .usage('[options] <resource-group> <gateway-name> <name> <port>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the backend http settings collection'))
    .option('-o, --port <port>', $('port'))
    .option('-p, --protocol [protocol]', $('protocol. Possible values are: \'Http\'' +
      '\n     and \'Https\''))
    .option('-c, --cookie-based-affinity [cookie-based-affinity]', $('cookie based affinity. Possible values' +
      '\n     are: \'Enabled\' and \'Disabled\''))
    .option('-r, --probe-name [probe-name]', $('sets probe. This option is mutually' +
      '\n     exclusive with --probe-id'))
    .option('-i, --probe-id [probe-id]', $('sets probe. This option is mutually' +
      '\n     exclusive with --probe-name'))
    .option('--nowait', $('do not wait for the operation to complete. Returns as soon as the intial request is received by the server'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, port, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);
      options.port = cli.interaction.promptIfNotGiven($('port : '), port, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var index = 0;
      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      if(utils.findFirstCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: name})) {
        throw new Error(util.format($('backend http settings collection with name "%s" already exists in the "%s"'), name, gatewayName));
      }

      var parameters = {};
      if(!parameters.backendHttpSettingsCollection) {
        parameters.backendHttpSettingsCollection = [];
      }
      if(!parameters.backendHttpSettingsCollection[index]) {
        parameters.backendHttpSettingsCollection[index] = {};
      }
      if(options.port) {
        parameters.backendHttpSettingsCollection[index].port = parseInt(options.port, 10);
      }

      if(options.protocol) {
        parameters.backendHttpSettingsCollection[index].protocol = validation.isIn(options.protocol, ['Http', 'Https'], '--protocol');
      }

      if(options.cookieBasedAffinity) {
        parameters.backendHttpSettingsCollection[index].cookieBasedAffinity = validation.isIn(options.cookieBasedAffinity, ['Enabled', 'Disabled'], '--cookie-based-affinity');
      }

      if(!parameters.backendHttpSettingsCollection[index].probe) {
        parameters.backendHttpSettingsCollection[index].probe = {};
      }
      if(options.probeId) {
        if(options.probeName) {
          cli.output.warn($('--probe-name parameter will be ignored because --probe-id and --probe-name are mutually exclusive'));
        }
        parameters.backendHttpSettingsCollection[index].probe.id = options.probeId;
      } else if(options.probeName) {
        var referredprobe = utils.findFirstCaseIgnore(applicationGateway.probes, {name: options.probeName});
        if(!referredprobe) {
          throw new Error(util.format($('No probe with name "%s" found'), options.probeName));
        }
        var idContainerprobe = referredprobe;
        parameters.backendHttpSettingsCollection[index].probe.id = idContainerprobe.id;
      }

      parameters.backendHttpSettingsCollection[index].name = name;
      applicationGateway.backendHttpSettingsCollection.push(parameters.backendHttpSettingsCollection[index]);

      generatorUtils.removeEmptyObjects(parameters);
      progress = cli.interaction.progress(util.format($('Creating backend http settings collection in "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.createOrUpdate(resourceGroup, gatewayName, applicationGateway, _);
      } finally {
        progress.end();
      }

      cli.interaction.formatOutput(applicationGateway.backendHttpSettingsCollection[generatorUtils.findIndexByKeyValue(applicationGateway.backendHttpSettingsCollection, 'name', name)], generatorUtils.traverse);
    });

  backendHttpSettingsCollection.command('set [resource-group] [gateway-name] [name]')
    .description($('Update a backend http settings collection'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the backend http settings collection'))
    .option('-o, --port [port]', $('port'))
    .option('-p, --protocol [protocol]', $('protocol. Possible values are: \'Http\'' +
      '\n     and \'Https\''))
    .option('-c, --cookie-based-affinity [cookie-based-affinity]', $('cookie based affinity. Possible values' +
      '\n     are: \'Enabled\' and \'Disabled\''))
    .option('-r, --probe-name [probe-name]', $('sets probe. This option is mutually' +
      '\n     exclusive with --probe-id'))
    .option('-i, --probe-id [probe-id]', $('sets probe. This option is mutually' +
      '\n     exclusive with --probe-name'))
    .option('--nowait', $('do not wait for the operation to complete. Returns as soon as the intial request is received by the server'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var backendHttpSettingsCollection = utils.findFirstCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: name});
      var index = utils.indexOfCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: name});
      if(!backendHttpSettingsCollection) {
        throw new Error(util.format($('backend http settings collection with name "%s" not found in the "%s"'), name, gatewayName));
      }

      var parameters = applicationGateway;
      if(!parameters.backendHttpSettingsCollection) {
        parameters.backendHttpSettingsCollection = [];
      }
      if(!parameters.backendHttpSettingsCollection[index]) {
        parameters.backendHttpSettingsCollection[index] = {};
      }
      if(options.port) {
        parameters.backendHttpSettingsCollection[index].port = parseInt(options.port, 10);
      }

      if(options.protocol) {
        parameters.backendHttpSettingsCollection[index].protocol = validation.isIn(options.protocol, ['Http', 'Https'], '--protocol');
      }

      if(options.cookieBasedAffinity) {
        parameters.backendHttpSettingsCollection[index].cookieBasedAffinity = validation.isIn(options.cookieBasedAffinity, ['Enabled', 'Disabled'], '--cookie-based-affinity');
      }

      if(!parameters.backendHttpSettingsCollection[index].probe) {
        parameters.backendHttpSettingsCollection[index].probe = {};
      }
      if(options.probeId) {
        if(options.probeName) {
          cli.output.warn($('--probe-name parameter will be ignored because --probe-id and --probe-name are mutually exclusive'));
        }
        parameters.backendHttpSettingsCollection[index].probe.id = options.probeId;
      } else if(options.probeName) {
        var referredprobe = utils.findFirstCaseIgnore(applicationGateway.probes, {name: options.probeName});
        if(!referredprobe) {
          throw new Error(util.format($('No probe with name "%s" found'), options.probeName));
        }
        var idContainerprobe = referredprobe;
        parameters.backendHttpSettingsCollection[index].probe.id = idContainerprobe.id;
      }

      generatorUtils.removeEmptyObjects(parameters);
      progress = cli.interaction.progress(util.format($('Updating backend http settings collection in "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.createOrUpdate(resourceGroup, gatewayName, applicationGateway, _);
      } finally {
        progress.end();
      }
      cli.interaction.formatOutput(applicationGateway.backendHttpSettingsCollection[index], generatorUtils.traverse);
    });

  backendHttpSettingsCollection.command('delete [resource-group] [gateway-name] [name]')
    .description($('Delete a backend http settings collection'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the backend http settings collection'))
    .option('--nowait', $('do not wait for the operation to complete. Returns as soon as the intial request is received by the server'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var index = utils.indexOfCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: name});
      if (index === -1) {
        throw new Error(util.format($('backend http settings collection "%s" not found in the gatewayName "%s"'), name, applicationGateway.name));
      }

      if (!options.quiet && !cli.interaction.confirm(util.format($('Delete backend http settings collection with name "%s" from "%s"? [y/n] '), name, gatewayName), _)) {
        return;
      }

      applicationGateway.backendHttpSettingsCollection.splice(index, 1);
      progress = cli.interaction.progress('Deleting backend http settings collection');
      try {
        applicationGateway = networkManagementClient.applicationGateways.createOrUpdate(resourceGroup, gatewayName, applicationGateway, _);
      } finally {
        progress.end();
      }
    });

  backendHttpSettingsCollection.command('show [resource-group] [gateway-name] [name]')
    .description($('Show a backend http settings collection'))
    .usage('[options] <resource-group> <gateway-name> <name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-n, --name <name>', $('the name of the backend http settings collection'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, name, options, _) {
      resourceGroup = cli.interaction.promptIfNotGiven($('resource group : '), resourceGroup, _);
      gatewayName = cli.interaction.promptIfNotGiven($('gateway name : '), gatewayName, _);
      name = cli.interaction.promptIfNotGiven($('name : '), name, _);

      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if (!applicationGateway) {
        throw new Error(util.format($('application gateway with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var backendHttpSettingsCollection = utils.findFirstCaseIgnore(applicationGateway.backendHttpSettingsCollection, {name: name});
      if(!backendHttpSettingsCollection) {
        cli.output.warn(util.format($('backend http settings collection with name "%s" not found in the gatewayName "%s"'), name, applicationGateway.name));
      }

      cli.interaction.formatOutput(backendHttpSettingsCollection, generatorUtils.traverse);
    });

  backendHttpSettingsCollection.command('list [resource-group] [gateway-name]')
    .description($('List backend http settings collection'))
    .usage('[options] <resource-group> <gateway-name>')
    .option('-g, --resource-group <resource-group>', $('the name of the resource group'))
    .option('-w, --gateway-name <gateway-name>', $('the gateway name'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function(resourceGroup, gatewayName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var networkManagementClient = utils.createNetworkManagementClient(subscription);

      var applicationGateway = null;
      var progress = cli.interaction.progress(util.format($('Looking up the application gateway "%s"'), gatewayName));
      try {
        applicationGateway = networkManagementClient.applicationGateways.get(resourceGroup, gatewayName, null, _);
      } catch (e) {
        if (e.statusCode === 404) {
          applicationGateway = null;
        } else {
          throw e;
        }
      } finally {
        progress.end();
      }

      if(!applicationGateway) {
        throw new Error(util.format($('application gateways with name "%s" not found in the resource group "%s"'), gatewayName, resourceGroup));
      }

      var items = applicationGateway.backendHttpSettingsCollection;
      cli.interaction.formatOutput(items, function(items) {
        if (items.length === 0) {
          cli.output.warn($('No backend http settings collection found'));
        } else {
          cli.output.table(items, function (row, item) {
            row.cell($('Name'), item.name);
            var resInfo = resourceUtils.getResourceInformation(item.id);
            row.cell($('Resource group'), resInfo.resourceGroup);
            row.cell($('Provisioning state'), item.provisioningState);
          });
        }
      });
    });
};
