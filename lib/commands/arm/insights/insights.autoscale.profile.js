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

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;
  var insightsAutoscaleProfileCommand = cli.category('insights').category('autoscale').category('profile')
    .description($('Manages autoscale profiles'));

  insightsAutoscaleProfileCommand.command('create <profileType> <profileName> <defaultCapacity> <maximumCapacity> <minimumCapacity> <rules>')
    .description($('Create or set an autoscale profile.'))
    .usage('<profileType> <profileName> <defaultCapacity> <maximumCapacity> <minimumCapacity> <rules> [options]')

    // Required
    .option('-y --profileType <profileType>', $('The type of the profile: NoSchedule, FixedDate, Recurrent (the value case insensitive)'))
    .option('-n --profileName <profileName>', $('The name of the profile.'))
    .option('-d --defaultCapacity <defaultCapacity>', $('The default capacity of the profile.'))
    .option('-a --maximumCapacity <maximumCapacity>', $('The maximum capacity of the profile.'))
    .option('-m --minimumCapacity <minimumCapacity>', $('The minimum capacity of the profile.'))
    .option('-l --rules <rules>', $('The rules of the profile. A json string containing a listing of scale rules.'))

    // Optional fixed date schedule
    .option('-b --startTimeWindow <startTimeWindow>', $('The start time window of a fixed date schedule.'))
    .option('-e --endTimeWindow <endTimeWindow>', $('The end time window of a fixed date schedule.'))
    .option('-z --timeWindowTimeZone <timeWindowTimeZone>', $('The time window timezone of a fixed date schedule.'))

    // Optional recurrent schedule
    .option('-f --recurrenceFrequency <recurrenceFrequency>', $('The recurrence frequency of a recurrent schedule: None, Second, Minute, Hour, Day, Week, Month, Year (the value is case insensitive)'))
    .option('-g --scheduleDays <scheduleDays>', $('The list of schedule days a recurrent schedule. Values are comma-separated.'))
    .option('-o --scheduleHours <scheduleHours>', $('The list of schedule hours a recurrent schedule. Values are comma-separated.'))
    .option('-u --scheduleMinutes <scheduleMinutes>', $('The list of schedule minutes a recurrent schedule. Values are comma-separated.'))
    .option('-x --scheduleTimeZone <scheduleTimeZone>', $('The list of schedule timezone a recurrent schedule.'))

    .execute(function(profileType, profileName, defaultCapacity, maximumCapacity, minimumCapacity, rules, options, _) {
      log.silly('Unused callback: ' + _);

      insightsAutoscaleProfileCommand._checkParameters(profileType, profileName, defaultCapacity, maximumCapacity, minimumCapacity, rules, options);
      insightsAutoscaleProfileCommand._executeSetCmd(options);
    });

  insightsAutoscaleProfileCommand._checkParameters = function (profileType, profileName, defaultCapacity, maximumCapacity, minimumCapacity, rules, options) {
    options.profileType = options.profileType || profileType;
    options.profileName = options.profileName || profileName;
    options.defaultCapacity = options.defaultCapacity || defaultCapacity;
    options.maximumCapacity = options.maximumCapacity || maximumCapacity;
    options.minimumCapacity = options.minimumCapacity || minimumCapacity;
    options.rules = options.rules || rules;

    if (!options.profileType) {
      return cli.missingArgument('profileType');
    } else {
      options.profileType = options.profileType.toLowerCase();
    }

    if (!options.profileName) {
      return cli.missingArgument('profileName');
    }

    if (!options.defaultCapacity) {
      return cli.missingArgument('defaultCapacity');
    }

    if (!options.maximumCapacity) {
      return cli.missingArgument('maximumCapacity');
    }

    if (!options.minimumCapacity) {
      return cli.missingArgument('minimumCapacity');
    }

    if (!options.rules) {
      return cli.missingArgument('rules');
    }

    // Check the values of profileType and the corresponding arguments      
    if (options.profileType === 'fixeddate') {
      if (!__.isString(options.startTimeWindow)) {
        return cli.missingArgument('startTimeWindow');
      }

      if (!__.isString(options.endTimeWindow)) {
        return cli.missingArgument('endTimeWindow');
      }

      if (!__.isString(options.timeWindowTimeZone)) {
        return cli.missingArgument('timeWindowTimeZone');
      }
    } else if (options.profileType === 'recurrent') {
      if (!__.isString(options.recurrenceFrequency)) {
        return cli.missingArgument('recurrenceFrequency');
      }

      // Checking the value of options.recurrenceFrequency
      var recurrenceFrequency = '|' + options.recurrenceFrequency.toLowerCase().replace('|', '') + '|';
      if ('|none|second|minute|hour|day|week|month|year|'.search(recurrenceFrequency) === -1) {
        throw new Error(util.format($('Invalid recurrence frequency: %s'), options.recurrenceFrequency));
      }

      if (!__.isString(options.scheduleDays)) {
        return cli.missingArgument('scheduleDays');
      }

      if (!__.isString(options.scheduleHours)) {
        return cli.missingArgument('scheduleHours');
      }

      if (!__.isString(options.scheduleMinutes)) {
        return cli.missingArgument('scheduleMinutes');
      }

      if (!__.isString(options.scheduleTimeZone)) {
        return cli.missingArgument('scheduleTimeZone');
      }
    } else if (options.profileType !== 'noschedule') {
      throw new Error(util.format($('Invalid profile type: %s'), profileType));
    }
  };

  insightsAutoscaleProfileCommand._processRules = function(rules) {
    var internalRules = JSON.parse(rules);

    // TODO: check that timeGrain, actionCooldown, and windowSize are durations in the right format.
    return internalRules;
  };

  insightsAutoscaleProfileCommand._executeSetCmd = function (options) {
    log.silly(util.format('Options: %s', util.inspect(options)));

    var fixedDate = null;
    var recurrence = null;

    if (options.profileType === 'recurrent') {
      recurrence = {
        frequency: options.recurrenceFrequency,
        schedule: {
          days: options.scheduleDays,
          hours: options.scheduleHours,
          minutes: options.scheduleMinutes,
          timeZone: options.scheduleTimeZone
        }
      };
    } else {
    // Object in fixedDate is TimeWindow 
      fixedDate = (options.profileType === 'fixeddate') ?
        {
          start: new Date(options.startTimeWindow),
          end: new Date(options.endTimeWindow),
          timeZone: options.timeWindowTimeZone
        } : 
        null;
    }

    var response = {
      name: options.profileName,
      capacity: {
        default: options.defaultCapacity,
        minimum: options.minimumCapacity,
        maximum: options.maximumCapacity
      },
      fixedDate: fixedDate,
      recurrence: recurrence,
      rules: this._processRules(options.rules)
    };

    if (options.json) {
      cli.output.json(response);
    } else {
      log.data(JSON.stringify(response).replace(/"/g, '\\"'));
    }
  };
};
