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
* You can test rediscache commands get loaded by xplat by following steps:
* a. Copy the folder to '<repository root>\lib\commands\arm'
* b. Under <repository root>, run 'node bin/azure config mode arm'
* c. Run 'node bin/azure', you should see 'rediscache' listed as a command set
* d. Run 'node bin/azure', you should see 'create', "delete", etc 
      showing up in the help text 
*/

'use strict';


var util = require('util');

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');
var rediscacheUtils = require('./rediscacheUtils');
var resourceUtils = require('../resource/resourceUtils');

var $ = utils.getLocaleString;



var SKU_TYPE = ['Basic', 'Standard'];
var VM_SIZE = ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', '250MB', '1GB', '2.5GB', '6GB', '13GB', '26GB', '53GB'];
var KEY_TYPE = ['Primary', 'Secondary'];
var MAX_MEMORY_POLICY =['AllKeysLRU', 'AllKeysRandom', 'NoEviction', 'VolatileLRU', 'VolatileRandom', 'VolatileTTL'];
var DefaultRedisVersion = '3.0';

exports.init = function (cli) {
	var log = cli.output;
	var withProgress = cli.interaction.withProgress.bind(cli.interaction);
	var rediscache = cli.category('rediscache')
		.description($('Commands to manage your Azure rediscaches'));

		// Create Cache
	rediscache.command('create [name] [resource-group] [location]')
		.description($('create a redis cache'))
		.usage('[--name <name> --resource-group <resource-group> --location <location> [options]]')
		.option('-n, --name <name>', $('Name of redis cache.'))
		.option('-g, --resource-group <resource-group>', $('Name of resource group under which you want to create cache.'))
		.option('-l, --location <location>', $('Location to create cache.'))
		.option('-v, --vm-size <vm-size>', util.format($('Size of redis cache. Valid values: [%s]'), VM_SIZE.join(', ')))
		.option('-x, --sku <sku>', util.format($('Redis SKU. Should be one of :[%s]'), SKU_TYPE.join(', ')))
		.option('-m, --max-memory-policy <max-memory-policy>', util.format($('MaxMemoryPolicy property of redis cache. Valid values: [%s]'), MAX_MEMORY_POLICY.join(', ')))
		.option('-e, --enable-non-ssl-port <enable-non-ssl-port>', $('EnableNonSslPort property of redis cache'))
		.option('-s, --subscription <id>', $('the subscription identifier'))
		.execute(function (name, resourceGroup,location, options, _) {
			
	  ///////////////////////
      // Parse arguments.  //
      ///////////////////////
	  	  	  
	  log.verbose('arguments: ' + JSON.stringify({
        name: name,
        options: options
      }));
	  
	  options.name = options.name || name
	  options.resourceGroup = options.resourceGroup || resourceGroup
	  options.location = options.location || location
	  
	  	  	  	  
	  if (!options.name) {
        return cli.missingArgument('name');
      } else if(!options.resourceGroup) {
		return cli.missingArgument('resource-group');
	  } else if(!options.location) {
		return cli.missingArgument('location');
	  }
	  
	  	  	  
	  options.sku = rediscacheUtils.parseEnumArgument('sku', options.sku, SKU_TYPE, SKU_TYPE[1]);
      options.vmSize = rediscacheUtils.parseEnumArgument('vm-size', options.vmSize,VM_SIZE,VM_SIZE[1]);
	  options.maxMemoryPolicy = rediscacheUtils.parseEnumArgument('max-memory-policy', options.maxMemoryPolicy, MAX_MEMORY_POLICY, MAX_MEMORY_POLICY[0]);
	  options.enableNonSslPort = rediscacheUtils.parseBoolean('enable-non-ssl-port',options.enableNonSslPort,false);
	  options.vmSize = rediscacheUtils.getSizeRedisSpecific(options.vmSize);
	  
	  	  	  	  	  	  
	  var skuFamily = options.vmSize.substring(0, 1);
	  var skuCapacity = parseInt(options.vmSize.substring(1));
	  
	  	  	  
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription();
	  var client = utils.createRedisCacheManagementClient(subscription);
		
	  /////////////////////////////
      // Check if tenant exists. //
      /////////////////////////////
	  
	  var checkRedisCacheProgress = cli.interaction.progress(util.format($('')));
	  var redisCacheNameExists = null;
	  try {
		    var redisCacheNameExists = client.redis.get(options.resourceGroup, options.name, _).resource;
		} catch(e) {
				if(!e.code === 'ResourceNotFound' || !e.code === 'ResourceGroupNotFound') {
				throw e;
			}
		}
		finally {
        checkRedisCacheProgress.end();
      }
		 	 
	  if(redisCacheNameExists){
			throw new Error(util.format($('The requested cache name is unavailable: %s'), options.name));
			}
	  
	  ////////////////////////
      // Create the tenant. //
      ////////////////////////
	  var skuProperties = {
		  capacity : skuCapacity,
		  family : skuFamily,
		  name : options.sku
	  };
	  
	  var redisProperties = null;
	  if(!options.maxMemoryPolicy)
	  {
		  redisProperties = {
			  redisVersion : DefaultRedisVersion,
			  enableNonSslPort : options.enableNonSslPort,
			  sku : skuProperties
		  };
	  }
	  else
	  {
		options.maxMemoryPolicy = rediscacheUtils.parseEnumArgument('max-memory-policy', options.maxMemoryPolicy, MAX_MEMORY_POLICY, MAX_MEMORY_POLICY[0]);
	    options.maxMemoryPolicy = rediscacheUtils.getMaxMemoryPolicy(options.maxMemoryPolicy);
	    var redisConfig = {};
	    redisConfig['maxmemory-policy'] = options.maxMemoryPolicy;
		redisProperties = {
			  redisVersion : DefaultRedisVersion,
			  redisConfiguration : redisConfig,
			  enableNonSslPort : options.enableNonSslPort,
			  sku : skuProperties
		  };
	  }

	  var parameters = {
		  location:options.location,
		  properties : redisProperties
	  };
	  
	  var progress = cli.interaction.progress(util.format($('Attempting to create Redis Cache %s ...'), options.name));
      var result;
      try {
        result = client.redis.createOrUpdate(options.resourceGroup, options.name, parameters, _).resource;
      }
	  catch(e) {
			if(e.code === 'NameNotAvailable') {
				throw new Error(util.format($('The requested cache name is unavailable: %s'), options.name));
			}
			else
			{
				throw e;
			}		
	  }
	  finally {
        progress.end();
      }
	  
	  cli.interaction.formatOutput(result, function (data) {
        if (!data) {
          log.info($('No Redis Cache information available'));
        } else {
		  log.data('');
		  log.data($('Provisioning State :'), result.properties.provisioningState);
		  log.data('');
          log.data($('Cache Name         :'), result.name);
          log.data($('Resource Group     :'), options.resourceGroup);
          log.data($('Location           :'), result.location);
          log.data($('Host Name          :'), result.properties.hostName);
          log.data($('Port               :'), result.properties.port);
		  log.data($('SSL Port           :'), result.properties.sslPort);
		  log.data($('Non SSL Enabled    :'), result.properties.enableNonSslPort.toString());
		  log.data($('Redis Version      :'), result.properties.redisVersion);
		  log.data($('Max Memory Policy  :'), result.properties.redisConfiguration['maxmemory-policy']);
		  log.data($('Sku                :'), result.properties.sku.name);
		  log.data($('Size               :'), rediscacheUtils.getSizeUserSpecific(result.properties.sku.family, result.properties.sku.capacity.toString()));
		  log.data($('Id                 :'), result.id);
          log.data('');
        }
      });
	  
	  if(result.statusCode==200)
	  {
		log.info('Redis Cache ' + options.name + ' is getting created...');
	  }
	  
	});

//Delete Cache
  rediscache.command('delete [name] [resource-group]')
    .description($('Deletes and existing Redis Cache Tenant'))
	.usage('[--name <name> --resource-group] <resource-group> ')
    .option('-n, --name <name>', $('Name of redis cache.'))
	.option('-g, --resource-group <resource-group>', $('Name of resource group under which cache exists'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
		
	  ///////////////////////
      // Parse arguments.  //
      ///////////////////////
	  
	  log.verbose('arguments: ' + JSON.stringify({
        name: name,
        options: options
      }));
	  
	  options.name = options.name || name
	  options.resourceGroup = options.resourceGroup || resourceGroup
	  
	  if (!options.name) {
        return cli.missingArgument('name');
      } else if(!options.resourceGroup) {
		return cli.missingArgument('resource-group');
		}
	  
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription();
	  var client = utils.createRedisCacheManagementClient(subscription);
		
	  /////////////////////////////
      // Check if tenant exists. //
      /////////////////////////////

	  var SeeIfCacheExists = null;
	  try
	  {
		SeeIfCacheExists = client.redis.get(options.resourceGroup, options.name, _).resource;
	  }
	  catch(e)
	  {
		if(e.code === 'ResourceNotFound')
		{
			throw new Error(rediscacheUtils.showNotFoundError(options.resourceGroup, options.name));
		}
		else
		{
			throw e;
		}
	  }

	  ////////////////////
      // Delete Tenant. //
      ////////////////////
	  
	  var progress = cli.interaction.progress(util.format($('Deleting Redis Cache %s'), options.name));
	  var result;
      try {
        result = client.redis.deleteMethod(options.resourceGroup, options.name, _);
      } finally {
        progress.end();
      }
	  
	  
	  if(result.statusCode==200)
	  {
		log.info('Delete command successfully invoked for Redis Cache ' + options.name);
	  }
    });

//List Cache
  rediscache.command('list')
    .description($('Shows properties of an existing Redis Caches'))
	.usage('[--resource-group] <resource-group> ')
    .option('-g --resource-group <resource-group>', $('Name of resource group'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function ( options, _) {
	  
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createRedisCacheManagementClient(subscription);
	
	  ////////////////////////////
      // Get Tenant Properties. //
      ////////////////////////////

	  var operation = client.redis.list(options.resourceGroup, _).value

      var progress = cli.interaction.progress(util.format($('Getting Redis Cache(s) ')));
      var result;
      try {
        result = operation;
		for (var i = 0; i < result.length; ++i) {
          result[i].resourceGroup = resourceUtils.getResourceInformation(result[i].id).resourceGroup;
        }
      } finally {
        progress.end();
      }
    
	  
	  
	  if (result.length === 0) {
        log.info($('No redis caches found.'));
      } else {
        log.table(result, function(row, item) {
          row.cell($('Name'), item.name);
		  row.cell($('Resource Group'), item.resourceGroup);
          row.cell($('Location'), item.location);
		  row.cell($('Host Name'), item.properties.hostName);
		  row.cell($('Port'), item.properties.port);
		  row.cell($('ProvisioningState'), item.properties.provisioningState);
		  row.cell($('SSL Port'), item.properties.sslPort);
		  row.cell($('Non SSL Enabled'), item.properties.enableNonSslPort);
		  row.cell($('Redis Version'), item.properties.redisVersion);
		  row.cell($('Max Memory Policy'), item.properties.redisConfiguration['maxmemory-policy']);
		  row.cell($('Sku'), item.properties.sku.name);
		  row.cell($('Size'), rediscacheUtils.getSizeUserSpecific(item.properties.sku.family, item.properties.sku.capacity.toString()));
		  row.cell($('Id'), item.id);
        });
      }

	  log.info('Redis Cache Details');
    });

//Show Cache
  rediscache.command('show [name] [resource-group]')
    .description($('Shows properties of an existing Redis Cache'))
	.usage('[--name <name> --resource-group] <resource-group> ')
    .option('-n --name <name>', $('Name of redis cache.'))
    .option('-g --resource-group <resource-group>', $('Name of resource group'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
	  
	  log.verbose('arguments: ' + JSON.stringify({
        name: name,
        options: options
      }));
	  
	  options.name = options.name || name
	  options.resourceGroup = options.resourceGroup || resourceGroup
	  
	  if (!options.name) {
        return cli.missingArgument('name');
      } else if(!options.resourceGroup) {
		return cli.missingArgument('resource-group');
		}
		
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createRedisCacheManagementClient(subscription);
	
	  /////////////////////////////
      // Check if tenant exists. //
      /////////////////////////////
	  
	  var operation = null;
	  try
	  {
		operation = client.redis.get(options.resourceGroup, options.name, _).resource;
	  }
	  catch(e)
	  {
		if(e.code === 'ResourceNotFound')
		{
			throw new Error(rediscacheUtils.showNotFoundError(options.resourceGroup, options.name));
		}
		else
		{
			throw e;
		}
	  }

	  ////////////////////////////
      // Get Tenant Properties. //
      ////////////////////////////

      var progress = cli.interaction.progress(util.format($('Getting Redis Cache(s) ')));
      var result;
      try {
        result = operation;
		result.resourceGroup = resourceUtils.getResourceInformation(result.id).resourceGroup;
      } finally {
        progress.end();
      }
    
	  cli.interaction.formatOutput(result, function (data) {
        if (!data) {
          log.info($('No Redis Cache information available'));
        } else {
          log.data($('Cache Name         :'), result.name);
          log.data($('Resource Group     :'), result.resourceGroup);
          log.data($('Location           :'), result.location);
          log.data($('Host Name          :'), result.properties.hostName);
          log.data($('Port               :'), result.properties.port);
		  log.data($('Provisioning State :'), result.properties.provisioningState);
		  log.data($('SSL Port           :'), result.properties.sslPort);
		  log.data($('Non SSL Enabled    :'), result.properties.enableNonSslPort.toString());
		  log.data($('Redis Version      :'), result.properties.redisVersion);
		  log.data($('Max Memory Policy  :'), result.properties.redisConfiguration['maxmemory-policy']);
		  log.data($('Sku                :'), result.properties.sku.name);
		  log.data($('Size               :'), rediscacheUtils.getSizeUserSpecific(result.properties.sku.family, result.properties.sku.capacity.toString()));
		  log.data($('Id                 :'), result.id);
          log.data('');
        }
      });

	  log.info('Redis Cache Details');
    });
	
//Set Cache Policy
	rediscache.command('set [name] [resource-group] [max-memory-policy]')
    .description($('Shows properties of an existing Redis Cache'))
	.usage('[--name <name> --resource-group <resource-group> --max-memory-policy <max-memory-policy>]')
    .option('-n --name <name>', $('Name of redis cache.'))
    .option('-g --resource-group <resource-group>', $('Name of resource group'))
	.option('-m --max-memory-policy <max-memory-policy>', util.format($('Max Memory Policy of redis cache. Valid values: [%s]'), MAX_MEMORY_POLICY.join(', ')))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, maxMemoryPolicy, options, _) {
	  
	  log.verbose('arguments: ' + JSON.stringify({
        name: name,
        options: options
      }));
	  
	  options.name = options.name || name
	  options.resourceGroup = options.resourceGroup || resourceGroup
	  options.maxMemoryPolicy = options.maxMemoryPolicy || maxMemoryPolicy
	  
	  if (!options.name) {
        return cli.missingArgument('name');
      } else if(!options.resourceGroup) {
		return cli.missingArgument('resource-group');
	  } else if(!options.maxMemoryPolicy) {
		return cli.missingArgument('max-memory-policy');
	  }
	
	options.maxMemoryPolicy = rediscacheUtils.parseEnumArgument('max-memory-policy', options.maxMemoryPolicy, MAX_MEMORY_POLICY, MAX_MEMORY_POLICY[0]);
	options.maxMemoryPolicy = rediscacheUtils.getMaxMemoryPolicy(options.maxMemoryPolicy);
	
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createRedisCacheManagementClient(subscription);

	  ////////////////////////////
      // Get Tenant Properties. //
      ////////////////////////////

	  var progress = cli.interaction.progress(util.format($('Getting Redis Cache(s) ')));
	  var operation = null;
	  try
	  {
		operation = client.redis.get(options.resourceGroup, options.name, _).resource;
	  }
	  catch(e)
	  {
		if(e.code === 'ResourceNotFound')
		{
			throw new Error(rediscacheUtils.showNotFoundError(options.resourceGroup, options.name));
		}
		else
		{
			throw e;
		}
	  }

      var result;
      try {
        result = operation;
		result.resourceGroup = resourceUtils.getResourceInformation(result.id).resourceGroup;
      } finally {
        progress.end();
      }
    
	  var skuProperties = {
		  capacity : result.properties.sku.capacity,
		  family : result.properties.sku.family,
		  name : result.properties.sku.name
	  };
	  
	  var redisConfig = {};
	  redisConfig['maxmemory-policy'] = options.maxMemoryPolicy;
	  
	  var redisProperties = {
		  redisVersion : result.properties.redisVersion,
		  redisConfiguration : redisConfig,
		  enableNonSslPort : result.properties.enableNonSslPort,
		  sku : skuProperties
	  };
	  
	  var parameters = {
		  location:result.location,
		  properties : redisProperties
	  };
	  
	  var progress = cli.interaction.progress(util.format($('Updating Redis Cache %s ...'), options.name));
      var result;
      try {
        result = client.redis.createOrUpdate(options.resourceGroup, options.name, parameters, _).resource;
      } finally {
        progress.end();
      }
	  
	  cli.interaction.formatOutput(result, function (data) {
        if (!data) {
          log.info($('No Redis Cache information available'));
        } else {
		  log.data($('Provisioning State :'), result.properties.provisioningState);
		  log.data('');
          log.data($('Cache Name         :'), result.name);
          log.data($('Resource Group     :'), result.resourceGroup);
          log.data($('Location           :'), result.location);
          log.data($('Host Name          :'), result.properties.hostName);
          log.data($('Port               :'), result.properties.port);
		  log.data($('SSL Port           :'), result.properties.sslPort);
		  log.data($('Non SSL Enabled    :'), result.properties.enableNonSslPort.toString());
		  log.data($('Redis Version      :'), result.properties.redisVersion);
		  log.data($('Max Memory Policy  :'), result.properties.redisConfiguration['maxmemory-policy']);
		  log.data($('Sku                :'), result.properties.sku.name);
		  log.data($('Size               :'), rediscacheUtils.getSizeUserSpecific(result.properties.sku.family, result.properties.sku.capacity.toString()));
		  log.data($('Id                 :'), result.id);
          log.data('');
        }
      });
		
	  log.info('Redis Cache ' + options.name + ' is getting updated ');
    });


//Regenerate Cache Key
  rediscache.command('regenerate-key [name] [resource-group]')
    .description($('Regenerates Redis Cache Key'))
	.usage('[--name <name> --resource-group] <resource-group> ')
    .option('-n, --name <name>', $('Name of redis cache.'))
	.option('-g, --resource-group <resource-group>', $('Name of resource group under which cache exists'))
	.option('--key-type <key-type>', $('type of key to regenerate'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
		
	  ///////////////////////
      // Parse arguments.  //
      ///////////////////////
	  
	  log.verbose('arguments: ' + JSON.stringify({
        name: name,
        options: options
      }));
	  
	  options.name = options.name || name
	  options.resourceGroup = options.resourceGroup || resourceGroup
	  
	  if (!options.name) {
        return cli.missingArgument('name');
      } else if(!options.resourceGroup) {
		return cli.missingArgument('resource-group');
		}
		
	  options.keyType = rediscacheUtils.parseEnumArgument('key-type', options.keyType, KEY_TYPE, KEY_TYPE[0]);
	  
	  	  	  	  
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription();
	  var client = utils.createRedisCacheManagementClient(subscription);
	  
	  var parameters = {
		  keyType:options.keyType,
	  };
		
	  /////////////////////////////
      // Check if tenant exists. //
      /////////////////////////////

	  var SeeIfCacheExists = null;
	  try
	  {
		SeeIfCacheExists = client.redis.get(options.resourceGroup, options.name, _).resource;
	  }
	  catch(e)
	  {
		if(e.code === 'ResourceNotFound')
		{
			throw new Error(rediscacheUtils.showNotFoundError(options.resourceGroup, options.name));
		}
		else
		{
			throw e;
		}
	  }	

	  ////////////////////
      // Regenerate Key //
      ////////////////////

	  var progress = cli.interaction.progress(util.format($('Regenerating %s key for Redis Cache %s'), options.keyType.toString(), options.name));
      var result;
      try {
        result = client.redis.regenerateKey(options.resourceGroup, options.name, parameters, _);
      } finally {
        progress.end();
      }
	  
	  var finalKeys = null;
	  if(result.statusCode==200)
	  {
		finalKeys = client.redis.listKeys(options.resourceGroup, options.name, _);
		cli.interaction.formatOutput(finalKeys, function (data) {
        if (!data) {
          log.info($('No Redis Cache information available'));
        } else {
          log.data($('Primary Key   :'), finalKeys.primaryKey);
          log.data($('Secondary Key :'), finalKeys.secondaryKey);
          log.data('');
        }
      });
	  }
	  else
	  {
		log.error("Could not regenerate key for Redis Cache " + options.name);
	  }
	  
	  log.info(options.keyType + ' Key regenerated for Redis Cache ' + options.name);
    });
	
//Get Cache Key
  rediscache.command('show-key [name] [resource-group]')
    .description($('Regenerates Redis Cache Key'))
	.usage('[--name <name> --resource-group] <resource-group> ')
    .option('-n, --name <name>', $('Name of redis cache.'))
	.option('-g, --resource-group <resource-group>', $('Name of resource group under which cache exists'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
		
	  ///////////////////////
      // Parse arguments.  //
      ///////////////////////
	  
	  log.verbose('arguments: ' + JSON.stringify({
        name: name,
        options: options
      }));
	  
	  options.name = options.name || name
	  options.resourceGroup = options.resourceGroup || resourceGroup
	  
	  if (!options.name) {
        return cli.missingArgument('name');
      } else if(!options.resourceGroup) {
		return cli.missingArgument('resource-group');
		}
	  
	  	  	  
	  /////////////////////////
      // Create the client.  //
      /////////////////////////
	  
      var subscription = profile.current.getSubscription();
	  var client = utils.createRedisCacheManagementClient(subscription);
	  
	  var parameters = {
		  keyType:options.keyType,
	  };
		
	  /////////////////////////////
      // Check if tenant exists. //
      /////////////////////////////
	  
	  var SeeIfCacheExists = null;
	  try
	  {
		SeeIfCacheExists = client.redis.get(options.resourceGroup, options.name, _).resource;
	  }
	  catch(e)
	  {
		if(e.code === 'ResourceNotFound')
		{
			throw new Error(rediscacheUtils.showNotFoundError(options.resourceGroup, options.name));
		}
		else
		{
			throw e;
		}
	  }

	  ////////////////////
      // Get Cache Keys //
      ////////////////////
		
	  var progress = cli.interaction.progress(util.format($('Getting keys for Redis Cache %s ...'), options.name));
      var result;
      try {
        result = client.redis.listKeys(options.resourceGroup, options.name, _);
      } finally {
        progress.end();
      }
	  
	  cli.interaction.formatOutput(result, function (data) {
        if (!data) {
          log.info($('No Redis Cache information available'));
        } else {
          log.data($('Primary Key   :'), result.primaryKey);
          log.data($('Secondary Key :'), result.secondaryKey);
          log.data('');
        }
      });
	  
	  log.info(' Keys for Redis Cache ' + options.name);
    });
	
};


