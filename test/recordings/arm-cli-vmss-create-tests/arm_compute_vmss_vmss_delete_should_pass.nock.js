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
  .delete('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate4282/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss?api-version=2015-06-15')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?monitor=true&api-version=2015-06-15',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '67806ecb-a6cf-4717-a372-1c9165d5d1ac',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '9b7b3689-d26d-4cb3-9988-70da60bd3abc',
  'x-ms-routing-request-id': 'WESTUS:20160222T221728Z:9b7b3689-d26d-4cb3-9988-70da60bd3abc',
  date: 'Mon, 22 Feb 2016 22:17:28 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate4282/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss?api-version=2015-06-15')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?monitor=true&api-version=2015-06-15',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '67806ecb-a6cf-4717-a372-1c9165d5d1ac',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-correlation-request-id': '9b7b3689-d26d-4cb3-9988-70da60bd3abc',
  'x-ms-routing-request-id': 'WESTUS:20160222T221728Z:9b7b3689-d26d-4cb3-9988-70da60bd3abc',
  date: 'Mon, 22 Feb 2016 22:17:28 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '73356097-c184-4626-8cca-3d90a1594e48',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14995',
  'x-ms-correlation-request-id': 'bafb05f1-0166-4906-84c0-acd1799e81fc',
  'x-ms-routing-request-id': 'WESTUS:20160222T221759Z:bafb05f1-0166-4906-84c0-acd1799e81fc',
  date: 'Mon, 22 Feb 2016 22:17:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '73356097-c184-4626-8cca-3d90a1594e48',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14995',
  'x-ms-correlation-request-id': 'bafb05f1-0166-4906-84c0-acd1799e81fc',
  'x-ms-routing-request-id': 'WESTUS:20160222T221759Z:bafb05f1-0166-4906-84c0-acd1799e81fc',
  date: 'Mon, 22 Feb 2016 22:17:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '54c28fef-7d6a-4a17-b941-3414881bc3c7',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14898',
  'x-ms-correlation-request-id': '4d78cb88-0080-4018-a0cb-b343143fe994',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221831Z:4d78cb88-0080-4018-a0cb-b343143fe994',
  date: 'Mon, 22 Feb 2016 22:18:31 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '54c28fef-7d6a-4a17-b941-3414881bc3c7',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14898',
  'x-ms-correlation-request-id': '4d78cb88-0080-4018-a0cb-b343143fe994',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221831Z:4d78cb88-0080-4018-a0cb-b343143fe994',
  date: 'Mon, 22 Feb 2016 22:18:31 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '1f56146b-9b58-4341-b41f-ee72602d61d4',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14897',
  'x-ms-correlation-request-id': '0ef71b09-af11-40ce-8250-dc1d1498bd46',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221902Z:0ef71b09-af11-40ce-8250-dc1d1498bd46',
  date: 'Mon, 22 Feb 2016 22:19:01 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '1f56146b-9b58-4341-b41f-ee72602d61d4',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14897',
  'x-ms-correlation-request-id': '0ef71b09-af11-40ce-8250-dc1d1498bd46',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221902Z:0ef71b09-af11-40ce-8250-dc1d1498bd46',
  date: 'Mon, 22 Feb 2016 22:19:01 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"Succeeded\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\",\r\n  \"endTime\": \"2016-02-22T22:19:21.8075059+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': 'cdba773a-70fd-43a2-a571-eeb252d45a1c',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14890',
  'x-ms-correlation-request-id': '72d60a7c-0c01-4bd5-be05-ddae685d31a5',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221933Z:72d60a7c-0c01-4bd5-be05-ddae685d31a5',
  date: 'Mon, 22 Feb 2016 22:19:33 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/67806ecb-a6cf-4717-a372-1c9165d5d1ac?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"67806ecb-a6cf-4717-a372-1c9165d5d1ac\",\r\n  \"status\": \"Succeeded\",\r\n  \"startTime\": \"2016-02-22T22:17:28.5580607+00:00\",\r\n  \"endTime\": \"2016-02-22T22:19:21.8075059+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': 'cdba773a-70fd-43a2-a571-eeb252d45a1c',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14890',
  'x-ms-correlation-request-id': '72d60a7c-0c01-4bd5-be05-ddae685d31a5',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221933Z:72d60a7c-0c01-4bd5-be05-ddae685d31a5',
  date: 'Mon, 22 Feb 2016 22:19:33 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate4282/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss1?api-version=2015-06-15')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?monitor=true&api-version=2015-06-15',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': 'd393fcd0-244a-430a-8215-fc0282ce5ccc',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1194',
  'x-ms-correlation-request-id': '0405db72-3a85-444a-8b17-3afc0823a392',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221936Z:0405db72-3a85-444a-8b17-3afc0823a392',
  date: 'Mon, 22 Feb 2016 22:19:36 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/resourceGroups/xplatTestVMSSCreate4282/providers/Microsoft.Compute/virtualMachineScaleSets/xplattestvmss1?api-version=2015-06-15')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '0',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?monitor=true&api-version=2015-06-15',
  'azure-asyncoperation': 'https://management.azure.com/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': 'd393fcd0-244a-430a-8215-fc0282ce5ccc',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1194',
  'x-ms-correlation-request-id': '0405db72-3a85-444a-8b17-3afc0823a392',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T221936Z:0405db72-3a85-444a-8b17-3afc0823a392',
  date: 'Mon, 22 Feb 2016 22:19:36 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': 'edfa33ad-ee2b-47be-96aa-43733d42d6d7',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14904',
  'x-ms-correlation-request-id': '7679364b-44f8-49e7-b9ef-dbda7b7ea258',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T222007Z:7679364b-44f8-49e7-b9ef-dbda7b7ea258',
  date: 'Mon, 22 Feb 2016 22:20:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': 'edfa33ad-ee2b-47be-96aa-43733d42d6d7',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14904',
  'x-ms-correlation-request-id': '7679364b-44f8-49e7-b9ef-dbda7b7ea258',
  'x-ms-routing-request-id': 'CENTRALUS:20160222T222007Z:7679364b-44f8-49e7-b9ef-dbda7b7ea258',
  date: 'Mon, 22 Feb 2016 22:20:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '7e9a88fe-d5a3-48b4-b18f-8ec65fab00d6',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': 'cae03e05-f354-44d5-be2f-8086b9ed04f5',
  'x-ms-routing-request-id': 'WESTUS:20160222T222037Z:cae03e05-f354-44d5-be2f-8086b9ed04f5',
  date: 'Mon, 22 Feb 2016 22:20:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '7e9a88fe-d5a3-48b4-b18f-8ec65fab00d6',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': 'cae03e05-f354-44d5-be2f-8086b9ed04f5',
  'x-ms-routing-request-id': 'WESTUS:20160222T222037Z:cae03e05-f354-44d5-be2f-8086b9ed04f5',
  date: 'Mon, 22 Feb 2016 22:20:37 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '6a49b3e8-765d-42eb-970f-7b0c8594de9f',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '8750d960-2f83-4a50-b126-599839810716',
  'x-ms-routing-request-id': 'WESTUS:20160222T222108Z:8750d960-2f83-4a50-b126-599839810716',
  date: 'Mon, 22 Feb 2016 22:21:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '6a49b3e8-765d-42eb-970f-7b0c8594de9f',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14994',
  'x-ms-correlation-request-id': '8750d960-2f83-4a50-b126-599839810716',
  'x-ms-routing-request-id': 'WESTUS:20160222T222108Z:8750d960-2f83-4a50-b126-599839810716',
  date: 'Mon, 22 Feb 2016 22:21:07 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '4664f585-d2b0-4e6a-a588-bb1c0f759544',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '58f91a5c-10ed-4482-9398-862c51ed8347',
  'x-ms-routing-request-id': 'WESTUS:20160222T222139Z:58f91a5c-10ed-4482-9398-862c51ed8347',
  date: 'Mon, 22 Feb 2016 22:21:38 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"InProgress\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '141',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '4664f585-d2b0-4e6a-a588-bb1c0f759544',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '58f91a5c-10ed-4482-9398-862c51ed8347',
  'x-ms-routing-request-id': 'WESTUS:20160222T222139Z:58f91a5c-10ed-4482-9398-862c51ed8347',
  date: 'Mon, 22 Feb 2016 22:21:38 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"Succeeded\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\",\r\n  \"endTime\": \"2016-02-22T22:21:40.3224868+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '5fd6f839-436b-4e26-a952-818ba8823f75',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14995',
  'x-ms-correlation-request-id': '67acb1a7-9b26-4540-9998-0bd7f7025511',
  'x-ms-routing-request-id': 'WESTUS:20160222T222210Z:67acb1a7-9b26-4540-9998-0bd7f7025511',
  date: 'Mon, 22 Feb 2016 22:22:09 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/e33f361b-53c2-4cc7-b829-78906708387b/providers/Microsoft.Compute/locations/southeastasia/operations/d393fcd0-244a-430a-8215-fc0282ce5ccc?api-version=2015-06-15')
  .reply(200, "{\r\n  \"operationId\": \"d393fcd0-244a-430a-8215-fc0282ce5ccc\",\r\n  \"status\": \"Succeeded\",\r\n  \"startTime\": \"2016-02-22T22:19:35.5574375+00:00\",\r\n  \"endTime\": \"2016-02-22T22:21:40.3224868+00:00\"\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '191',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-served-by': 'dce02487-9cda-4782-8138-773eb1573792_130923832742225921',
  'x-ms-request-id': '5fd6f839-436b-4e26-a952-818ba8823f75',
  server: 'Microsoft-HTTPAPI/2.0, Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14995',
  'x-ms-correlation-request-id': '67acb1a7-9b26-4540-9998-0bd7f7025511',
  'x-ms-routing-request-id': 'WESTUS:20160222T222210Z:67acb1a7-9b26-4540-9998-0bd7f7025511',
  date: 'Mon, 22 Feb 2016 22:22:09 GMT',
  connection: 'close' });
 return result; }]];