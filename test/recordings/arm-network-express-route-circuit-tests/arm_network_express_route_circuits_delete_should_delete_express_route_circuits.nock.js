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
  process.env['AZURE_VM_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName?api-version=2016-12-01')
  .reply(200, "{\r\n  \"name\": \"expressRouteCircuitName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName\",\r\n  \"etag\": \"W/\\\"07ae2dc8-e11d-455b-8056-3f5e58c23c09\\\"\",\r\n  \"type\": \"Microsoft.Network/expressRouteCircuits\",\r\n  \"location\": \"brazilsouth\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"53c05bd4-ec0a-40f6-81d5-8ce82812615e\",\r\n    \"peerings\": [],\r\n    \"authorizations\": [],\r\n    \"serviceProviderProperties\": {\r\n      \"serviceProviderName\": \"Interxion\",\r\n      \"peeringLocation\": \"London\",\r\n      \"bandwidthInMbps\": 200\r\n    },\r\n    \"circuitProvisioningState\": \"Enabled\",\r\n    \"allowClassicOperations\": false,\r\n    \"gatewayManagerEtag\": \"\",\r\n    \"serviceKey\": \"916d760e-a61b-4e72-aea7-e58b3884339f\",\r\n    \"serviceProviderProvisioningState\": \"NotProvisioned\"\r\n  },\r\n  \"sku\": {\r\n    \"name\": \"Standard_MeteredData\",\r\n    \"tier\": \"Premium\",\r\n    \"family\": \"UnlimitedData\"\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1018',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'da96e9fc-b32d-4401-8902-b0378f87a258',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14997',
  'x-ms-correlation-request-id': '0f94e959-5770-44f6-96a0-f14cfad6522f',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095318Z:0f94e959-5770-44f6-96a0-f14cfad6522f',
  date: 'Mon, 13 Mar 2017 09:53:17 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName?api-version=2016-12-01')
  .reply(200, "{\r\n  \"name\": \"expressRouteCircuitName\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName\",\r\n  \"etag\": \"W/\\\"07ae2dc8-e11d-455b-8056-3f5e58c23c09\\\"\",\r\n  \"type\": \"Microsoft.Network/expressRouteCircuits\",\r\n  \"location\": \"brazilsouth\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"53c05bd4-ec0a-40f6-81d5-8ce82812615e\",\r\n    \"peerings\": [],\r\n    \"authorizations\": [],\r\n    \"serviceProviderProperties\": {\r\n      \"serviceProviderName\": \"Interxion\",\r\n      \"peeringLocation\": \"London\",\r\n      \"bandwidthInMbps\": 200\r\n    },\r\n    \"circuitProvisioningState\": \"Enabled\",\r\n    \"allowClassicOperations\": false,\r\n    \"gatewayManagerEtag\": \"\",\r\n    \"serviceKey\": \"916d760e-a61b-4e72-aea7-e58b3884339f\",\r\n    \"serviceProviderProvisioningState\": \"NotProvisioned\"\r\n  },\r\n  \"sku\": {\r\n    \"name\": \"Standard_MeteredData\",\r\n    \"tier\": \"Premium\",\r\n    \"family\": \"UnlimitedData\"\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1018',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'da96e9fc-b32d-4401-8902-b0378f87a258',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14997',
  'x-ms-correlation-request-id': '0f94e959-5770-44f6-96a0-f14cfad6522f',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095318Z:0f94e959-5770-44f6-96a0-f14cfad6522f',
  date: 'Mon, 13 Mar 2017 09:53:17 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName?api-version=2016-12-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operationResults/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01',
  'retry-after': '10',
  'x-ms-request-id': '978e37a7-8c9e-404b-b701-468ca2f3b7a5',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '326be512-44f3-45db-a2df-5ed43606d913',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095320Z:326be512-44f3-45db-a2df-5ed43606d913',
  date: 'Mon, 13 Mar 2017 09:53:20 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName?api-version=2016-12-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operationResults/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01',
  'retry-after': '10',
  'x-ms-request-id': '978e37a7-8c9e-404b-b701-468ca2f3b7a5',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '326be512-44f3-45db-a2df-5ed43606d913',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095320Z:326be512-44f3-45db-a2df-5ed43606d913',
  date: 'Mon, 13 Mar 2017 09:53:20 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': 'e2a726d5-d779-4ea4-a883-46ff174adb5e',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '13c28e34-06b7-463d-9b0d-5599093b659b',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095351Z:13c28e34-06b7-463d-9b0d-5599093b659b',
  date: 'Mon, 13 Mar 2017 09:53:51 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': 'e2a726d5-d779-4ea4-a883-46ff174adb5e',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '13c28e34-06b7-463d-9b0d-5599093b659b',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095351Z:13c28e34-06b7-463d-9b0d-5599093b659b',
  date: 'Mon, 13 Mar 2017 09:53:51 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': 'b2346eca-53a3-4df4-9b28-fc18c1c8409d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-correlation-request-id': '39159442-ce2c-46c5-b4d9-65eab99c7269',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095423Z:39159442-ce2c-46c5-b4d9-65eab99c7269',
  date: 'Mon, 13 Mar 2017 09:54:22 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': 'b2346eca-53a3-4df4-9b28-fc18c1c8409d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-correlation-request-id': '39159442-ce2c-46c5-b4d9-65eab99c7269',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095423Z:39159442-ce2c-46c5-b4d9-65eab99c7269',
  date: 'Mon, 13 Mar 2017 09:54:22 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '05eba935-ac00-4ac9-a9f7-a158b033a6a3',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '5c2507b4-9f95-40dd-95b3-69d9c66e6553',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095454Z:5c2507b4-9f95-40dd-95b3-69d9c66e6553',
  date: 'Mon, 13 Mar 2017 09:54:53 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"InProgress\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '30',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '05eba935-ac00-4ac9-a9f7-a158b033a6a3',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '5c2507b4-9f95-40dd-95b3-69d9c66e6553',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095454Z:5c2507b4-9f95-40dd-95b3-69d9c66e6553',
  date: 'Mon, 13 Mar 2017 09:54:53 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '19f8b232-02c5-43fe-8220-75dc33bab80c',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-correlation-request-id': 'c8d52dd7-eded-4c67-9115-9995702bc92c',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095525Z:c8d52dd7-eded-4c67-9115-9995702bc92c',
  date: 'Mon, 13 Mar 2017 09:55:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/978e37a7-8c9e-404b-b701-468ca2f3b7a5?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"Succeeded\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '29',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '19f8b232-02c5-43fe-8220-75dc33bab80c',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14999',
  'x-ms-correlation-request-id': 'c8d52dd7-eded-4c67-9115-9995702bc92c',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095525Z:c8d52dd7-eded-4c67-9115-9995702bc92c',
  date: 'Mon, 13 Mar 2017 09:55:25 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName?api-version=2016-12-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceNotFound\",\"message\":\"The Resource 'Microsoft.Network/expressRouteCircuits/expressRouteCircuitName' under resource group 'xplat-test-circuit' was not found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': 'adb5f37d-6588-4d4f-9d89-98c5be96c235',
  'x-ms-correlation-request-id': 'adb5f37d-6588-4d4f-9d89-98c5be96c235',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095527Z:adb5f37d-6588-4d4f-9d89-98c5be96c235',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Mon, 13 Mar 2017 09:55:27 GMT',
  connection: 'close',
  'content-length': '184' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-circuit/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName?api-version=2016-12-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceNotFound\",\"message\":\"The Resource 'Microsoft.Network/expressRouteCircuits/expressRouteCircuitName' under resource group 'xplat-test-circuit' was not found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': 'adb5f37d-6588-4d4f-9d89-98c5be96c235',
  'x-ms-correlation-request-id': 'adb5f37d-6588-4d4f-9d89-98c5be96c235',
  'x-ms-routing-request-id': 'WESTEUROPE:20170313T095527Z:adb5f37d-6588-4d4f-9d89-98c5be96c235',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Mon, 13 Mar 2017 09:55:27 GMT',
  connection: 'close',
  'content-length': '184' });
 return result; }]];