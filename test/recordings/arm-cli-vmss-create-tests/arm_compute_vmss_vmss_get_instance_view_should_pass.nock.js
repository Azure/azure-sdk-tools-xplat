// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'e33f361b-53c2-4cc7-b829-78906708387b',
    name: 'Microsoft Azure Internal Consumption',
    user: {
      name: 'user@domain.example',
      type: 'servicePrincipal'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: [],
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'southeastasia';
  process.env['SSHCERT'] = 'test/myCert.pem';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate8316/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss/instanceView?api-version=2015-06-15')
  .reply(200, "{\r\n  \"virtualMachine\": {\r\n    \"statusesSummary\": [\r\n      {\r\n        \"code\": \"ProvisioningState/succeeded\",\r\n        \"count\": 2\r\n      }\r\n    ]\r\n  },\r\n  \"statuses\": [\r\n    {\r\n      \"code\": \"ProvisioningState/succeeded\",\r\n      \"level\": \"Info\",\r\n      \"displayStatus\": \"Provisioning succeeded\",\r\n      \"time\": \"2015-12-01T05:47:10.5659695+00:00\"\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '359',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130925916428386398',
  'x-ms-request-id': '3a9d6b1f-593b-4d8d-8dda-49978f37e32d',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14989',
  'x-ms-correlation-request-id': '8cdb1f8e-1cb7-4a87-ac94-3614d7b4e3c8',
  'x-ms-routing-request-id': 'WESTUS:20151201T054720Z:8cdb1f8e-1cb7-4a87-ac94-3614d7b4e3c8',
  date: 'Tue, 01 Dec 2015 05:47:20 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate8316/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss/instanceView?api-version=2015-06-15')
  .reply(200, "{\r\n  \"virtualMachine\": {\r\n    \"statusesSummary\": [\r\n      {\r\n        \"code\": \"ProvisioningState/succeeded\",\r\n        \"count\": 2\r\n      }\r\n    ]\r\n  },\r\n  \"statuses\": [\r\n    {\r\n      \"code\": \"ProvisioningState/succeeded\",\r\n      \"level\": \"Info\",\r\n      \"displayStatus\": \"Provisioning succeeded\",\r\n      \"time\": \"2015-12-01T05:47:10.5659695+00:00\"\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '359',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130925916428386398',
  'x-ms-request-id': '3a9d6b1f-593b-4d8d-8dda-49978f37e32d',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14989',
  'x-ms-correlation-request-id': '8cdb1f8e-1cb7-4a87-ac94-3614d7b4e3c8',
  'x-ms-routing-request-id': 'WESTUS:20151201T054720Z:8cdb1f8e-1cb7-4a87-ac94-3614d7b4e3c8',
  date: 'Tue, 01 Dec 2015 05:47:20 GMT',
  connection: 'close' });
 return result; }]];