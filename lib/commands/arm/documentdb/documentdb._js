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
    .description($('Commands to manage DocumentDB'));

    var databaseAccountCommands = documentdb.category('account')
    .description($('Commands to manage your database accounts'));
    
	databaseAccountCommands.command('create [resource-group] [name] [location]')
    .description($('Create a DocumentDB account'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-n, --name <name>', $('the name of the new account'))
    .option('-l, --location <location>', $('the location'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, location, options, _ ) {
        console.log('Not yet implemented (' + resourceGroup + ', ' + name + ', ' + location + ', ' + options + ')');
    });
    
    databaseAccountCommands.command('delete [resource-group] [name]')
    .description($('Delete a DocumentDB account'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-n, --name <name>', $('the name of the account to delete'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, name, options, _) {
    	console.log('Not yet implemented (' + resourceGroup + ', ' + name + ', '  + options + ')');
    });
    
    databaseAccountCommands.command('list [resource-group]')
    .description($('List your accounts'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
    	console.log('Not yet implemented (' + resourceGroup + ', ' + options + ')');
    });
    
    var databaseCommands = documentdb.category('database')
    .description($('Commands to manage your databases'));
    
	databaseCommands.command('create [resource-group] [account] [name]')
    .description($('Create a database'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the database account for the database'))
    .option('-n, --name <name>', $('the name of the new database'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, name, options, _) {
    	console.log('Not yet implemented (' + resourceGroup + ', ' + account + ', ' + name + ', ' +options + ')');
    });
    
    databaseCommands.command('delete [resource-group] [account] [name]')
    .description($('Delete a database'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the account for the database'))
    .option('-n, --name <name>', $('the name of the database to delete'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, name, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' +account + ', ' +name + ', ' +options + ')');
    });
    
    databaseCommands.command('list [resource-group] [account]')
    .description($('List your databases'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the account for the database'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' + account + ', ' +options + ')');
    });
    
    var collectionCommands = documentdb.category('collection')
    .description($('Commands to manage your database collections'));
    
    collectionCommands.command('create [resource-group] [account] [database] [name]')
    .description($('Create a collection'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the database account for the database'))
    .option('-d, --database <database>', $('the name of the database'))
    .option('-n, --name <name>', $('the name of the new database'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, database, name, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' +account + ', ' +database + ', ' +name + ', ' +options + ')');
    });
    
    collectionCommands.command('delete [resource-group] [account] [database] [name]')
    .description($('Delete a collection'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the account for the database'))
    .option('-d, --database <database>', $('the name of the database'))
    .option('-n, --name <name>', $('the name of the collection to delete'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, database, name, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' +account + ', ' +database + ', ' +name + ', ' +options + ')');
    });
    
    collectionCommands.command('list [resource-group] [account] [database]')
    .description($('List your collections'))
	.option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the account for the database'))
    .option('-d, --database <database>', $('the name of the database'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, database, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' +account + ', ' +database +options + ')');
    });

    var documentCommands = documentdb.category('document')
    .description($('Commands to manage your documents'));
    
    documentCommands.command('insert [resource-group] [account] [database] [collection] [json-file]')
    .description($('Create a collection'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the database account for the database'))
    .option('-d, --database <database>', $('the name of the database'))
    .option('-c, --collection <collection>', $('the name of the collection'))
    .option('-i, --id <id>', $('the id of the new document'))
    .option('-j, --json-file <filename>', $('the filename of the new document contents'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, database, collection, jsonFile, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' + account + ', ' + database + ', ' +collection + ', ' + id + ', ' + jsonFile + ', ' + options + ')');
    });
    
    documentCommands.command('delete [resource-group] [account] [database] [collection] [id]')
    .description($('Delete a collection'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the account for the database'))
    .option('-d, --database <database>', $('the name of the database'))
    .option('-c, --collection <collection>', $('the name of the collection'))
    .option('-i, --id <id>', $('the id of the document to delete'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, database, collection, id, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' + account + ', ' + database + ', ' + collection + ', ' + id + ', ' + options + ')');
    });
        
    documentCommands.command('list [resource-group] [account] [database] [collection]')
    .description($('List your documents'))
    .option('-g, --resource-group <resource-group>', $('the resource group name'))
    .option('-a, --account <account>', $('the name of the account for the database'))
    .option('-d, --database <database>', $('the name of the database'))
    .option('-c, --collection <collection>', $('the name of the collection'))
    .option('-s, --subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroup, account, database, collection, options, _) {
        console.log('Not yet implemented (' + resourceGroup + ', ' + account + ', ' + database + ', ' + collection + ', ' + options + ')');
    });
    
};


function displayASample(row, documentdb) {
  row.cell($('Name'), documentdb.properties.documentdbName);
  var documentdbDetails = documentdbUtils.getdocumentdbDetails(documentdb);
  row.cell($('Properties'), documentdbDetails.properties);
}
