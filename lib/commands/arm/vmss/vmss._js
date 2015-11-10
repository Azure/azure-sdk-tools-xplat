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

var fs = require('fs');
var jsonpatch = require('json-patch');
var util = require('util');

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');

var $ = utils.getLocaleString;

function beautify(jsonText) {
    var obj = JSON.parse(jsonText);
    return JSON.stringify(obj, null, 2);
}

function getResourceId(subId, rgName, provider, type, name, subType, subName) {
  var format = '/subscriptions/%s/resourceGroups/%s/providers/%s/%s/%s';
  var resourceId = util.format(format, subId, rgName, provider, type, name);
  
  var subFormat = '/%s/%s';
  if (subType || subName) {
    resourceId += util.format(subFormat, subType, subName);
  }
  
  return resourceId;
}

function getContainerAndVhdUri(storageName, containerAndVhdName) {
  if (containerAndVhdName) {
    var format = 'https://%s.blob.core.windows.net/%s';
    var containerUri = util.format(format, storageName, containerAndVhdName);
    return containerUri;
  }
  else {
    return null;
  }
}

exports.init = function (cli) {
  var vmssQuickCreate = cli.category('vmss').description($('Commands to manage your virtual machine scale set.'));
  vmssQuickCreate.command('quick-create')
  .description($('quick-create method to manage your virtual machine scale set.'))
  .usage('[options]')
  .option('--resource-group-name <resource-group-name>', $('resource-group-name'))
  .option('--name <name>', $('name'))
  .option('--location <location>', $('location'))
  .option('--sku-capacity <sku-capacity>', $('sku-capacity'))
  .option('--sku-name <sku-name>', $('sku-name'))
  .option('--sku-tier <sku-tier>', $('sku-tier'))
  .option('--upgrade-policy-mode <upgrade-policy-mode>', $('upgrade-policy-mode'))
  .option('--network-interface-configuration-name <network-interface-configuration-name>', $('network-interface-configuration-name'))
  .option('--ip-configuration-name <ip-configuration-name>', $('ip-configuration-name'))
  .option('--virtual-network-name <virtual-network-name>', $('virtual-network-name'))
  .option('--ip-configuration-subnet <ip-configuration-subnet>', $('ip-configuration-subnet'))
  .option('--computer-name-prefix <computer-name-prefix>', $('computer-name-prefix'))
  .option('--admin-username <admin-username>', $('admin-username'))
  .option('--admin-password <admin-password>', $('admin-password'))
  .option('--image-reference-publisher <image-reference-publisher>', $('image-reference-publisher'))
  .option('--image-reference-sku <image-reference-sku>', $('image-reference-sku'))
  .option('--image-reference-offer <image-reference-offer>', $('image-reference-offer'))
  .option('--image-reference-version <image-reference-version>', $('image-reference-version'))
  .option('--os-disk-name <os-disk-name>', $('os-disk-name'))
  .option('--os-disk-caching <os-disk-caching>', $('os-disk-caching'))
  .option('--os-disk-create-option <os-disk-create-option>', $('os-disk-create-option'))
  .option('--os-disk-operating-system-type <os-disk-operating-system-type>', $('os-disk-operating-system-type'))
  .option('--storage-account-name <storage-account-name>', $('storage-account-name'))
  .option('--os-disk-source-image <os-disk-source-image>', $('os-disk-source-image'))
  .option('--virtual-hard-disk-container <virtual-hard-disk-container>', $('virtual-hard-disk-container'))
  .option('-s, --subscription <subscription>', $('the subscription identifier'))
  .execute(function(options, _) {
    var subscription = profile.current.getSubscription(options.subscription);
    cli.output.info('options = ' + JSON.stringify(options));
    cli.output.info('subscription = ' + JSON.stringify(subscription));
    var parametersObj = {
      name : options.name,
      location : options.location,
      sku : {
        capacity : options.skuCapacity,
        name : options.skuName,
        tier : options.skuTier
      },
      upgradePolicy : {
        mode : options.upgradePolicyMode
      },
      virtualMachineProfile : {
        networkProfile : {
          networkInterfaceConfigurations : [
            {
              name : options.networkInterfaceConfigurationName,
              primary : true,
              iPConfigurations : [
                {
                  name : options.ipConfigurationName,
                  subnet : {
                    referenceUri : getResourceId(subscription.id, options.resourceGroupName, 'Microsoft.Network', 'virtualNetworks', options.virtualNetworkName, 'subnets', options.ipConfigurationSubnet)
                  }
                }
              ]
            }
          ]
        },
        oSProfile : {
          computerNamePrefix : options.computerNamePrefix,
          adminPassword : options.adminPassword,
          adminUsername : options.adminUsername,
        },
        storageProfile : {
          imageReference : {
            offer : options.imageReferenceOffer,
            publisher : options.imageReferencePublisher,
            sku : options.imageReferenceSku,
            version : options.imageReferenceVersion
          },
          oSDisk : {
            caching : options.osDiskCaching,
            createOption : options.osDiskCreateOption,
            name : options.osDiskName,
            operatingSystemType : !options.osDiskOperatingSystemType ? null : options.osDiskOperatingSystemType,
            sourceImage : !options.osDiskSourceImage ? null : {
              uri : getContainerAndVhdUri(options.storageAccountName, options.osDiskSourceImage)
            },
            virtualHardDiskContainers : [
              getContainerAndVhdUri(options.storageAccountName, options.virtualHardDiskContainer)
            ]
          }
        }
      }
    };
    var computeManagementClient = utils.createComputeResourceProviderClient(subscription);
    var result = computeManagementClient.virtualMachineScaleSets.createOrUpdate(options.resourceGroupName, parametersObj, _);
    cli.output.json(result);
  });

};
