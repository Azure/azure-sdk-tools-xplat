// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '21466899-20b2-463c-8c30-b8fb28a43248',
    name: 'Core-RP Alpha Subscription-11',
    user: {
      name: 'user@domain.example',
      type: 'servicePrincipal'
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
  .get('/subscriptions/21466899-20b2-463c-8c30-b8fb28a43248/resourceGroups/xTestDiskCreate8193/providers/Microsoft.Compute/snapshots?api-version=2016-04-30-preview')
  .reply(200, "{\"value\":[]}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-reads': '14979',
  'x-ms-request-id': '58a7f440-d298-4cb6-90a5-712ae80c9304',
  'x-ms-correlation-request-id': '58a7f440-d298-4cb6-90a5-712ae80c9304',
  'x-ms-routing-request-id': 'WESTUS2:20170203T005853Z:58a7f440-d298-4cb6-90a5-712ae80c9304',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 03 Feb 2017 00:58:53 GMT',
  connection: 'close',
  'content-length': '12' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/21466899-20b2-463c-8c30-b8fb28a43248/resourceGroups/xTestDiskCreate8193/providers/Microsoft.Compute/snapshots?api-version=2016-04-30-preview')
  .reply(200, "{\"value\":[]}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-reads': '14979',
  'x-ms-request-id': '58a7f440-d298-4cb6-90a5-712ae80c9304',
  'x-ms-correlation-request-id': '58a7f440-d298-4cb6-90a5-712ae80c9304',
  'x-ms-routing-request-id': 'WESTUS2:20170203T005853Z:58a7f440-d298-4cb6-90a5-712ae80c9304',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Fri, 03 Feb 2017 00:58:53 GMT',
  connection: 'close',
  'content-length': '12' });
 return result; }]];