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
  process.env['AZURE_VM_TEST_LOCATION'] = 'southeastasia';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone/providers/Microsoft.Network/dnszones/example1.com?api-version=2015-05-04-preview')
  .reply(200, "", { 'cache-control': 'private',
  'content-length': '0',
  'x-content-type-options': 'nosniff',
  'x-ms-request-id': '027c49a3-3c66-47ee-bba9-d89e91f1cded',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '15f71893-0a41-433f-a162-816deab03b0b',
  'x-ms-routing-request-id': 'WESTEUROPE:20160224T090824Z:15f71893-0a41-433f-a162-816deab03b0b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Wed, 24 Feb 2016 09:08:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone/providers/Microsoft.Network/dnszones/example1.com?api-version=2015-05-04-preview')
  .reply(200, "", { 'cache-control': 'private',
  'content-length': '0',
  'x-content-type-options': 'nosniff',
  'x-ms-request-id': '027c49a3-3c66-47ee-bba9-d89e91f1cded',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '15f71893-0a41-433f-a162-816deab03b0b',
  'x-ms-routing-request-id': 'WESTEUROPE:20160224T090824Z:15f71893-0a41-433f-a162-816deab03b0b',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Wed, 24 Feb 2016 09:08:23 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone/providers/Microsoft.Network/dnszones/example1.com?api-version=2015-05-04-preview')
  .reply(404, "{\"error\":{\"code\":\"ResourceNotFound\",\"message\":\"The Resource 'Microsoft.Network/dnszones/example1.com' under resource group 'xplat-test-dns-zone' was not found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': '29c84b16-5059-4ce8-9b59-f47b6cadef00',
  'x-ms-correlation-request-id': '29c84b16-5059-4ce8-9b59-f47b6cadef00',
  'x-ms-routing-request-id': 'WESTEUROPE:20160224T090825Z:29c84b16-5059-4ce8-9b59-f47b6cadef00',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Wed, 24 Feb 2016 09:08:24 GMT',
  connection: 'close',
  'content-length': '162' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone/providers/Microsoft.Network/dnszones/example1.com?api-version=2015-05-04-preview')
  .reply(404, "{\"error\":{\"code\":\"ResourceNotFound\",\"message\":\"The Resource 'Microsoft.Network/dnszones/example1.com' under resource group 'xplat-test-dns-zone' was not found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': '29c84b16-5059-4ce8-9b59-f47b6cadef00',
  'x-ms-correlation-request-id': '29c84b16-5059-4ce8-9b59-f47b6cadef00',
  'x-ms-routing-request-id': 'WESTEUROPE:20160224T090825Z:29c84b16-5059-4ce8-9b59-f47b6cadef00',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Wed, 24 Feb 2016 09:08:24 GMT',
  connection: 'close',
  'content-length': '162' });
 return result; }]];