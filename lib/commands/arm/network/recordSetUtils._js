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
var util = require('util');
var utils = require('../../../util/utils');
var resourceUtils = require('../resource/resourceUtils');

exports.covertToAzureFormat = function (recordSet) {
  var parameters = {
    name: recordSet.name,
    tTL: recordSet.ttl || recordSet.minimumTtl
  };
  switch (recordSet.type) {
    case constants.dnsZone.SOA :
      parameters.soaRecord = recordSet.records[0];

      // 'Host' is determined by Azure DNS.
      delete parameters.soaRecord.host;
      break;
    case constants.dnsZone.NS :
      parameters.nsRecords = recordSet.records;

      // Only TTL can be updated for NS record set with name '@'.
      if (parameters.name === '@') delete parameters.nsRecords;
      break;
    case constants.dnsZone.A :
      parameters.aRecords = recordSet.records;
      break;
    case constants.dnsZone.AAAA :
      parameters.aaaaRecords = recordSet.records;
      break;
    case constants.dnsZone.CNAME:
      parameters.cnameRecord = recordSet.records[0];
      break;
    case constants.dnsZone.MX :
      parameters.mxRecords = recordSet.records;
      break;
    case constants.dnsZone.PTR :
      parameters.ptrRecords = recordSet.records;
      break;
    case constants.dnsZone.SRV :
      parameters.srvRecords = recordSet.records;
      break;
    case constants.dnsZone.TXT :
      parameters.txtRecords = recordSet.records;
      break;
  }

  console.log('PARAMS %j', parameters);
  return parameters;
};

exports.getShortType = function (id) {
  var resourceInfo = resourceUtils.getResourceInformation(id);
  return resourceInfo.resourceType.split('/')[2];
};

exports.convertToListFormat = function (recordSets) {
  var printable = [];

  for (var i = 0; i < recordSets.length; i++) {
    var recordSet = recordSets[i];
    var items = [];

    if (!__.isEmpty(recordSet.soaRecord)) {
      var soaRecord = recordSet.soaRecord;
      items.push({
        name: recordSet.name,
        ttl: recordSet.ttl,
        type: exports.getShortType(recordSet.id),
        metadata: recordSet.metadata,
        record: 'host:    ' + soaRecord.host
      });
      items.push({record: 'email:   ' + soaRecord.email});
      items.push({record: 'serial number:  ' + soaRecord.serialNumber});
      items.push({record: 'refresh: ' + soaRecord.refreshTime});
      items.push({record: 'retry:   ' + soaRecord.retryTime});
      items.push({record: 'expire:  ' + soaRecord.expireTime});
      items.push({record: 'minimum: ' + soaRecord.minimumTtl});
    }
    if (!__.isEmpty(recordSet.cnameRecord)) {
      var cnameRecord = recordSet.cnameRecord;
      items.push({
        name: recordSet.name,
        ttl: recordSet.ttl,
        type: exports.getShortType(recordSet.id),
        metadata: recordSet.metadata,
        record: cnameRecord.cname
      });
    }
    if (!__.isEmpty(recordSet.aRecords)) {
      __.each(recordSet.aRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: rec.ipv4Address
          });
        } else {
          items.push({
            record: rec.ipv4Address
          });
        }
      });
    }
    if (!__.isEmpty(recordSet.aaaaRecords)) {
      __.each(recordSet.aaaaRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: rec.ipv6Address
          });
        } else {
          items.push({
            record: rec.ipv6Address
          });
        }
      });
    }
    if (!__.isEmpty(recordSet.nsRecords)) {
      __.each(recordSet.nsRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: rec.nsdname
          });
        } else {
          items.push({
            record: rec.nsdname
          });
        }
      });
    }
    if (!__.isEmpty(recordSet.srvRecords)) {
      __.each(recordSet.srvRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: util.format('%s %s %s %s', rec.priority, rec.weight, rec.port, rec.target)
          });
        } else {
          items.push({
            record: util.format('%s %s %s %s', rec.priority, rec.weight, rec.port, rec.target)
          });
        }
      });
    }
    if (!__.isEmpty(recordSet.MXRecords)) {
      __.each(recordSet.MXRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: util.format('%s %s', rec.preference, rec.exchange)
          });
        } else {
          items.push({
            record: util.format('%s %s', rec.preference, rec.exchange)
          });
        }
      });
    }
    if (!__.isEmpty(recordSet.ptrRecords)) {
      __.each(recordSet.ptrRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: rec.ptrdname
          });
        } else {
          items.push({
            record: rec.ptrdname
          });
        }
      });
    }
    if (!__.isEmpty(recordSet.txtRecords)) {
      var maxLength = 20;
      __.each(recordSet.txtRecords, function (rec, index) {
        if (index === 0) {
          items.push({
            name: recordSet.name,
            ttl: recordSet.ttl,
            type: exports.getShortType(recordSet.id),
            metadata: recordSet.metadata,
            record: rec.value.length > maxLength ? rec.value.substr(0, maxLength) + '...' : rec.value
          });
        } else {
          items.push({
            record: rec.value.length > maxLength ? rec.value.substr(0, maxLength) + '...' : rec.value
          });
        }
      });
    }

    // record set is empty
    if (items.length === 0) {
      items.push({
        name: recordSet.name,
        ttl: recordSet.ttl,
        type: exports.getShortType(recordSet.id),
        metadata: recordSet.metadata,
        record: ''
      });
    }

    printable = printable.concat(items);
  }

  return printable;
};

exports.getPropertyName = function (setType) {
  var map = {
    SOA: 'soaRecord',
    A: 'aRecords',
    AAAA: 'aaaaRecords',
    NS: 'nsRecords',
    MX: 'MXRecords',
    CNAME: 'cnameRecord',
    TXT: 'txtRecords',
    SRV: 'srvRecords',
    PTR: 'ptrRecords'
  };
  return map[setType];
};

exports.splitTxtRecord = function(text) {
  var maxLength = constants.dnsZone.txtStringMaxLength;
  var iterationCount = text.length / maxLength;
  var txtArray = [];
  for(var index = 0; index < iterationCount; index++) {
    txtArray.push(text.substr(index * maxLength, maxLength));
  }
  return txtArray;
};

/**
 * This method is used as workaround to delete extra xxxRecords from recordSet
 */
exports.removeEmptyRecords = function (recordSet) {
  if (!recordSet.properties) return;

  var fields = ['aRecords', 'aaaaRecords', 'nsRecords', 'MXRecords', 'srvRecords', 'txtRecords', 'soaRecord', 'ptrRecords'];

  for (var i = 0; i < fields.length; i++) {
    var propName = fields[i];
    if (__.isEmpty(recordSet.properties[propName])) {
      var type = propName.replace('Records', '');
      if (!utils.ignoreCaseEquals(type, exports.getShortType(recordSet.id))) {
        delete recordSet.properties[propName];
      }
    }
  }
};

exports.merge = function (rs1, rs2, type, options, output) {
  var self = this;
  if (options.debug) {
    console.log('\nExisting Record Set:  %j \n', rs2);
    console.log('\nNew Record Set:  %j \n', rs1);
  }

  switch (type) {
    case constants.dnsZone.SOA :
      mergeSOA(rs1, rs2);
      break;
    case constants.dnsZone.NS :
      mergeNS(rs1, rs2);
      break;
    case constants.dnsZone.CNAME :
      mergeCNAME(rs1, rs2, output);
      break;
    case constants.dnsZone.A :
      mergeA(rs1, rs2);
      break;
    case constants.dnsZone.AAAA :
      mergeAAAA(rs1, rs2);
      break;
    case constants.dnsZone.MX :
      mergeMX(rs1, rs2);
      break;
    case constants.dnsZone.TXT :
      mergeTXT(rs1, rs2);
      break;
    case constants.dnsZone.SRV :
      mergeSRV(rs1, rs2);
      break;
    case constants.dnsZone.PTR :
      mergePTR(rs1, rs2);
      break;
  }

  // to override existing set after merge
  rs2.ifNoneMatch = undefined;
  self.removeEmptyRecords(rs2.recordSet);

  if (options.debug) {
    console.log('\nAfter merge:  %j \n', rs2);
  }
  return rs2;
};

function mergeSOA(rs1, rs2) {
  var host = rs2.recordSet.properties.soaRecord.host;
  rs2.recordSet.properties.soaRecord = rs1.recordSet.properties.soaRecord;
  rs2.recordSet.properties.soaRecord.host = host;
  rs2.recordSet.properties.ttl = rs1.recordSet.properties.ttl;
}

function mergeNS(rs1, rs2) {
  if (rs2.recordSet.name === '@') {
    rs2.recordSet.properties.ttl = rs1.recordSet.properties.ttl;
  } else {
    var nsRecords = rs1.recordSet.properties.nsRecords;
    for (var i = 0; i < nsRecords.length; i++) {
      if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.nsRecords, {nsdname: nsRecords[i].nsdname})) {
        rs2.recordSet.properties.nsRecords.push(nsRecords[i]);
      }
    }
  }
}

function mergeCNAME(rs1, rs2, output) {
  output.warn(util.format('Can\'t merge record set "%s" of type CNAME with existing one, skipped', rs2.recordSet.name));
}

function mergeA(rs1, rs2) {
  var aRecords = rs1.recordSet.properties.aRecords;
  for (var i = 0; i < aRecords.length; i++) {
    if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.aRecords, {ipv4Address: aRecords[i].ipv4Address})) {
      rs2.recordSet.properties.aRecords.push(aRecords[i]);
    }
  }
}

function mergeAAAA(rs1, rs2) {
  var aaaaRecords = rs1.recordSet.properties.aaaaRecords;
  for (var i = 0; i < aaaaRecords.length; i++) {
    if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.aaaaRecords, {ipv6Address: aaaaRecords[i].ipv6Address})) {
      rs2.recordSet.properties.aaaaRecords.push(aaaaRecords[i]);
    }
  }
}

function mergeMX(rs1, rs2) {
  var mxRecords = rs1.recordSet.properties.MXRecords;
  for (var i = 0; i < MXRecords.length; i++) {
    if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.MXRecords, {exchange: MXRecords[i].exchange})) {
      rs2.recordSet.properties.MXRecords.push(MXRecords[i]);
    }
  }
}

function mergeTXT(rs1, rs2) {
  var txtRecords = rs1.recordSet.properties.txtRecords;
  for (var i = 0; i < txtRecords.length; i++) {
    if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.txtRecords, {value: txtRecords[i].value})) {
      rs2.recordSet.properties.txtRecords.push(txtRecords[i]);
    }
  }
}

function mergeSRV(rs1, rs2) {
  var srvRecords = rs1.recordSet.properties.srvRecords;
  for (var i = 0; i < srvRecords.length; i++) {
    if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.srvRecords, {target: srvRecords[i].target})) {
      rs2.recordSet.properties.srvRecords.push(srvRecords[i]);
    }
  }
}

function mergePTR(rs1, rs2) {
  var ptrRecords = rs1.recordSet.properties.ptrRecords;
  for (var i = 0; i < ptrRecords.length; i++) {
    if (!utils.findFirstCaseIgnore(rs2.recordSet.properties.ptrRecords, {ptrdname: ptrRecords[i].ptrdname})) {
      rs2.recordSet.properties.ptrRecords.push(ptrRecords[i]);
    }
  }
}