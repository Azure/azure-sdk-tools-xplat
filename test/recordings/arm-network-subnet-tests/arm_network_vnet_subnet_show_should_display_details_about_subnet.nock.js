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
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualnetworks/test-vnet?api-version=2016-03-30')
  .reply(200, "{\r\n  \"name\": \"test-vnet\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualNetworks/test-vnet\",\r\n  \"etag\": \"W/\\\"df62716c-ecb3-4866-ae10-6e2eac531387\\\"\",\r\n  \"type\": \"Microsoft.Network/virtualNetworks\",\r\n  \"location\": \"eastus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"8a1ebf97-b2fd-467b-b626-528068e0a0fc\",\r\n    \"addressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"10.0.0.0/8\"\r\n      ]\r\n    },\r\n    \"dhcpOptions\": {\r\n      \"dnsServers\": []\r\n    },\r\n    \"subnets\": [\r\n      {\r\n        \"name\": \"test-subnet\",\r\n        \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/test-subnet\",\r\n        \"etag\": \"W/\\\"df62716c-ecb3-4866-ae10-6e2eac531387\\\"\",\r\n        \"properties\": {\r\n          \"provisioningState\": \"Succeeded\",\r\n          \"addressPrefix\": \"10.0.0.0/24\",\r\n          \"networkSecurityGroup\": {\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/networkSecurityGroups/test-nsg\"\r\n          },\r\n          \"routeTable\": {\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/routeTables/test-route-table\"\r\n          }\r\n        }\r\n      }\r\n    ]\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1435',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"df62716c-ecb3-4866-ae10-6e2eac531387"',
  'x-ms-request-id': 'e60b72f4-e6ae-444f-89b2-2919f3973c7b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14953',
  'x-ms-correlation-request-id': 'a4934612-7f7d-42cc-9e78-42cb31c02974',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T011316Z:a4934612-7f7d-42cc-9e78-42cb31c02974',
  date: 'Fri, 12 Aug 2016 01:13:16 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualnetworks/test-vnet?api-version=2016-03-30')
  .reply(200, "{\r\n  \"name\": \"test-vnet\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualNetworks/test-vnet\",\r\n  \"etag\": \"W/\\\"df62716c-ecb3-4866-ae10-6e2eac531387\\\"\",\r\n  \"type\": \"Microsoft.Network/virtualNetworks\",\r\n  \"location\": \"eastus\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"resourceGuid\": \"8a1ebf97-b2fd-467b-b626-528068e0a0fc\",\r\n    \"addressSpace\": {\r\n      \"addressPrefixes\": [\r\n        \"10.0.0.0/8\"\r\n      ]\r\n    },\r\n    \"dhcpOptions\": {\r\n      \"dnsServers\": []\r\n    },\r\n    \"subnets\": [\r\n      {\r\n        \"name\": \"test-subnet\",\r\n        \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/test-subnet\",\r\n        \"etag\": \"W/\\\"df62716c-ecb3-4866-ae10-6e2eac531387\\\"\",\r\n        \"properties\": {\r\n          \"provisioningState\": \"Succeeded\",\r\n          \"addressPrefix\": \"10.0.0.0/24\",\r\n          \"networkSecurityGroup\": {\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/networkSecurityGroups/test-nsg\"\r\n          },\r\n          \"routeTable\": {\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/routeTables/test-route-table\"\r\n          }\r\n        }\r\n      }\r\n    ]\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '1435',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"df62716c-ecb3-4866-ae10-6e2eac531387"',
  'x-ms-request-id': 'e60b72f4-e6ae-444f-89b2-2919f3973c7b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14953',
  'x-ms-correlation-request-id': 'a4934612-7f7d-42cc-9e78-42cb31c02974',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T011316Z:a4934612-7f7d-42cc-9e78-42cb31c02974',
  date: 'Fri, 12 Aug 2016 01:13:16 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualnetworks/test-vnet/subnets/test-subnet?api-version=2016-03-30')
  .reply(200, "{\r\n  \"name\": \"test-subnet\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/test-subnet\",\r\n  \"etag\": \"W/\\\"df62716c-ecb3-4866-ae10-6e2eac531387\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressPrefix\": \"10.0.0.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/networkSecurityGroups/test-nsg\"\r\n    },\r\n    \"routeTable\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/routeTables/test-route-table\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '741',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"df62716c-ecb3-4866-ae10-6e2eac531387"',
  'x-ms-request-id': 'db0eb3d6-6245-45fb-baab-d2c86ce9d1e5',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14957',
  'x-ms-correlation-request-id': 'ed0d201c-07f5-4e4f-8a3b-07b1f6b9c424',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T011317Z:ed0d201c-07f5-4e4f-8a3b-07b1f6b9c424',
  date: 'Fri, 12 Aug 2016 01:13:17 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualnetworks/test-vnet/subnets/test-subnet?api-version=2016-03-30')
  .reply(200, "{\r\n  \"name\": \"test-subnet\",\r\n  \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/test-subnet\",\r\n  \"etag\": \"W/\\\"df62716c-ecb3-4866-ae10-6e2eac531387\\\"\",\r\n  \"properties\": {\r\n    \"provisioningState\": \"Succeeded\",\r\n    \"addressPrefix\": \"10.0.0.0/24\",\r\n    \"networkSecurityGroup\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/networkSecurityGroups/test-nsg\"\r\n    },\r\n    \"routeTable\": {\r\n      \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-subnet/providers/Microsoft.Network/routeTables/test-route-table\"\r\n    }\r\n  }\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '741',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  etag: 'W/"df62716c-ecb3-4866-ae10-6e2eac531387"',
  'x-ms-request-id': 'db0eb3d6-6245-45fb-baab-d2c86ce9d1e5',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14957',
  'x-ms-correlation-request-id': 'ed0d201c-07f5-4e4f-8a3b-07b1f6b9c424',
  'x-ms-routing-request-id': 'CANADAEAST:20160812T011317Z:ed0d201c-07f5-4e4f-8a3b-07b1f6b9c424',
  date: 'Fri, 12 Aug 2016 01:13:17 GMT',
  connection: 'close' });
 return result; }]];