// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '8d57ddbd-c779-40ea-b660-1015f4bf027d',
    name: 'Visual Studio Enterprise',
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
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/8d57ddbd-c779-40ea-b660-1015f4bf027d/resourceGroups/testrg15042/providers/Microsoft.Web/sites/webappclitests5275?api-version=2015-08-01')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  etag: '"1D22B165642EAEB"',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '395ddd76-f25c-417f-9038-ffed2f594650',
  server: 'Microsoft-IIS/8.0',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '6752f270-84bc-480a-b8be-df6ff892f44f',
  'x-ms-routing-request-id': 'WESTUS2:20161020T211014Z:6752f270-84bc-480a-b8be-df6ff892f44f',
  date: 'Thu, 20 Oct 2016 21:10:13 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/8d57ddbd-c779-40ea-b660-1015f4bf027d/resourceGroups/testrg15042/providers/Microsoft.Web/sites/webappclitests5275?api-version=2015-08-01')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  etag: '"1D22B165642EAEB"',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '395ddd76-f25c-417f-9038-ffed2f594650',
  server: 'Microsoft-IIS/8.0',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '6752f270-84bc-480a-b8be-df6ff892f44f',
  'x-ms-routing-request-id': 'WESTUS2:20161020T211014Z:6752f270-84bc-480a-b8be-df6ff892f44f',
  date: 'Thu, 20 Oct 2016 21:10:13 GMT',
  connection: 'close' });
 return result; }]];