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
    registeredProviders: ['mobileservice'],
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
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection?api-version=2016-03-30')
  .reply(200, "{\r\n  \"name\": \"test-vpn-connection\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection\",\r\n  \"etag\": \"W/\\\"b176a4d4-4cb5-4be9-a8eb-2887837b19be\\\"\",\r\n  \"type\": \"Microsoft.Network/connections\",\r\n  \"location\": \"eastus\",\r\n  \"tags\": {\r\n    \"tag1\": \"aaa\",\r\n    \"tag2\": \"bbb\",\r\n    \"tag3\": \"ccc\"\r\n  },\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"e0fa5004-42f0-42a1-a24d-9b2101010d98\",\r\n    \"virtualNetworkGateway1\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/virtualNetworkGateways/test-vpn-gateway-1\"\r\n    },\r\n    \"virtualNetworkGateway2\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-2/providers/Microsoft.Network/virtualNetworkGateways/test-vpn-gateway-2\"\r\n    },\r\n    \"connectionType\": \"Vnet2Vnet\",\r\n    \"routingWeight\": 33,\r\n    \"sharedKey\": \"abc123\",\r\n    \"enableBgp\": false,\r\n    \"connectionStatus\": \"Unknown\",\r\n    \"ingressBytesTransferred\": 0,\r\n    \"egressBytesTransferred\": 0\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '564c1307-8b5f-49e5-8a04-f8a0741103b7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14979',
  'x-ms-correlation-request-id': 'd12d361b-a3eb-4672-83f0-42cc56eef9a2',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T040001Z:d12d361b-a3eb-4672-83f0-42cc56eef9a2',
  date: 'Fri, 12 Aug 2016 04:00:00 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection?api-version=2016-03-30')
  .reply(200, "{\r\n  \"name\": \"test-vpn-connection\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection\",\r\n  \"etag\": \"W/\\\"b176a4d4-4cb5-4be9-a8eb-2887837b19be\\\"\",\r\n  \"type\": \"Microsoft.Network/connections\",\r\n  \"location\": \"eastus\",\r\n  \"tags\": {\r\n    \"tag1\": \"aaa\",\r\n    \"tag2\": \"bbb\",\r\n    \"tag3\": \"ccc\"\r\n  },\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"e0fa5004-42f0-42a1-a24d-9b2101010d98\",\r\n    \"virtualNetworkGateway1\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/virtualNetworkGateways/test-vpn-gateway-1\"\r\n    },\r\n    \"virtualNetworkGateway2\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-2/providers/Microsoft.Network/virtualNetworkGateways/test-vpn-gateway-2\"\r\n    },\r\n    \"connectionType\": \"Vnet2Vnet\",\r\n    \"routingWeight\": 33,\r\n    \"sharedKey\": \"abc123\",\r\n    \"enableBgp\": false,\r\n    \"connectionStatus\": \"Unknown\",\r\n    \"ingressBytesTransferred\": 0,\r\n    \"egressBytesTransferred\": 0\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '564c1307-8b5f-49e5-8a04-f8a0741103b7',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14979',
  'x-ms-correlation-request-id': 'd12d361b-a3eb-4672-83f0-42cc56eef9a2',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T040001Z:d12d361b-a3eb-4672-83f0-42cc56eef9a2',
  date: 'Fri, 12 Aug 2016 04:00:00 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection/sharedkey?api-version=2016-03-30', '*')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '543d3afc-0535-40d9-b8cd-3ec8c05b728a',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/543d3afc-0535-40d9-b8cd-3ec8c05b728a?api-version=2016-03-30',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': 'c5692f20-394a-4255-ace0-dc2cdf4813ba',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T040002Z:c5692f20-394a-4255-ace0-dc2cdf4813ba',
  date: 'Fri, 12 Aug 2016 04:00:02 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection/sharedkey?api-version=2016-03-30', '*')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  'retry-after': '10',
  'x-ms-request-id': '543d3afc-0535-40d9-b8cd-3ec8c05b728a',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operations/543d3afc-0535-40d9-b8cd-3ec8c05b728a?api-version=2016-03-30',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': 'c5692f20-394a-4255-ace0-dc2cdf4813ba',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T040002Z:c5692f20-394a-4255-ace0-dc2cdf4813ba',
  date: 'Fri, 12 Aug 2016 04:00:02 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection/sharedkey?api-version=2016-03-30')
  .reply(200, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '75e5a0bc-7e79-442d-93ec-a0db87b209c3',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14982',
  'x-ms-correlation-request-id': 'd099c03c-0ba6-44d0-8458-c5df5e273de1',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T040004Z:d099c03c-0ba6-44d0-8458-c5df5e273de1',
  date: 'Fri, 12 Aug 2016 04:00:03 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-gateway-group-1/providers/Microsoft.Network/connections/test-vpn-connection/sharedkey?api-version=2016-03-30')
  .reply(200, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '75e5a0bc-7e79-442d-93ec-a0db87b209c3',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14982',
  'x-ms-correlation-request-id': 'd099c03c-0ba6-44d0-8458-c5df5e273de1',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T040004Z:d099c03c-0ba6-44d0-8458-c5df5e273de1',
  date: 'Fri, 12 Aug 2016 04:00:03 GMT',
  connection: 'close' });
 return result; }]];