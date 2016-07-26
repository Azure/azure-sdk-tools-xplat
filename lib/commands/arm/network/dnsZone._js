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

var __ = require('underscore');
var constants = require('./constants');
var fs = require('fs');
var resourceUtils = require('../resource/resourceUtils');
var recordSetUtils = require('./recordSetUtils');
var tagUtils = require('../tag/tagUtils');
var ZoneFile = require('./zoneFile');
var util = require('util');
var utils = require('../../../util/utils');
var validation = require('../../../util/validation');
var $ = utils.getLocaleString;

function DnsZone(cli, dnsManagementClient) {
  this.dnsManagementClient = dnsManagementClient;
  this.zoneFile = new ZoneFile(cli.output);
  this.output = cli.output;
  this.interaction = cli.interaction;
}

__.extend(DnsZone.prototype, {

  /**
   * Zone methods
   */
  create: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');

    var zone = {
      properties: {},
      location: constants.dnsZone.defLocation
    };
    zone = self._parseZone(zone, options);
    var progress = self.interaction.progress(util.format($('Creating dns zone "%s"'), zoneName));
    try {
      // using ifNoneMatch: '*' force create zone if not exist
      zone = self.dnsManagementClient.zones.createOrUpdate(resourceGroupName, zoneName, zone, _);
    } finally {
      progress.end();
    }
    self._showZone(zone.zone,resourceGroupName, zoneName);
  },

  set: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');

    var zone = self.get(resourceGroupName, zoneName, _);
    if (!zone) {
      throw new Error(util.format($('A dns zone with name "%s" not found in the resource group "%s"'), zoneName, resourceGroupName));
    }

    zone = self._parseZone(zone, options);

    var progress = self.interaction.progress(util.format($('Updating dns zone "%s"'), zoneName));
    try {
      // using ifMatch: eTag to force update existing zone
      zone = self.dnsManagementClient.zones.createOrUpdate(resourceGroupName, zoneName, zone, _);
    } finally {
      progress.end();
    }

    self._showZone(zone.zone, resourceGroupName, zoneName);
  },

  list: function (resourceGroupName, params, _) {
    var self = this;
    var progress = self.interaction.progress($('Getting the dns zones'));

    var dnsZones = null;
    try {
      dnsZones = self.dnsManagementClient.zones.list(resourceGroupName, _);
      var nextLink = dnsZones.nextLink;
      while (nextLink !== undefined) {
        self.output.silly('Following nextLink');
        var nextZones = self.dnsManagementClient.zones.listNext(nextLink, _);
        dnsZones.zones = dnsZones.zones.concat(nextZones.zones);
        nextLink = nextZones.nextLink;
      }
    } finally {
      progress.end();
    }


    self.interaction.formatOutput(dnsZones.zones, function (zones) {
      if (zones.length === 0) {
        self.output.warn($('No dns zones found'));
      } else {
        self.output.table(zones, function (row, zone) {
          row.cell($('Name'), zone.name);
          var resInfo = resourceUtils.getResourceInformation(zone.id);
          row.cell($('Resource group'), resInfo.resourceGroup);
        });
      }
    });
  },

  show: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');

    var zone = self.get(resourceGroupName, zoneName, _);
    self._showZone(zone, resourceGroupName, zoneName);
  },

  clear: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');

    if (!options.quiet && !self.interaction.confirm(util.format($('Clear dns zone "%s"? [y/n] '), zoneName), _)) {
      return;
    }

    var recordSets = null;
    var progress = self.interaction.progress($('Looking up the DNS Record Sets'));
    try {
      recordSets = self.dnsManagementClient.recordSets.listAll(resourceGroupName, zoneName, options, _);
    } finally {
      progress.end();
    }

    for (var i = 0; i < recordSets.recordSets.length; i++) {
      var recordSet = recordSets.recordSets[i];
      var type = recordSetUtils.getShortType(recordSet.id);
      if (recordSet.name === '@' && (type === constants.dnsZone.SOA || type === constants.dnsZone.NS)) continue;

      options.type = type;
      self.deleteRecordSet(resourceGroupName, zoneName, recordSet.name, options, _);
    }
  },

  delete: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');

    self.output.warn(util.format($('Deleting dns zone "%s" you will delete all record sets'), zoneName));
    if (!options.quiet && !self.interaction.confirm(util.format($('Delete dns zone "%s"? [y/n] '), zoneName), _)) {
      return;
    }

    var progress = self.interaction.progress(util.format($('Deleting dns zone "%s"'), zoneName));
    var response;
    try {
      response = self.dnsManagementClient.zones.deleteMethod(resourceGroupName, zoneName, options, _);
    } finally {
      progress.end();
    }

    if (response.statusCode === 204) {
      throw new Error(util.format($('A dns zone with name "%s" not found in the resource group "%s"'), zoneName, resourceGroupName));
    }
  },

  get: function (resourceGroupName, zoneName, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');
    var progress = self.interaction.progress(util.format($('Looking up the dns zone "%s"'), zoneName));
    try {
      var dnsZone = self.dnsManagementClient.zones.get(resourceGroupName, zoneName, _);
      return dnsZone.zone;
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      throw e;
    } finally {
      progress.end();
    }
  },

  update: function (resourceGroupName, zoneName, dnsZone, _) {
    var self = this;
    zoneName = utils.trimTrailingChar(zoneName, '.');
    var progress = self.interaction.progress(util.format($('Updating dns zone "%s"'), zoneName));
    try {
      self.dnsManagementClient.zones.createOrUpdate(resourceGroupName, zoneName, {zone: dnsZone}, _);
    } catch (e) {
      throw e;
    } finally {
      progress.end();
    }
  },

  import: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = zoneName.toLowerCase();

    if (options.debug) console.time('Time elapsed');

    var text = fs.readFileSync(options.fileName, 'utf8');
    var zfile = self.zoneFile.parse(zoneName, text);

    if (options.parseOnly && self.output.format().json) {
      self.output.json(zfile);
    }
    if (options.parseOnly) return;

    var dnsZone = self.get(resourceGroupName, zoneName, _);
    if (!dnsZone) {
      self.create(resourceGroupName, zoneName, options, _);
    }

    var totalSetsCount = zfile.sets.length;
    var importedSetsCount = 0;

    for (var i = 0; i < zfile.sets.length; i++) {
      var recordSet = zfile.sets[i];
      importedSetsCount += self.importRecordSet(resourceGroupName, zoneName, recordSet, options, _);
      self.output.info(util.format($('%d record sets of %d imported'), importedSetsCount, totalSetsCount));
    }

    if (options.debug) console.timeEnd('Time elapsed');
  },

  export: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    zoneName = zoneName.toLowerCase();
    zoneName = utils.trimTrailingChar(zoneName, '.');

    if (fs.existsSync(options.fileName)) {
      if (!options.quiet && !self.interaction.confirm(util.format($('Overwrite file "%s"? [y/n] '), options.fileName), _)) {
        return;
      }
    }

    var dnsZone = self.get(resourceGroupName, zoneName, _);
    if (!dnsZone) {
      throw new Error(util.format($('DNS zone "%s" not found in resource group "%s"'), zoneName, resourceGroupName));
    }
    var recordSets = self.dnsManagementClient.recordSets.listAll(resourceGroupName, zoneName, options, _);

    var nextLink = recordSets.nextLink;
    while (nextLink !== undefined) {
      self.output.silly('Following nextLink');
      var nextRecordSets = self.dnsManagementClient.recordSets.listNext(nextLink, _);
      recordSets.recordSets = recordSets.recordSets.concat(nextRecordSets.recordSets);
      nextLink = nextRecordSets.nextLink;
    }

    var fileData = self.zoneFile.generate(resourceGroupName, zoneName, recordSets);

    var progress = self.interaction.progress(util.format($('Exporting dns zone "%s" from resource group "%s"'), zoneName, resourceGroupName));
    try {
      fs.writeFileSync(options.fileName, fileData);
    } finally {
      progress.end();
    }
  },

  /**
   * Record Set methods
   */
  importRecordSet: function (resourceGroupName, zoneName, recordSet, options, _) {
    var self = this;

    // note: PTR not supported on Azure, skip
    if (recordSet.type === constants.dnsZone.PTR) {
      self.output.info(util.format($('The record set "%s" of type "%s" is not supported yet, skipped'), recordSet.name, recordSet.type));
      return 1;
    }

    // converting record set FQDN name to relative name
    recordSet.name = self.zoneFile.covertFromFQDN(recordSet.name, zoneName);
    zoneName = utils.trimTrailingChar(zoneName, '.');

    // Note: these rules only apply to the SOA/NS records at the zone apex (record set FQDN = zone name).
    if (recordSet.name === '@') {
      switch (recordSet.type) {
        // For the SOA, all fields are taken from the zone file, EXCEPT the 'host' parameter, which must be preserved (i.e. zone file host is ignored).
        case constants.dnsZone.SOA:
          self.output.info($('The "host" of the SOA record is determined by the Azure DNS name server names - the value specified in the imported zone file is ignored'));
          break;
        // For the NS, only the TTL shall be taken from the zone file.  All other data must be preserved (i.e. zone file is ignored).
        case constants.dnsZone.NS:
          self.output.info($('The authoritative NS records at the zone apex are determined by the Azure DNS name server names - the values specified in the imported zone file are ignored'));
          break;
      }
    }

    // parsed record set format is not compatible with DNS api, converting to compatible format
    var parameters = recordSetUtils.covertToAzureFormat(recordSet);

    // force replace existing recordSet if required
    if (options.force) {
      parameters.ifNoneMatch = undefined;
    } else {
      parameters.ifNoneMatch = '*';
    }

    // Records in a record set may be out-of-sequence in the zone file, with records from different record sets in between.
    // These must be combined into a single record set.  This record set may then need to be merged with a pre-existing record set in Azure DNS.
    var progress = self.interaction.progress(util.format($('Importing record set "%s" of type "%s"'), recordSet.name, recordSet.type));
    var res = self.tryImportRecordSet(resourceGroupName, zoneName, recordSet.name, recordSet.type, parameters, _);
    if (res.statusCode === 412) {
      var existingSet = self.getRecordSet(resourceGroupName, zoneName, recordSet.name, recordSet.type, _);
      parameters = recordSetUtils.merge(parameters, existingSet, recordSet.type, options, self.output);
      self.tryImportRecordSet(resourceGroupName, zoneName, recordSet.name, recordSet.type, parameters, _);
    }
    progress.end();

    return 1;
  },

  tryImportRecordSet: function (resourceGroupName, zoneName, setName, setType, parameters, _) {
    var self = this;
    var res = {};
    try {
      if (setName === '@' && (setType === constants.dnsZone.SOA || setType === constants.dnsZone.NS)) {
        // '@' SOA and NS are special case, need to use PATCH method
        self.dnsManagementClient.recordSets.createOrUpdate(resourceGroupName, zoneName, setName, setType, parameters, _);
      } else {
        // all other types uses PUT method
        self.dnsManagementClient.recordSets.createOrUpdate(resourceGroupName, zoneName, setName, setType, parameters, _);
      }
      res.statusCode = 200;
    } catch (e) {
      res.statusCode = e.statusCode;
      if (e.statusCode !== 412) {
        self.output.warn(e.message);
      }
    }
    return res;
  },

  createRecordSet: function (resourceGroupName, zoneName, setName, options, _) {
    var self = this;

    var recordSet = self._initRecordSet(resourceGroupName, zoneName, setName, options, _);
    var progress = self.interaction.progress(util.format($('Creating DNS record set "%s" of type "%s"'), setName, options.type));
    try {
      recordSet = self.dnsManagementClient.recordSets.createOrUpdate(resourceGroupName, zoneName, setName, options.type, recordSet, _);
    } finally {
      progress.end();
    }
    self._showRecordSet(recordSet.recordSet);
  },

  setRecordSet: function (resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = utils.verifyParamExistsInCollection(constants.dnsZone.recordTypes, options.type, '--type');

    var zone = self.get(resourceGroupName, zoneName, _);
    if (!zone) {
      throw new Error(util.format($('A DNS zone with name "%s" not found in the resource group "%s"'), zoneName, resourceGroupName));
    }

    var recordSet = self.getRecordSet(resourceGroupName, zoneName, setName, options.type, _);
    if (!recordSet) {
      throw new Error(util.format($('A record set with name "%s" of type "%s" not found in the resource group "%s"'), setName, options.type, resourceGroupName));
    }

    self._parseRecordSet(recordSet, options, false);

    recordSet = self.updateRecordSet(resourceGroupName, zoneName, setName, options.type, recordSet, _);
    self._showRecordSet(recordSet.recordSet);
  },

  deleteRecordSet: function (resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = self._validateType(options.type);

    if (!options.quiet && !self.interaction.confirm(util.format($('Delete DNS record set "%s"? [y/n] '), setName), _)) {
      return;
    }

    var progress = self.interaction.progress(util.format($('Deleting DNS record set "%s" of type "%s"'), setName, options.type));
    try {
      self.dnsManagementClient.recordSets.deleteMethod(resourceGroupName, zoneName, setName, options.type, options, _);
    } finally {
      progress.end();
    }
  },

  listRecordSets: function (resourceGroupName, zoneName, options, _) {
    var self = this;
    var dnsRecords = null;

    var progress = self.interaction.progress($('Looking up the DNS Record Sets'));
    try {
      if (options.type) {
        options.type = self._validateType(options.type);
        dnsRecords = self.dnsManagementClient.recordSets.list(resourceGroupName, zoneName, options.type, options, _);
      } else {
        dnsRecords = self.dnsManagementClient.recordSets.listAll(resourceGroupName, zoneName, options, _);
      }
    } finally {
      progress.end();
    }

    var nextLink = dnsRecords.nextLink;
    while (nextLink !== undefined) {
      self.output.silly('Following nextLink');
      var nextRecordSets = self.dnsManagementClient.recordSets.listNext(nextLink, _);
      dnsRecords.recordSets = dnsRecords.recordSets.concat(nextRecordSets.recordSets);
      nextLink = nextRecordSets.nextLink;
    }

    self.interaction.formatOutput(dnsRecords.recordSets, function (outputData) {
      if (outputData.length === 0) {
        self.output.warn($('No DNS records sets found'));
      } else {
        var printable = recordSetUtils.convertToListFormat(outputData);

        self.output.table(printable, function (row, recordSet) {
          row.cell($('Name'), recordSet.name || '');
          row.cell($('TTL'), recordSet.ttl || '');
          row.cell($('Type'), recordSet.type || '');
          row.cell($('Records'), recordSet.record);
          row.cell($('Metadata'), tagUtils.getTagsInfo(recordSet.metadata) || '');
        });
      }
    });
  },

  getRecordSet: function (resourceGroupName, zoneName, setName, setType, _) {
    var self = this;

    var progress = self.interaction.progress(util.format($('Looking up the DNS Record Set "%s" of type "%s"'), setName, setType));
    try {
      var recordSet = self.dnsManagementClient.recordSets.get(resourceGroupName, zoneName, setName, setType, _);
      recordSetUtils.removeEmptyRecords(recordSet.recordSet);
      return recordSet;
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      throw e;
    } finally {
      progress.end();
    }
  },

  showRecordSet: function (resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = self._validateType(options.type);

    var recordSet = self.getRecordSet(resourceGroupName, zoneName, setName, options.type, _);
    if(recordSet === null) recordSet = {recordSet: null};
    self.interaction.formatOutput(recordSet.recordSet, function (recordSet) {
      if (recordSet === null) {
        self.output.warn(util.format($('A DNS record with name "%s" not found in the resource group "%s"'), setName, resourceGroupName));
      } else {
        self._showRecordSet(recordSet);
      }
    });
  },

  addRecord: function (resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = self._validateType(options.type);

    var dnsZone = self.get(resourceGroupName, zoneName, _);
    if (!dnsZone) {
      throw new Error(util.format($('A DNS zone with name "%s" not found in the resource group "%s"'), zoneName, resourceGroupName));
    }

    var recordSet = self.getRecordSet(resourceGroupName, zoneName, setName, options.type, _);
    if (!recordSet) {
      //throw new Error(util.format($('A record set with name "%s" of type "%s" not found in the resource group "%s"'), setName, options.type, resourceGroupName));
      recordSet = self._initRecordSet(resourceGroupName, zoneName, setName, options, _);
    }

    self._parseRecord(recordSet.recordSet, options, true);
    recordSet = self.updateRecordSet(resourceGroupName, zoneName, setName, options.type, recordSet, _);
    self._showRecordSet(recordSet.recordSet);
  },

  setSoaRecord: function(resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = 'SOA';
    var recordSet = self.getRecordSet(resourceGroupName, zoneName, setName, options.type, _);
    if (!recordSet) {
      throw new Error(util.format($('A record set with name "%s" of type "%s" not found in the resource group "%s"'), setName, options.type, resourceGroupName));
    }
    var host = recordSet.recordSet.properties.soaRecord.host;
    recordSet.recordSet.properties.soaRecord = {
      email: options.email,
      expireTime: options.expireTime,
      host: host,
      minimumTtl: options.minimumTtl,
      refreshTime: options.refreshTime,
      retryTime: options.retryTime,
      serialNumber: options.serialNumber
    };

    recordSet = self.updateRecordSet(resourceGroupName, zoneName, setName, options.type, recordSet, _);
    self._showRecordSet(recordSet.recordSet);
  },

  deleteRecord: function (resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = self._validateType(options.type);

    var dnsZone = self.get(resourceGroupName, zoneName, _);
    if (!dnsZone) {
      throw new Error(util.format($('A DNS zone with name "%s" not found in the resource group "%s"'), zoneName, resourceGroupName));
    }

    var recordSet = self.getRecordSet(resourceGroupName, zoneName, setName, options.type, _);
    if (!recordSet) {
      throw new Error(util.format($('A record set with name "%s" of type "%s" not found in the resource group "%s"'), setName, options.type, resourceGroupName));
    }

    self._parseRecord(recordSet.recordSet, options, false);

    if (!options.quiet && !self.interaction.confirm($('Delete DNS Record? [y/n] '), _)) {
      return;
    }

    if (options.type === constants.dnsZone.CNAME) {
      // CNAME record sets should be deleted in time of record deletion
      self.output.warn(util.format($('Record set of type "%s" will be deleted as well'), options.type));
      self.deleteRecordSet(resourceGroupName, zoneName, setName, options, _);
    } else {
      recordSet = self.updateRecordSet(resourceGroupName, zoneName, setName, options.type, recordSet, _);
      self._showRecordSet(recordSet.recordSet);
    }
  },

  updateRecordSet: function (resourceGroupName, zoneName, setName, setType, parameters, _) {
    var self = this;
    var progress = self.interaction.progress(util.format($('Updating record set "%s" of type "%s"'), setName, setType));
    try {
      var recordSet = self.dnsManagementClient.recordSets.createOrUpdate(resourceGroupName, zoneName, setName, setType, parameters, _);
      return recordSet;
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      throw e;
    } finally {
      progress.end();
    }
  },

  promptRecordParamsIfNotGiven: function (options, _) {
    var self = this;
    options.type = self._validateType(options.type);

    switch (options.type) {
      case constants.dnsZone.A:
        options.ipv4Address = self.interaction.promptIfNotGiven($('IPv4 address for A record: '), options.ipv4Address, _);
        break;
      case constants.dnsZone.AAAA:
        options.ipv6Address = self.interaction.promptIfNotGiven($('IPv6 address for AAAA record: '), options.ipv6Address, _);
        break;
      case constants.dnsZone.CNAME:
        options.cname = self.interaction.promptIfNotGiven($('Canonical name for CNAME record: '), options.cname, _);
        break;
      case constants.dnsZone.MX:
        options.preference = self.interaction.promptIfNotGiven($('Preference for MX record: '), options.preference, _);
        options.exchange = self.interaction.promptIfNotGiven($('Exchange for MX record: '), options.exchange, _);
        break;
      case constants.dnsZone.NS:
        options.nsdname = self.interaction.promptIfNotGiven($('Domain name for NS record: '), options.nsdname, _);
        break;
      case constants.dnsZone.SRV:
        options.priority = self.interaction.promptIfNotGiven($('Priority for SRV record: '), options.priority, _);
        options.weight = self.interaction.promptIfNotGiven($('Weight for SRV record: '), options.weight, _);
        options.port = self.interaction.promptIfNotGiven($('Port for SRV record: '), options.port, _);
        options.target = self.interaction.promptIfNotGiven($('Target for SRV record: '), options.target, _);
        break;
      case constants.dnsZone.TXT:
        options.text = self.interaction.promptIfNotGiven($('Text for TXT record type: '), options.text, _);
        break;
      case constants.dnsZone.PTR:
        options.ptrdName = self.interaction.promptIfNotGiven($('PTR domain name for PTR record: '), options.ptrdName, _);
        break;
      default:
        break;
    }
  },

  /**
   * Private methods.
   */

  _initRecordSet: function(resourceGroupName, zoneName, setName, options, _) {
    var self = this;
    options.type = utils.verifyParamExistsInCollection(constants.dnsZone.recordTypes, options.type, '--type');
    if (options.type === constants.dnsZone.SOA) {
      throw new Error(util.format($('Only one "%s" record is allowed in dns zone'), options.type));
    }

    var recordSet = {
      recordSet: {
        properties: {}
      }
    };
    var propName = recordSetUtils.getPropertyName(options.type);
    recordSet.recordSet.properties[propName] = [];

    self._parseRecordSet(recordSet, options, true);
    return recordSet;
  },

  _parseZone: function (zone, options) {
    if (options.tags) {
      if (utils.argHasValue(options.tags)) {
        tagUtils.appendTags(zone, options);
      } else {
        zone.tags = {};
      }
    }

    // additional wrap because it's required by sdk
    var parameters = {
      zone: zone
    };
    return parameters;
  },

  _parseRecordSet: function (recordSet, options, useDefaults) {
    var self = this;

    if (options.ttl) {
      var ttlAsInt = utils.parseInt(options.ttl);
      if (isNaN(ttlAsInt) || (ttlAsInt < 0)) {
        throw new Error($('--ttl value must be positive integer'));
      }
      recordSet.recordSet.properties.ttl = ttlAsInt;
    } else if (useDefaults) {
      var defTtl = constants.dnsZone.defTtl;
      self.output.warn(util.format($('using default TTL of %s seconds'), defTtl));
      recordSet.recordSet.properties.ttl = defTtl;
    }

    if (options.metadata) {
      if (utils.argHasValue(options.metadata)) {
        //tagUtils.appendTags(recordSet.recordSet.properties, options, 'metadata');
        options.metadata.split(';').forEach(function (chunk) {
          var fields = chunk.split('=');
          if (fields.length === 2) {
            var tagName = fields[0];
            var tagValue = fields[1];
            obj.tags[tagName] = tagValue;
          }
        });
        recordSet.recordSet.properties.metadata = options.metadata;
      } else {
        if(useDefaults) {
          recordSet.recordSet.properties.metadata = {};
        }
      }
    }
  },

  _parseRecord: function (recordSet, options, isAdding) {
    var self = this;
    var recordIndex;

    // A record
    if (options.ipv4Address) {
      if (options.type !== constants.dnsZone.A) {
        self.output.info(util.format($('--ipv4-address will be ignored for record of type "%s"'), options.type));
      } else {
        if (isAdding) {
          recordSet.properties.aRecords.push({ipv4Address: options.ipv4Address});
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.aRecords, {ipv4Address: options.ipv4Address});
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with IPv4 "%s" not found in the record set "%s"'), options.type, options.ipv4Address, recordSet.name));
          }
          recordSet.properties.aRecords.splice(recordIndex, 1);
        }
      }
    }

    // AAAA record
    if (options.ipv6Address) {
      if (options.type !== constants.dnsZone.AAAA) {
        self.output.info(util.format($('--ipv6-address will be ignored for record of type "%s"'), options.type));
      } else {
        if (isAdding) {
          recordSet.properties.aaaaRecords.push({ipv6Address: options.ipv6Address});
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.aaaaRecords, {ipv6Address: options.ipv6Address});
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with IPv6 "%s" not found in the record set "%s"'), options.type, options.ipv6Address, recordSet.name));
          }
          recordSet.properties.aaaaRecords.splice(recordIndex, 1);
        }
      }
    }

    // CNAME record
    if (options.cname) {
      if (options.type !== constants.dnsZone.CNAME) {
        self.output.info(util.format($('--cname will be ignored for record of type "%s"'), options.type));
      } else {
        if (isAdding) {
          options.cname = utils.trimTrailingChar(options.cname, '.');
          recordSet.properties.cnameRecord = {cname: options.cname};
        } else {
          if (recordSet.properties.cnameRecord.cname === options.cname) {
            delete recordSet.properties.cnameRecord;
          } else {
            throw new Error(util.format($('Record of type "%s" with cname "%s" not found in the record set "%s"'), options.type, options.cname, recordSet.name));
          }
        }
      }
    }

    // MX record
    if (options.preference || options.exchange) {
      if (options.type !== constants.dnsZone.MX) {
        self.output.info(util.format($('--preference,--exchange will be ignored for record of type "%s"'), options.type));
      } else {
        options.exchange = utils.trimTrailingChar(options.exchange, '.');
        options.preference =  parseInt(options.preference);
        if (isAdding) {
          recordSet.properties.mxRecords.push({preference: options.preference, exchange: options.exchange});
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.mxRecords, {preference: options.preference, exchange: options.exchange});
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with preference "%s" and exchange "%s" not found in the record set "%s"'), options.type, options.preference, options.exchange, recordSet.name));
          }
          recordSet.properties.mxRecords.splice(recordIndex, 1);
        }
      }
    }

    // NS record
    if (options.nsdname) {
      if (options.type !== constants.dnsZone.NS) {
        self.output.info(util.format($('--nsdname will be ignored for record of type "%s"'), options.type));
      } else {
        if (isAdding) {
          recordSet.properties.nsRecords.push({nsdname: options.nsdname});
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.nsRecords, {nsdname: options.nsdname});
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with nsdname "%s" not found in the record set "%s"'), options.type, options.nsdname, recordSet.name));
          }
          recordSet.properties.nsRecords.splice(recordIndex, 1);
        }
      }
    }

    // SOA records
    if (options.type.toUpperCase() !== constants.dnsZone.SOA) {
      if (options.email || options.expireTime || options.host || options.minimumTtl || options.refreshTime || options.retryTime) {
        self.output.info(util.format($('SOA parameters will be ignored due to type of this DNS record - "%s"'), options.type));
      }
    } else if (options.email || options.expireTime || options.host || options.minimumTtl || options.refreshTime || options.retryTime) {
      if (options.email && options.expireTime && options.host && options.minimumTtl && options.refreshTime && options.retryTime) {
        throw new Error($('You must specify all SOA parameters if even one is specified'));
      }

      if (isNaN(options.expireTime) || options.expireTime < 0) {
        throw new Error($('--expire-time parameter must be positive integer'));
      }

      if (isNaN(options.refreshTime) || options.refreshTime < 0) {
        throw new Error($('--refresh-time parameter must be positive integer'));
      }

      if (isNaN(options.retryTime) || options.retryTime < 0) {
        throw new Error($('--retry-time parameter must be positive integer'));
      }

      if (isNaN(options.minimumTtl) || options.minimumTtl < 255) {
        throw new Error($('--minimumTtl parameter must be in the range [0,255]'));
      }

      if (true) {
        recordSet.properties.soaRecord = {
          email: options.email,
          expireTime: options.expireTime,
          //host: options.host,
          minimumTtl: options.minumumTtl,
          refreshTime: options.refreshTime,
          retryTime: options.retryTime
        };
      } else {
        var soaRecord = ((recordSet.properties.soaRecord.email === options.email) && (recordSet.properties.soaRecord.expireTime === parseInt(options.expireTime)) && (recordSet.properties.soaRecord.host === options.host) &&
        (recordSet.properties.soaRecord.minimumTtl === parseInt(options.minimumTtl)) && (recordSet.properties.soaRecord.refreshTime === parseInt(options.refreshTime)) && (recordSet.properties.soaRecord.retryTime === parseInt(options.retryTime)));
        if (!soaRecord) {
          self.output.warn($('Record SOA not found in the record set with parameters specified.'));
        } else {
          delete recordSet.properties.soaRecord;
        }
      }
    }

    // SRV record
    if (options.priority || options.weight || options.port || options.target) {
      if (options.type !== constants.dnsZone.SRV) {
        self.output.info(util.format($('--priority,--weight,--port,--target will be ignored for record of type "%s"'), options.type));
      } else {
        options.target = utils.trimTrailingChar(options.target, '.');
        options.priority = parseInt(options.priority);
        options.weight = parseInt(options.weight);
        options.port = parseInt(options.port);
        if (isAdding) {
          recordSet.properties.srvRecords.push({
            priority: options.priority,
            weight: options.weight,
            port: options.port,
            target: options.target
          });
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.srvRecords, {
            priority: options.priority,
            weight: options.weight,
            port: options.port,
            target: options.target
          });
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with priority="%s",weight="%s",port="%s",target="%s" not found in the record set "%s"'),
              options.type, options.priority, options.weight, options.port, options.target, recordSet.name));
          }
          recordSet.properties.srvRecords.splice(recordIndex, 1);
        }
      }
    }

    // TXT record
    if (options.text) {
      if (options.type !== constants.dnsZone.TXT) {
        self.output.info(util.format($('--text will be ignored for record of type "%s"'), options.type));
      } else {
        if (isAdding) {
          recordSet.properties.txtRecords.push({value: self._splitTxtRecord(options.text) });
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.txtRecords, {value: [options.text]});
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with value "%s" not found in the record set "%s"'), options.type, options.text, recordSet.name));
          }
          recordSet.properties.txtRecords.splice(recordIndex, 1);
        }
      }
    }

    // PTR record
    if (options.ptrdName) {
      if (options.type !== constants.dnsZone.PTR) {
        self.output.info(util.format($('--ptrd-name will be ignored for record of type "%s"'), options.type));
      } else {
        if (isAdding) {
          options.ptrdName = utils.trimTrailingChar(options.ptrdName, '.');
          recordSet.properties.ptrRecords.push({ptrdname: options.ptrdName});
        } else {
          recordIndex = utils.indexOfCaseIgnore(recordSet.properties.ptrRecords, {ptrdname: options.ptrdName});
          if (recordIndex === -1) {
            throw new Error(util.format($('Record of type "%s" with pointer domain name "%s" not found in the record set "%s"'), options.type, options.ptrdName, recordSet.name));
          }
          recordSet.properties.ptrRecords.splice(recordIndex, 1);
        }
      }
    }
  },

  _splitTxtRecord: function(text) {
    var maxLength = constants.dnsZone.txtStringMaxLength;
    var iterationCount = text.length / maxLength;
    var txtArray = [];
    for(var index = 0; index < iterationCount; index++) {
      txtArray.push(text.substr(index * maxLength, maxLength));
    }
    return txtArray;
  },

  _showZone: function (zone, resourceGroupName, zoneName) {
    var self = this;

    self.interaction.formatOutput(zone, function (zone) {
      if (zone === null) {
        self.output.warn(util.format($('A dns zone with name "%s" not found in the resource group "%s"'), zoneName, resourceGroupName));
        return;
      }

      self.output.nameValue($('Id'), zone.id);
      self.output.nameValue($('Name'), zone.name);
      self.output.nameValue($('Type'), zone.type);
      self.output.nameValue($('Location'), zone.location);
      self.output.nameValue($('Number of record sets'), zone.properties.numberOfRecordSets);
      self.output.nameValue($('Max number of record sets'), zone.properties.maxNumberOfRecordSets);
      self.output.nameValue($('Tags'), tagUtils.getTagsInfo(zone.tags));
    });
  },

  _showRecordSet: function (recordSet) {
    var self = this;

    self.interaction.formatOutput(recordSet, function (recordSet) {
      self.output.nameValue($('Id'), recordSet.id);
      self.output.nameValue($('Name'), recordSet.name);
      self.output.nameValue($('Type'), recordSet.type);
      self.output.nameValue($('TTL'), recordSet.properties.ttl);
      self.output.nameValue($('Metadata'), tagUtils.getTagsInfo(recordSet.properties.metadata));
      if (!__.isEmpty(recordSet.properties.aRecords)) {
        self.output.header($('A records'));
        for (var aRecordNum in recordSet.properties.aRecords) {
          var aRecord = recordSet.properties.aRecords[aRecordNum];
          self.output.nameValue($('IPv4 address'), aRecord.ipv4Address, 4);
        }
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.aaaaRecords)) {
        self.output.header($('AAAA records'));
        for (var aaaaRecordNum in recordSet.properties.aaaaRecords) {
          var aaaaRecord = recordSet.properties.aaaaRecords[aaaaRecordNum];
          self.output.nameValue($('IPv6 address'), aaaaRecord.ipv6Address, 4);
        }
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.cnameRecord)) {
        self.output.header($('CNAME record'));
        self.output.nameValue($('CNAME'), recordSet.properties.cnameRecord.cname, 2);
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.mxRecords)) {
        self.output.header($('MX records'));
        for (var mxRecordNum in recordSet.properties.mxRecords) {
          var mxRecord = recordSet.properties.mxRecords[mxRecordNum];
          self.output.nameValue($('Preference'), mxRecord.preference, 4);
          self.output.nameValue($('Mail exchange'), mxRecord.exchange, 4);
        }
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.nsRecords)) {
        self.output.data($('NS records'));
        for (var nsRecordNum in recordSet.properties.nsRecords) {
          var nsRecord = recordSet.properties.nsRecords[nsRecordNum];
          self.output.nameValue($('Name server domain name'), nsRecord.nsdname, 4);
        }
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.srvRecords)) {
        self.output.header($('SRV records'));
        for (var srvRecordNum in recordSet.properties.srvRecords) {
          var srvRecord = recordSet.properties.srvRecords[srvRecordNum];
          self.output.nameValue($('Priority'), srvRecord.priority, 4);
          self.output.nameValue($('Weight'), srvRecord.weight, 4);
          self.output.nameValue($('Port'), srvRecord.port, 4);
          self.output.nameValue($('Target'), srvRecord.target, 4);
        }
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.txtRecords)) {
        self.output.header($('TXT records'));
        for (var txtRecordNum in recordSet.properties.txtRecords) {
          var txtRecord = recordSet.properties.txtRecords[txtRecordNum];
          self.output.nameValue($('Text'), txtRecord.value, 4);
        }
        self.output.data($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.soaRecord)) {
        var soaRecord = recordSet.properties.soaRecord;
        self.output.header($('SOA record'));
        self.output.nameValue($('Email'), soaRecord.email, 2);
        self.output.nameValue($('Expire time'), soaRecord.expireTime, 2);
        self.output.nameValue($('Host'), soaRecord.host, 2);
        self.output.nameValue($('Serial number'), soaRecord.serialNumber, 2);
        self.output.nameValue($('Minimum TTL'), soaRecord.minimumTtl, 2);
        self.output.nameValue($('Refresh time'), soaRecord.refreshTime, 2);
        self.output.nameValue($('Retry time'), soaRecord.retryTime, 2);
        self.output.nameValue($(''), '');
      }
      if (!__.isEmpty(recordSet.properties.ptrRecords)) {
        self.output.header($('PTR records'));
        for (var ptrRecordNum in recordSet.properties.ptrRecords) {
          var ptrRecord = recordSet.properties.ptrRecords[ptrRecordNum];
          self.output.nameValue($('PTR domain name'), ptrRecord.ptrdname, 4);
        }
        self.output.data($(''), '');
      }
    });
  },

  _validateType: function (type) {
    return utils.verifyParamExistsInCollection(constants.dnsZone.restrictedRecordTypes, type, '--type');
  }
});

module.exports = DnsZone;