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
    registeredProviders: [],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'westcentralus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName?api-version=2017-06-01')
  .reply(200, "{\r\n  \"name\": \"networkWatcherName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName\",\r\n  \"etag\": \"W/\\\"240f271a-8b0b-441c-b01b-7557b2f77b1d\\\"\",\r\n  \"type\": \"Microsoft.Network/networkWatchers\",\r\n  \"location\": \"westcentralus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"runningOperationIds\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '429',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"240f271a-8b0b-441c-b01b-7557b2f77b1d"',
  'x-ms-request-id': '55795fd4-2be2-4b44-9fbb-03f88d033d3f',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14990',
  'x-ms-correlation-request-id': 'a0beebc4-4643-4b2a-a55a-cc5fc35e9e6d',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T072845Z:a0beebc4-4643-4b2a-a55a-cc5fc35e9e6d',
  date: 'Fri, 14 Jul 2017 07:28:45 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName?api-version=2017-06-01')
  .reply(200, "{\r\n  \"name\": \"networkWatcherName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName\",\r\n  \"etag\": \"W/\\\"240f271a-8b0b-441c-b01b-7557b2f77b1d\\\"\",\r\n  \"type\": \"Microsoft.Network/networkWatchers\",\r\n  \"location\": \"westcentralus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"runningOperationIds\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '429',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"240f271a-8b0b-441c-b01b-7557b2f77b1d"',
  'x-ms-request-id': '55795fd4-2be2-4b44-9fbb-03f88d033d3f',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14990',
  'x-ms-correlation-request-id': 'a0beebc4-4643-4b2a-a55a-cc5fc35e9e6d',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T072845Z:a0beebc4-4643-4b2a-a55a-cc5fc35e9e6d',
  date: 'Fri, 14 Jul 2017 07:28:45 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName/troubleshoot?api-version=2017-06-01', '*')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-correlation-request-id': 'd3ea5d2c-26cd-4ebd-a876-f01804cd2e87',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T072907Z:d3ea5d2c-26cd-4ebd-a876-f01804cd2e87',
  date: 'Fri, 14 Jul 2017 07:29:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-watcher/providers/Microsoft.Network/networkWatchers/networkWatcherName/troubleshoot?api-version=2017-06-01', '*')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-correlation-request-id': 'd3ea5d2c-26cd-4ebd-a876-f01804cd2e87',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T072907Z:d3ea5d2c-26cd-4ebd-a876-f01804cd2e87',
  date: 'Fri, 14 Jul 2017 07:29:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '0c759e39-a09a-4d8d-917b-f9d9c0caeba4',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T072938Z:0c759e39-a09a-4d8d-917b-f9d9c0caeba4',
  date: 'Fri, 14 Jul 2017 07:29:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '0c759e39-a09a-4d8d-917b-f9d9c0caeba4',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T072938Z:0c759e39-a09a-4d8d-917b-f9d9c0caeba4',
  date: 'Fri, 14 Jul 2017 07:29:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '7dc4d592-eb6c-4eb5-8fc3-74929d8b5aea',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073009Z:7dc4d592-eb6c-4eb5-8fc3-74929d8b5aea',
  date: 'Fri, 14 Jul 2017 07:30:09 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '7dc4d592-eb6c-4eb5-8fc3-74929d8b5aea',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073009Z:7dc4d592-eb6c-4eb5-8fc3-74929d8b5aea',
  date: 'Fri, 14 Jul 2017 07:30:09 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '1918d638-fe4c-4059-b32e-3b977a7d9df5',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073040Z:1918d638-fe4c-4059-b32e-3b977a7d9df5',
  date: 'Fri, 14 Jul 2017 07:30:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '1918d638-fe4c-4059-b32e-3b977a7d9df5',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073040Z:1918d638-fe4c-4059-b32e-3b977a7d9df5',
  date: 'Fri, 14 Jul 2017 07:30:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '0fb06198-1dbe-4219-a4a5-0148c22c2a23',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073111Z:0fb06198-1dbe-4219-a4a5-0148c22c2a23',
  date: 'Fri, 14 Jul 2017 07:31:10 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'retry-after': '10',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '0fb06198-1dbe-4219-a4a5-0148c22c2a23',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073111Z:0fb06198-1dbe-4219-a4a5-0148c22c2a23',
  date: 'Fri, 14 Jul 2017 07:31:10 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(200, "{\r\n  \"startTime\": \"2017-07-14T07:28:45.858122Z\",\r\n  \"endTime\": \"2017-07-14T07:28:53.672Z\",\r\n  \"code\": \"UnHealthy\",\r\n  \"results\": [\r\n    {\r\n      \"id\": \"NoConnectionsFoundForGateway\",\r\n      \"summary\": \"No connections have been created on the gateway\",\r\n      \"detail\": \"A cross-premises or VNet-to-VNet connection needs to be created on the gateway.\",\r\n      \"recommendedActions\": [\r\n        {\r\n          \"actionText\": \"Create a cross premises connection\",\r\n          \"actionUri\": \"https://azure.microsoft.com/en-us/documentation/articles/vpn-gateway-howto-site-to-site-resource-manager-portal/\",\r\n          \"actionUriText\": \"cross premises\"\r\n        },\r\n        {\r\n          \"actionText\": \"Create a VNet-to-VNet connection\",\r\n          \"actionUri\": \"https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-vnet-vnet-resource-manager-portal\",\r\n          \"actionUriText\": \"VNet-to-VNet\"\r\n        },\r\n        {\r\n          \"actionText\": \"If you are experiencing problems you believe are caused by Azure, contact support\",\r\n          \"actionUri\": \"http://azure.microsoft.com/support\",\r\n          \"actionUriText\": \"contact support\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1174',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14996',
  'x-ms-correlation-request-id': '0ce38337-ea97-47ab-b186-401ab87f48f9',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073142Z:0ce38337-ea97-47ab-b186-401ab87f48f9',
  date: 'Fri, 14 Jul 2017 07:31:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01')
  .reply(200, "{\r\n  \"startTime\": \"2017-07-14T07:28:45.858122Z\",\r\n  \"endTime\": \"2017-07-14T07:28:53.672Z\",\r\n  \"code\": \"UnHealthy\",\r\n  \"results\": [\r\n    {\r\n      \"id\": \"NoConnectionsFoundForGateway\",\r\n      \"summary\": \"No connections have been created on the gateway\",\r\n      \"detail\": \"A cross-premises or VNet-to-VNet connection needs to be created on the gateway.\",\r\n      \"recommendedActions\": [\r\n        {\r\n          \"actionText\": \"Create a cross premises connection\",\r\n          \"actionUri\": \"https://azure.microsoft.com/en-us/documentation/articles/vpn-gateway-howto-site-to-site-resource-manager-portal/\",\r\n          \"actionUriText\": \"cross premises\"\r\n        },\r\n        {\r\n          \"actionText\": \"Create a VNet-to-VNet connection\",\r\n          \"actionUri\": \"https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-howto-vnet-vnet-resource-manager-portal\",\r\n          \"actionUriText\": \"VNet-to-VNet\"\r\n        },\r\n        {\r\n          \"actionText\": \"If you are experiencing problems you believe are caused by Azure, contact support\",\r\n          \"actionUri\": \"http://azure.microsoft.com/support\",\r\n          \"actionUriText\": \"contact support\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1174',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/westcentralus/operationResults/46acd854-d94b-45c6-a122-c29767f6d322?api-version=2017-06-01',
  'x-ms-request-id': '46acd854-d94b-45c6-a122-c29767f6d322',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14996',
  'x-ms-correlation-request-id': '0ce38337-ea97-47ab-b186-401ab87f48f9',
  'x-ms-routing-request-id': 'WESTEUROPE:20170714T073142Z:0ce38337-ea97-47ab-b186-401ab87f48f9',
  date: 'Fri, 14 Jul 2017 07:31:42 GMT',
  connection: 'close' });
 return result; }]];