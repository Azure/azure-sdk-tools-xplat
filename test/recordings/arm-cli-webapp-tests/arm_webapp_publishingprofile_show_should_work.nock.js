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
  .post('/subscriptions/8d57ddbd-c779-40ea-b660-1015f4bf027d/resourceGroups/testrg15042/providers/Microsoft.Web/sites/webappclitests5275/config/publishingcredentials/list?api-version=2015-08-01')
  .reply(200, "{\"id\":\"/subscriptions/8d57ddbd-c779-40ea-b660-1015f4bf027d/resourceGroups/testrg15042/providers/Microsoft.Web/sites/webappclitests5275/publishingcredentials/$webappclitests5275\",\"name\":\"webappclitests5275\",\"type\":\"Microsoft.Web/sites/publishingcredentials\",\"location\":\"West US\",\"tags\":null,\"properties\":{\"name\":null,\"publishingUserName\":\"$webappclitests5275\",\"publishingPassword\":\"bqKBDmNb0BbJgeEw4KHjqiKRfJlHb7oWqCqoMQjaF5urqRrP6kxwirrSj9nk\",\"publishingPasswordHash\":null,\"publishingPasswordHashSalt\":null,\"metadata\":null,\"isDeleted\":false,\"scmUri\":\"https://$webappclitests5275:bqKBDmNb0BbJgeEw4KHjqiKRfJlHb7oWqCqoMQjaF5urqRrP6kxwirrSj9nk@webappclitests5275.scm.azurewebsites.net\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '683',
  'content-type': 'application/json',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'c4f9387f-20c9-4e60-b382-2300cb1ea1a8',
  server: 'Microsoft-IIS/8.0',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': 'd0d59130-2e36-4df3-8297-5338bfd1fcac',
  'x-ms-routing-request-id': 'WESTUS2:20161020T211002Z:d0d59130-2e36-4df3-8297-5338bfd1fcac',
  date: 'Thu, 20 Oct 2016 21:10:02 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .post('/subscriptions/8d57ddbd-c779-40ea-b660-1015f4bf027d/resourceGroups/testrg15042/providers/Microsoft.Web/sites/webappclitests5275/config/publishingcredentials/list?api-version=2015-08-01')
  .reply(200, "{\"id\":\"/subscriptions/8d57ddbd-c779-40ea-b660-1015f4bf027d/resourceGroups/testrg15042/providers/Microsoft.Web/sites/webappclitests5275/publishingcredentials/$webappclitests5275\",\"name\":\"webappclitests5275\",\"type\":\"Microsoft.Web/sites/publishingcredentials\",\"location\":\"West US\",\"tags\":null,\"properties\":{\"name\":null,\"publishingUserName\":\"$webappclitests5275\",\"publishingPassword\":\"bqKBDmNb0BbJgeEw4KHjqiKRfJlHb7oWqCqoMQjaF5urqRrP6kxwirrSj9nk\",\"publishingPasswordHash\":null,\"publishingPasswordHashSalt\":null,\"metadata\":null,\"isDeleted\":false,\"scmUri\":\"https://$webappclitests5275:bqKBDmNb0BbJgeEw4KHjqiKRfJlHb7oWqCqoMQjaF5urqRrP6kxwirrSj9nk@webappclitests5275.scm.azurewebsites.net\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '683',
  'content-type': 'application/json',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'c4f9387f-20c9-4e60-b382-2300cb1ea1a8',
  server: 'Microsoft-IIS/8.0',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': 'd0d59130-2e36-4df3-8297-5338bfd1fcac',
  'x-ms-routing-request-id': 'WESTUS2:20161020T211002Z:d0d59130-2e36-4df3-8297-5338bfd1fcac',
  date: 'Thu, 20 Oct 2016 21:10:02 GMT',
  connection: 'close' });
 return result; }]];