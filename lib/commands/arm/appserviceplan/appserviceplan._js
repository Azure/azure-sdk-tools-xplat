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

/*
* You can test appserviceplan commands get loaded by xplat by following steps:
* a. Copy the folder to '<repository root>\lib\commands\arm'
* b. Under <repository root>, run 'node bin/azure config mode arm'
* c. Run 'node bin/azure', you should see 'appserviceplan' listed as a command set
* d. Run 'node bin/azure', you should see 'create', "delete", etc 
      showing up in the help text 
*/

'use strict';

var util = require('util');

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');
var appServicePlanUtils = require('./appserviceplanUtils');
var validation = require('../../../util/validation');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;

  var appserviceplan = cli.category('appserviceplan')
    .description($('Commands to manage your Azure App Service Plans'));
  
  appserviceplan.command('create [resource-group] [name] [location] [sku] [numberofworkers] [workersize]')
        .description($('Create an app service plan'))
        .option('--resource-group <resource-group>', $('the name of the resource group'))
        .option('--name <name>', $('the name of the app service plan to create'))
        .option('--location <location>', $('the geographic region to create the app service plan'))
        .option('--sku <sku>', $('the sku of the app service plan eg: Basic/Free/Shared/Premium'))
        .option('--numberofworkers <numberofworkers>', $('the number of workers to assign to the app service plan'))
        .option('--workersize <workersize>', $('the worker size of the app service plan eg: Large/Medium/Small'))
        .option('-s, --subscription <id>', $('the subscription identifier'))
        .execute(function (resourceGroup, name, location, sku, numberofworkers, workersize, options, _) {
          var subscription = profile.current.getSubscription(options.subscription);
          var client = appServicePlanUtils.createAppServicePlanManagementClient(subscription);
          if (!name) {
            return cli.missingArgument('name');
          }
          if (sku) {
            validation.isValidEnumValue(sku, [ 'Basic', 'Free', 'Shared', 'Premium' ]);
          }
          var progress = cli.interaction.progress(util.format($('Creating appserviceplan %s'), name));
          var webHostingPlanCreateOrUpdateParameters = { 
          webHostingPlan: { tags: {},
                            properties: { 
                                  sku: sku, 
                                  numberOfWorkers: numberofworkers, 
                                  workerSize: workersize 
                          },
                          name: name,
                          location: location 
                  },
          };

       //   console.log(">>>>>>>>>>>>>>>>Plan Parameters  ", util.inspect(webHostingPlanCreateOrUpdateParameters, { depth: null }));

          var result;
          try {
            result = client.webHostingPlans.createOrUpdate(resourceGroup, webHostingPlanCreateOrUpdateParameters, _);
          } finally {
            progress.end();
          }
          log.info('app service plan ' + name + ' has been created ');
        });

  appserviceplan.command('delete [resource-group] [name]')
    .description($('Delete an app service plan'))
    .option('--resource-group <resource-group>', $('the name of the resource group'))
    .option('--name <name>', $('the name of the app service plan to delete'))
    .option('-q, --quiet', $('quiet mode, do not ask for delete confirmation'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = appServicePlanUtils.createAppServicePlanManagementClient(subscription);
      if (!name) {
        return cli.missingArgument('name');
      }
      if (!options.quiet) {
        if (!options.slot) {
          if (!cli.interaction.confirm(util.format('Delete app service plan %s? [y/n] ', name), _)) {
            return;
          }
        } else if (!cli.interaction.confirm(util.format('Delete app service plan %s? [y/n] ', name), _)) {
          return;
        }
      }
      var progress = cli.interaction.progress(util.format($('Deleting app service plan %s'), name));
      var result;
      try {
        result = client.webHostingPlans.deleteMethod(resourceGroup, name,  _);
      } finally {
        progress.end();
      }
      log.info(util.format($('App service plan %s has been deleted'), name));
    });

  appserviceplan.command('list [resource-group]')
    .description($('List your app service plans'))
    .option('--resource-group <resource-group>', $('the name of the resource group'))
	  .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = appServicePlanUtils.createAppServicePlanManagementClient(subscription);
      var progress = cli.interaction.progress($('Listing app service plans'));
      var result;
      try {
        result = client.webHostingPlans.list(resourceGroup, _);
      } finally {
        progress.end();
      }
      cli.interaction.formatOutput(result.webHostingPlans, function (data) {
        if (data.length > 0) {
          log.table(data, function (row, item) {
            row.cell($('Name '), item.name);
            row.cell($('Location '), item.location);
            row.cell($('SKU '), item.properties.sku);
            row.cell($('Num Workers '), item.properties.numberOfWorkers);
            row.cell($('Size '), item.properties.workerSize);
          });
        } else {
          log.info(util.format($('No app service plans found.')));
        }
      });
    });

  appserviceplan.command('show [resource-group] [name]')
    .description($('Get an available app service plan'))
    .option('--resource-group <resource-group>', $('the name of the resource group'))
    .option('--name <name>', $('the name of the appserviceplan to show'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
      if (!name) {
        return cli.missingArgument('name');
      }
      var subscription = profile.current.getSubscription(options.subscription);
      var client = appServicePlanUtils.createAppServicePlanManagementClient(subscription);
      var progress = cli.interaction.progress($('Getting appserviceplan'));
      var result;
      try {
        result = client.webHostingPlans.get(resourceGroup,name,_);
      } finally {
        progress.end();
      }
//      console.log(">>>>>>>>>>>>>>>>number of workers isis  ", util.inspect(result, { depth: null }));
      //console.log(">>>>>>>>>>>>>>>>number of workers is  ", result.webHostingPlan.properties.numberOfWorkers)

      // NOT SURE WHY zero for size,num workers not printing..
      cli.interaction.formatOutput(result, function (data) {
        if (!data) {
          log.info($('No app service plan information available'));
        } else {
          log.data($('App service plan name  :'), data.webHostingPlan.name);
          log.data($('Location      :'), data.webHostingPlan.location);
          log.data($('SKU           :'), data.webHostingPlan.properties.sku);
          log.data($('Num Workers   :'), data.webHostingPlan.properties.numberOfWorkers);
          log.data($('Size          :'), data.webHostingPlan.properties.workerSize);
          log.data('');
        }
      });

    });
};
