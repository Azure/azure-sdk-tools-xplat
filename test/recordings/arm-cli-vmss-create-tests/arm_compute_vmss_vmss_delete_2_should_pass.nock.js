// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'e33f361b-53c2-4cc7-b829-78906708387b',
    managementCertificate: {
      key: 'mockedKey',
      cert: 'mockedCert'
    },
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
  .delete('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate9485/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvms2?api-version=2015-06-15')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?monitor=true&api-version=2015-06-15',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': 'fd4dc894-070b-45bb-ba9c-72a4cfcbaf96',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': '08c145a4-59a7-41e8-b0b9-a997ac933c15',
  'x-ms-routing-request-id': 'WESTUS:20160204T180541Z:08c145a4-59a7-41e8-b0b9-a997ac933c15',
  date: 'Thu, 04 Feb 2016 18:05:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate9485/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvms2?api-version=2015-06-15')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?monitor=true&api-version=2015-06-15',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': 'fd4dc894-070b-45bb-ba9c-72a4cfcbaf96',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': '08c145a4-59a7-41e8-b0b9-a997ac933c15',
  'x-ms-routing-request-id': 'WESTUS:20160204T180541Z:08c145a4-59a7-41e8-b0b9-a997ac933c15',
  date: 'Thu, 04 Feb 2016 18:05:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '8a16a738-2f22-456a-a268-f595d1fd71eb',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '077808c7-43f1-47cb-b681-52d00f46ab41',
  'x-ms-routing-request-id': 'WESTUS:20160204T180612Z:077808c7-43f1-47cb-b681-52d00f46ab41',
  date: 'Thu, 04 Feb 2016 18:06:11 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '8a16a738-2f22-456a-a268-f595d1fd71eb',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14992',
  'x-ms-correlation-request-id': '077808c7-43f1-47cb-b681-52d00f46ab41',
  'x-ms-routing-request-id': 'WESTUS:20160204T180612Z:077808c7-43f1-47cb-b681-52d00f46ab41',
  date: 'Thu, 04 Feb 2016 18:06:11 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '0c367afe-e1bb-4822-a262-b78461e5d943',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14991',
  'x-ms-correlation-request-id': 'b3c1a7b4-c35f-4d34-bd66-af59939ef543',
  'x-ms-routing-request-id': 'CENTRALUS:20160204T180643Z:b3c1a7b4-c35f-4d34-bd66-af59939ef543',
  date: 'Thu, 04 Feb 2016 18:06:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '0c367afe-e1bb-4822-a262-b78461e5d943',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14991',
  'x-ms-correlation-request-id': 'b3c1a7b4-c35f-4d34-bd66-af59939ef543',
  'x-ms-routing-request-id': 'CENTRALUS:20160204T180643Z:b3c1a7b4-c35f-4d34-bd66-af59939ef543',
  date: 'Thu, 04 Feb 2016 18:06:42 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '54363c81-702d-4ff8-ac21-921987a4e767',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '6736ce0a-a38c-4787-bd01-6294263c90d6',
  'x-ms-routing-request-id': 'CENTRALUS:20160204T180714Z:6736ce0a-a38c-4787-bd01-6294263c90d6',
  date: 'Thu, 04 Feb 2016 18:07:13 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '54363c81-702d-4ff8-ac21-921987a4e767',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '6736ce0a-a38c-4787-bd01-6294263c90d6',
  'x-ms-routing-request-id': 'CENTRALUS:20160204T180714Z:6736ce0a-a38c-4787-bd01-6294263c90d6',
  date: 'Thu, 04 Feb 2016 18:07:13 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '932b8450-19b0-45db-a867-0327060edf2b',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14997',
  'x-ms-correlation-request-id': 'c2e0edc6-64a9-4ccb-97e8-2899c05da06d',
  'x-ms-routing-request-id': 'CENTRALUS:20160204T180746Z:c2e0edc6-64a9-4ccb-97e8-2899c05da06d',
  date: 'Thu, 04 Feb 2016 18:07:45 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '932b8450-19b0-45db-a867-0327060edf2b',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14997',
  'x-ms-correlation-request-id': 'c2e0edc6-64a9-4ccb-97e8-2899c05da06d',
  'x-ms-routing-request-id': 'CENTRALUS:20160204T180746Z:c2e0edc6-64a9-4ccb-97e8-2899c05da06d',
  date: 'Thu, 04 Feb 2016 18:07:45 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"Succeeded\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\",\r\n  \"endTime\": \"2016-02-04T18:07:54.3952688+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '2fd69af7-7b94-457d-8d7a-314119c5be8d',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14995',
  'x-ms-correlation-request-id': '524a8487-706e-484a-af08-96cc57eb5901',
  'x-ms-routing-request-id': 'WESTUS:20160204T180817Z:524a8487-706e-484a-af08-96cc57eb5901',
  date: 'Thu, 04 Feb 2016 18:08:17 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/fd4dc894-070b-45bb-ba9c-72a4cfcbaf96?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"fd4dc894-070b-45bb-ba9c-72a4cfcbaf96\",\r\n  \"status\": \"Succeeded\",\r\n  \"startTime\": \"2016-02-04T18:05:40.9708343+00:00\",\r\n  \"endTime\": \"2016-02-04T18:07:54.3952688+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130979641115900750',
  'x-ms-request-id': '2fd69af7-7b94-457d-8d7a-314119c5be8d',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14995',
  'x-ms-correlation-request-id': '524a8487-706e-484a-af08-96cc57eb5901',
  'x-ms-routing-request-id': 'WESTUS:20160204T180817Z:524a8487-706e-484a-af08-96cc57eb5901',
  date: 'Thu, 04 Feb 2016 18:08:17 GMT',
  connection: 'close' });
 return result; }]];