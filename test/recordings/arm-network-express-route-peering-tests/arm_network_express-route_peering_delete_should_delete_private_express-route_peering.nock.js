// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '2c224e7e-3ef5-431d-a57b-e71f4662e3a6',
    name: 'Node CLI Test',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: ['mobileservice', 'website'],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'eastus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering?api-version=2016-12-01')
  .reply(200, "{\r\n  \"name\": \"AzurePrivatePeering\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering\",\r\n  \"etag\": \"W/\\\"7b1d15c4-ca97-4ac8-9732-bb447f838ad5\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"peeringType\": \"AzurePrivatePeering\",\r\n    \"azureASN\": 12076,\r\n    \"peerASN\": 100,\r\n    \"primaryPeerAddressPrefix\": \"192.168.1.0/30\",\r\n    \"secondaryPeerAddressPrefix\": \"192.168.2.0/30\",\r\n    \"primaryAzurePort\": \"INX-LON04-06GMR-CIS-3-PRI-A\",\r\n    \"secondaryAzurePort\": \"INX-LON04-06GMR-CIS-4-SEC-A\",\r\n    \"state\": \"Enabled\",\r\n    \"vlanId\": 199,\r\n    \"gatewayManagerEtag\": \"\",\r\n    \"lastModifiedBy\": \"Customer\"\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '780',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'c77ed572-076b-488b-ac49-f8753453bb49',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14975',
  'x-ms-correlation-request-id': '94e9884a-431a-4656-9e9d-aaa0300f79b0',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130423Z:94e9884a-431a-4656-9e9d-aaa0300f79b0',
  date: 'Wed, 22 Feb 2017 13:04:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering?api-version=2016-12-01')
  .reply(200, "{\r\n  \"name\": \"AzurePrivatePeering\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering\",\r\n  \"etag\": \"W/\\\"7b1d15c4-ca97-4ac8-9732-bb447f838ad5\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"peeringType\": \"AzurePrivatePeering\",\r\n    \"azureASN\": 12076,\r\n    \"peerASN\": 100,\r\n    \"primaryPeerAddressPrefix\": \"192.168.1.0/30\",\r\n    \"secondaryPeerAddressPrefix\": \"192.168.2.0/30\",\r\n    \"primaryAzurePort\": \"INX-LON04-06GMR-CIS-3-PRI-A\",\r\n    \"secondaryAzurePort\": \"INX-LON04-06GMR-CIS-4-SEC-A\",\r\n    \"state\": \"Enabled\",\r\n    \"vlanId\": 199,\r\n    \"gatewayManagerEtag\": \"\",\r\n    \"lastModifiedBy\": \"Customer\"\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '780',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'c77ed572-076b-488b-ac49-f8753453bb49',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14975',
  'x-ms-correlation-request-id': '94e9884a-431a-4656-9e9d-aaa0300f79b0',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130423Z:94e9884a-431a-4656-9e9d-aaa0300f79b0',
  date: 'Wed, 22 Feb 2017 13:04:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering?api-version=2016-12-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01',
  'retry-after': '10',
  'x-ms-request-id': '3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-correlation-request-id': '99197256-2880-4877-b50c-0b8e94492efe',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130424Z:99197256-2880-4877-b50c-0b8e94492efe',
  date: 'Wed, 22 Feb 2017 13:04:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering?api-version=2016-12-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01',
  'retry-after': '10',
  'x-ms-request-id': '3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-correlation-request-id': '99197256-2880-4877-b50c-0b8e94492efe',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130424Z:99197256-2880-4877-b50c-0b8e94492efe',
  date: 'Wed, 22 Feb 2017 13:04:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': 'f58956c6-05c3-4171-b6dc-70387075008c',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14991',
  'x-ms-correlation-request-id': '59ae9ddf-a997-466a-89b9-da2fe5b3cc2e',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130454Z:59ae9ddf-a997-466a-89b9-da2fe5b3cc2e',
  date: 'Wed, 22 Feb 2017 13:04:54 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': 'f58956c6-05c3-4171-b6dc-70387075008c',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14991',
  'x-ms-correlation-request-id': '59ae9ddf-a997-466a-89b9-da2fe5b3cc2e',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130454Z:59ae9ddf-a997-466a-89b9-da2fe5b3cc2e',
  date: 'Wed, 22 Feb 2017 13:04:54 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '86f3e693-d774-4397-8130-501355a375cf',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14977',
  'x-ms-correlation-request-id': '1d717748-430e-49c9-a176-cb14849c4140',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130525Z:1d717748-430e-49c9-a176-cb14849c4140',
  date: 'Wed, 22 Feb 2017 13:05:24 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/3c1f4737-8d94-42c6-b0e1-c5dc49e4ed05?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '86f3e693-d774-4397-8130-501355a375cf',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14977',
  'x-ms-correlation-request-id': '1d717748-430e-49c9-a176-cb14849c4140',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130525Z:1d717748-430e-49c9-a176-cb14849c4140',
  date: 'Wed, 22 Feb 2017 13:05:24 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering?api-version=2016-12-01')
  .reply(404, "{\r\n  \"error\": {\r\n    \"code\": \"NotFound\",\r\n    \"message\": \"Resource /subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering not found.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '300',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '8b350f17-2b21-4fc2-a9d6-14fe371a8144',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14964',
  'x-ms-correlation-request-id': '762f3b19-c64c-4885-90f9-e7b7223f03d1',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130526Z:762f3b19-c64c-4885-90f9-e7b7223f03d1',
  date: 'Wed, 22 Feb 2017 13:05:26 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering?api-version=2016-12-01')
  .reply(404, "{\r\n  \"error\": {\r\n    \"code\": \"NotFound\",\r\n    \"message\": \"Resource /subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupERPeering/providers/Microsoft.Network/expressRouteCircuits/xplatExpressRouteCircuit/peerings/AzurePrivatePeering not found.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '300',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '8b350f17-2b21-4fc2-a9d6-14fe371a8144',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14964',
  'x-ms-correlation-request-id': '762f3b19-c64c-4885-90f9-e7b7223f03d1',
  'x-ms-routing-request-id': 'WESTEUROPE:20170222T130526Z:762f3b19-c64c-4885-90f9-e7b7223f03d1',
  date: 'Wed, 22 Feb 2017 13:05:26 GMT',
  connection: 'close' });
 return result; }]];