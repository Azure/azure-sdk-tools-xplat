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
  var insightsAutoscaleSettingCommand = cli.category('insights').category('autoscale').category('setting')
    .description($('Manages autoscale settings'));

  insightsAutoscaleSettingCommand.command('list <resourceGroup>')
    .description($('List autoscale settings for a resource.'))
    .usage('<resourceGroup> [options]')
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))
    .option('-n --settingName <settingName>', $('The name of the setting.'))

    .option('-s --subscription <subscription>', $('The subscription identifier.'))
    .execute(function (resourceGroup, options, _) {
      options.resourceGroup = options.resourceGroup || resourceGroup;

      if (!__.isString(options.resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      var client = insightsUtils.createInsightsManagementClient(log, options);

      insightsAutoscaleSettingCommand._executeCmd(client, options, _);
    });

  insightsAutoscaleSettingCommand.command('delete <resourceGroup> <settingName>')
    .description($('Deletes an autoscale setting.'))
    .usage('<resourceGroup> <settingName> [options]')
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))
    .option('-n --settingName <settingName>', $('The name of the setting.'))
    .option('-s --subscription <subscription>', $('The subscription identifier.'))
    .execute(function (resourceGroup, settingName, options, _) {
      options.resourceGroup = options.resourceGroup || resourceGroup;
      options.settingName = options.settingName || settingName;

      if (!__.isString(options.resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      if (!__.isString(options.settingName)) {
        return cli.missingArgument('settingName');
      }

      var client = insightsUtils.createInsightsManagementClient(log, options);
      var progress = cli.interaction.progress(utils.format($('Deleting autoscale setting \"%s\"'), options.settingName));
      try {
        client.autoscaleSettings.deleteMethod(options.resourceGroup, options.settingName, options, _);
      } finally {
        progress.end();
      }

      insightsUtils.formatOutput(cli, log, options, null);
    });

  insightsAutoscaleSettingCommand.command('set <settingName> <location> <resourceGroup>')
    .description($('Create or set an autoscale setting.'))
    .usage('<settingName> <location> <resourceGroup> [options]')

    // Common optional
    .option('-x --disable', $('Flag to disable the setting.'))
    .option('-a --autoProfiles <autoProfiles>', $('A list of autoscale profiles in JSON format.'))

    // Common required
    .option('-g --resourceGroup <resourceGroup>', $('The resource group.'))

    // Required for creation
    .option('-n --settingName <settingName>', $('The name of the setting.'))
    .option('-l --location <location>', $('The location.'))
    .option('-i --targetResourceId <targetResourceId>', $('The resource Id.'))

    // Required for update
    .option('-p --settingSpec <settingSpec>', $('The setting spec in JSON format.'))
    .option('-w --notifications <notifications>', $('The list object autoscale notifications in escaped-jsson format.'))

    .option('-s --subscription <subscription>', $('The subscription identifier.'))

    .execute(function (settingName, location, resourceGroup, options, _) {
      options.settingName = options.settingName || settingName;
      options.location = options.location || location;
      options.resourceGroup = options.resourceGroup || resourceGroup;

      if (!__.isString(settingName)) {
        return cli.missingArgument('settingName');
      }

      if (!__.isString(location)) {
        return cli.missingArgument('location');
      }

      if (!__.isString(resourceGroup)) {
        return cli.missingArgument('resourceGroup');
      }

      log.silly(util.format('Options: %s', util.inspect(options)));

      var client = insightsUtils.createInsightsManagementClient(log, options);
      var parameters = this._createSdkCallParameters(options);
      log.silly(util.format('Parameters: %s', util.inspect(parameters)));

      insightsAutoscaleSettingCommand._executeSetCmd(client, parameters, options, _);
    });

  function processRule(rule) {
    if (rule.metricTrigger) {
      var trigger = rule.metricTrigger;
      trigger.timeGrain = insightsUtils.validateTimeSpan(trigger.timeGrain);
      if (trigger.timeWindow) {
        trigger.timeWindow = insightsUtils.validateTimeSpan(trigger.timeWindow);
      }
    } else {
      throw new Error($('Rule missing metricTrigger.'));
    }

    if (rule.scaleAction) {
      var scaleAction = rule.scaleAction;
      scaleAction.cooldown = insightsUtils.validateTimeSpan(scaleAction.cooldown);
    } else {
      throw new Error($('Rule missing scaleAction.'));
    }
  }

  function processProfile(profile) {
    var rules = profile.rules;
    if (__.isArray(rules)) {
      __.each(rules, processRule);
    } else {
      throw new Error($('Invalid rules parameters, array expected.'));
    }
  }

  insightsAutoscaleSettingCommand._processProfiles = function (autoProfiles) {
    var profilesArray = [];
    if (autoProfiles) {
      var profiles = JSON.parse(autoProfiles);
      if (__.isArray(profiles)) {
        for (var i = 0; i < profiles.length; i = i + 1) {
          processProfile(profiles[i]);

          log.silly(util.format('Processed profile #%s: %s', i, util.inspect(profiles[i])));
          profilesArray.push(profiles[i]);
        }
      } else {
        throw new Error($('Invalid profiles argument: array expected.'));
      }
    }

    return profilesArray;
  };

  insightsAutoscaleSettingCommand._processNotifications = function (notifications) {
    var notificationsArray = [];
    if (notifications) {
      var internalNotifications = JSON.parse(notifications);

      log.silly(util.format('Parsed notifications: %s', util.inspect(internalNotifications)));

      if (__.isArray(internalNotifications)) {
        for (var i = 0; i < internalNotifications.length; i = i + 1) {
          notificationsArray.push(internalNotifications[i]);
        }
      } else {
        throw new Error($('Invalid notifications argument: array expected.'));
      }
    }

    return notificationsArray;
  };

  insightsAutoscaleSettingCommand._createSdkCallParameters = function (options) {
    var enableSetting = !options.disable;
    var locationInternal = options.location;
    var nameInternal = options.settingName;
    var targetResourceIdInternal = options.targetResourceId;
    
    // Handle the input list of profiles.
    // The list must be in JSON format. Example: [{\"field1\":....}, {\"field2\": ...}] is an array of two objects
    var autoscaleProfilesInternal = this._processProfiles(options.autoProfiles);
    log.silly(util.format('Pre-processed profiles: %s', util.inspect(autoscaleProfilesInternal)));

    var notificationsInternal = this._processNotifications(options.notifications);
    log.silly(util.format('Pre-processed notifications: %s', util.inspect(notificationsInternal)));

    if (options.settingSpec) {
      // This is intended to be an update
      var settingSpec = JSON.parse(options.settingSpec);
      var property = settingSpec.properties;

      if (!property) {
        throw new Error($('Properties in settingSpec cannot be null.'));
      }

      locationInternal = settingSpec.location;
      nameInternal = settingSpec.name;

      // The semantics is if AutoscaleProfiles is given it will replace the existing Profiles
      autoscaleProfilesInternal = __.isArray(autoscaleProfilesInternal) ? autoscaleProfilesInternal : property.profiles;
      targetResourceIdInternal = property.targetResourceUri;

      enableSetting = !options.disable && property.enabled;
      for (var i = 0; property.notifications && i < property.notifications.length; i = i + 1) {
        notificationsInternal.push(property.notifications[i]);
      }
    }

    return {
      location: locationInternal,
      name: nameInternal,
      autoscaleSettingResourceName: nameInternal,
      enabled: enableSetting,
      profiles: autoscaleProfilesInternal,
      targetResourceUri: targetResourceIdInternal,
      notifications: notificationsInternal,
      tags: options.settingSpec ? options.settingSpec.tags : null
    };
  };

  insightsAutoscaleSettingCommand._executeCmd = function (client, options, _) {
    var progress = cli.interaction.progress($('Querying for autoscale settings'));
    var result = [];
    var response;
    try {
      if (__.isNull(options.settingName) || __.isUndefined(options.settingName) || (__.isString(options.settingName) && options.settingName === '')) {
        log.silly('Query by resourceGroup only');
        response = client.autoscaleSettings.listByResourceGroup(options.resourceGroup, options, _);

        log.silly(util.format('Response: %s', response));

        // TODO add the detailed output functionality (null parameter for the moment)
        __.each(response, function (element) { result.push(element); });
      } else {
        log.silly('Query by setting name');
        response = client.autoscaleSettings.get(options.resourceGroup, options.settingName, options, _);

        log.silly(util.format('Response: %s', response));

        // TODO add the detailed output functionality (null parameter for the moment)
        result.push(response);
      }
    } finally {
      progress.end();
    }  

    insightsUtils.formatOutputList(cli, log, options, result);
  };

  insightsAutoscaleSettingCommand._executeSetCmd = function (client, parameters, options, _) {
    var progress = cli.interaction.progress(util.format($('Create or set the autoscale setting \"%s\".'), options.settingName));
    var response = null;
    try {
      var responseTemp = client.autoscaleSettings.createOrUpdate(options.resourceGroup, options.settingName, parameters, options, _);

      response = {
        statusCode: 200,
        requestId: '',
        response: responseTemp
      };

    } finally {
      progress.end();
    }

    insightsUtils.formatOutput(cli, log, options, response);
  };
};
