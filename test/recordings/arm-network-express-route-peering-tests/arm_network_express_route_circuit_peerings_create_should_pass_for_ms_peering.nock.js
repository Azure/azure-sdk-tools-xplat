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
  process.env['AZURE_VM_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering?api-version=2016-12-01')
  .reply(404, "{\r\n  \"error\": {\r\n    \"code\": \"NotFound\",\r\n    \"message\": \"Resource /subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering not found.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '291',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '541a1733-0638-415e-be35-250837bfcda2',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-correlation-request-id': '89dac84f-e125-46ab-978e-89a3bde92b52',
  'x-ms-routing-request-id': 'WESTEUROPE:20170227T141400Z:89dac84f-e125-46ab-978e-89a3bde92b52',
  date: 'Mon, 27 Feb 2017 14:13:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering?api-version=2016-12-01')
  .reply(404, "{\r\n  \"error\": {\r\n    \"code\": \"NotFound\",\r\n    \"message\": \"Resource /subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering not found.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '291',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '541a1733-0638-415e-be35-250837bfcda2',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-correlation-request-id': '89dac84f-e125-46ab-978e-89a3bde92b52',
  'x-ms-routing-request-id': 'WESTEUROPE:20170227T141400Z:89dac84f-e125-46ab-978e-89a3bde92b52',
  date: 'Mon, 27 Feb 2017 14:13:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering?api-version=2016-12-01', '*')
  .reply(201, "{\r\n  \"name\": \"MicrosoftPeering\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering\",\r\n  \"etag\": \"W/\\\"d6e533e1-8238-4705-8b20-207fa1658426\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Updating\",\r\n    \"peeringType\": \"MicrosoftPeering\",\r\n    \"azureASN\": 0,\r\n    \"peerASN\": 120,\r\n    \"primaryPeerAddressPrefix\": \"10.0.0.0/30\",\r\n    \"secondaryPeerAddressPrefix\": \"11.0.0.0/30\",\r\n    \"state\": \"Disabled\",\r\n    \"vlanId\": 121,\r\n    \"lastModifiedBy\": \"\",\r\n    \"microsoftPeeringConfig\": {\r\n      \"advertisedPublicPrefixes\": [\r\n        \"12.0.0.0/30\"\r\n      ],\r\n      \"advertisedPublicPrefixesState\": \"NotConfigured\",\r\n      \"customerASN\": 23,\r\n      \"routingRegistryName\": \"ARIN\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '833',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '1aab4033-a1f6-4379-89b2-dbf17e2b503c',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/1aab4033-a1f6-4379-89b2-dbf17e2b503c?api-version=2016-12-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-correlation-request-id': 'ecf6d7f9-a715-404a-b69f-17d25ca200a4',
  'x-ms-routing-request-id': 'WESTEUROPE:20170227T141402Z:ecf6d7f9-a715-404a-b69f-17d25ca200a4',
  date: 'Mon, 27 Feb 2017 14:14:01 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering?api-version=2016-12-01', '*')
  .reply(201, "{\r\n  \"name\": \"MicrosoftPeering\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-peering/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName/peerings/MicrosoftPeering\",\r\n  \"etag\": \"W/\\\"d6e533e1-8238-4705-8b20-207fa1658426\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Updating\",\r\n    \"peeringType\": \"MicrosoftPeering\",\r\n    \"azureASN\": 0,\r\n    \"peerASN\": 120,\r\n    \"primaryPeerAddressPrefix\": \"10.0.0.0/30\",\r\n    \"secondaryPeerAddressPrefix\": \"11.0.0.0/30\",\r\n    \"state\": \"Disabled\",\r\n    \"vlanId\": 121,\r\n    \"lastModifiedBy\": \"\",\r\n    \"microsoftPeeringConfig\": {\r\n      \"advertisedPublicPrefixes\": [\r\n        \"12.0.0.0/30\"\r\n      ],\r\n      \"advertisedPublicPrefixesState\": \"NotConfigured\",\r\n      \"customerASN\": 23,\r\n      \"routingRegistryName\": \"ARIN\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '833',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '1aab4033-a1f6-4379-89b2-dbf17e2b503c',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/1aab4033-a1f6-4379-89b2-dbf17e2b503c?api-version=2016-12-01',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-correlation-request-id': 'ecf6d7f9-a715-404a-b69f-17d25ca200a4',
  'x-ms-routing-request-id': 'WESTEUROPE:20170227T141402Z:ecf6d7f9-a715-404a-b69f-17d25ca200a4',
  date: 'Mon, 27 Feb 2017 14:14:01 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/1aab4033-a1f6-4379-89b2-dbf17e2b503c?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"Failed\",\r\n  \"error\": {\r\n    \"code\": \"InternalServerError\",\r\n    \"message\": \"An error occured.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '138',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '4404ecd3-f3c5-4b33-9a62-722ecfc82a1b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-correlation-request-id': 'e57d83ba-9ead-4f1a-8268-6008d02e660d',
  'x-ms-routing-request-id': 'WESTEUROPE:20170227T141433Z:e57d83ba-9ead-4f1a-8268-6008d02e660d',
  date: 'Mon, 27 Feb 2017 14:14:32 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/brazilsouth/operations/1aab4033-a1f6-4379-89b2-dbf17e2b503c?api-version=2016-12-01')
  .reply(200, "{\r\n  \"status\": \"Failed\",\r\n  \"error\": {\r\n    \"code\": \"InternalServerError\",\r\n    \"message\": \"An error occured.\",\r\n    \"details\": []\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '138',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '4404ecd3-f3c5-4b33-9a62-722ecfc82a1b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-correlation-request-id': 'e57d83ba-9ead-4f1a-8268-6008d02e660d',
  'x-ms-routing-request-id': 'WESTEUROPE:20170227T141433Z:e57d83ba-9ead-4f1a-8268-6008d02e660d',
  date: 'Mon, 27 Feb 2017 14:14:32 GMT',
  connection: 'close' });
 return result; }]];