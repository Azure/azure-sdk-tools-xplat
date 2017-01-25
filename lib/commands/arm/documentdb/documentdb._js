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

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');

var documentdbUtils = require('./documentdbUtil');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;

  var documentdb = cli.category('documentdb')
    .description($('Commands to manage your DocumentDB Account'));

  documentdb.command('create [documentdbCollectionName]')
    .description($('Create a DocumentDB Collection'))
    .option('--documentdbCollectionName <documentdbCollectionName>', $('the name of the new documentdb collection'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (documentdbName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.getSampleClient(subscription);

      if (!documentdbCollectionName) {
        return cli.missingArgument('documentdbCollectionName');
      }

      var progress = cli.interaction.progress(util.format($('Creating DocumentDB Collection %s'), documentdbCollectionName));
      var result;
      try {
        result = client.documentdbs.create(documentdbCollectionName, _);
      } finally {
        progress.end();
      }

      var documentdbCollections = [];
      documentdbCollections.push(result.documentdb);
      cli.interaction.formatOutput(documentdbs, function (data) {
          if (data.length === 0) {
            log.info($('No documentdbs defined'));
          } else {
            log.table(data, displayASample);
          }
      });
    });

  documentdb.command('delete [documentdbName]')
    .description($('Delete a DocumentDB Collection'))
    .option('--documentdbCollectionName <documentdbCollectionName>', $('the name of the documentdb collection to delete'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (documentdbCollectionName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.getSampleClient(subscription);
      
      if (!documentdbName) {
        return cli.missingArgument('documentdbName');
      }

      var progress = cli.interaction.progress(util.format($('Deleting documentdb collection %s'), documentdbCollectionName));

      var result;
      try {
        result = client.documentdbs.delete(documentdbCollectionName, _);
      } finally {
        progress.end();
      }
    });

  documentdb.command('list')
    .description($('Get all available collections in the account'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.getSampleClient(subscription);
      var progress = cli.interaction.progress($('Listing documentdb collections'));
      var result;
      try {
        result = client.documentdbCollections.list(_);
      } finally {
        progress.end();
      }

      cli.interaction.formatOutput(result.documentdbCollections, function (data) {
        if (data.length === 0) {
          log.info($('No documentdb collections defined'));
        } else {
          log.table(data, displayASample);
        }
      });
    });
};


function displayASample(row, documentdb) {
  row.cell($('Name'), documentdb.properties.documentdbName);
  var documentdbDetails = documentdbUtils.getdocumentdbDetails(documentdb);
  row.cell($('Properties'), documentdbDetails.properties);
}
