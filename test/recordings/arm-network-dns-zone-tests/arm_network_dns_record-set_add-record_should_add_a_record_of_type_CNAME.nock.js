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
  process.env['AZURE_VM_TEST_LOCATION'] = 'southeastasia';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone-record-set9283/providers/Microsoft.Network/dnszones/example1.com?api-version=2016-04-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/2c224e7e-3ef5-431d-a57b-e71f4662e3a6\\/resourceGroups\\/xplat-test-dns-zone-record-set9283\\/providers\\/Microsoft.Network\\/dnszones\\/example1.com\",\"name\":\"example1.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-8f0c-1f2967f8d101\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-01.azure-dns.com.\",\"ns2-01.azure-dns.net.\",\"ns3-01.azure-dns.org.\",\"ns4-01.azure-dns.info.\"],\"numberOfRecordSets\":2}}", { 'cache-control': 'private',
  'content-length': '508',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-8f0c-1f2967f8d101',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '57c99cb5-487d-4ae2-83f8-e728d23b49c7',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11997',
  'x-ms-correlation-request-id': '3de4e4fd-e8ab-4071-810d-28efee5fc839',
  'x-ms-routing-request-id': 'WESTEUROPE:20160817T091040Z:3de4e4fd-e8ab-4071-810d-28efee5fc839',
  date: 'Wed, 17 Aug 2016 09:10:39 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone-record-set9283/providers/Microsoft.Network/dnszones/example1.com?api-version=2016-04-01')
  .reply(200, "{\"id\":\"\\/subscriptions\\/2c224e7e-3ef5-431d-a57b-e71f4662e3a6\\/resourceGroups\\/xplat-test-dns-zone-record-set9283\\/providers\\/Microsoft.Network\\/dnszones\\/example1.com\",\"name\":\"example1.com\",\"type\":\"Microsoft.Network\\/dnszones\",\"etag\":\"00000002-0000-0000-8f0c-1f2967f8d101\",\"location\":\"global\",\"tags\":{\"tag1\":\"aaa\",\"tag2\":\"bbb\"},\"properties\":{\"maxNumberOfRecordSets\":5000,\"nameServers\":[\"ns1-01.azure-dns.com.\",\"ns2-01.azure-dns.net.\",\"ns3-01.azure-dns.org.\",\"ns4-01.azure-dns.info.\"],\"numberOfRecordSets\":2}}", { 'cache-control': 'private',
  'content-length': '508',
  'content-type': 'application/json; charset=utf-8',
  etag: '00000002-0000-0000-8f0c-1f2967f8d101',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '57c99cb5-487d-4ae2-83f8-e728d23b49c7',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11997',
  'x-ms-correlation-request-id': '3de4e4fd-e8ab-4071-810d-28efee5fc839',
  'x-ms-routing-request-id': 'WESTEUROPE:20160817T091040Z:3de4e4fd-e8ab-4071-810d-28efee5fc839',
  date: 'Wed, 17 Aug 2016 09:10:39 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone-record-set9283/providers/Microsoft.Network/dnszones/example1.com/CNAME/set-cname?api-version=2016-04-01')
  .reply(404, "{\"code\":\"NotFound\",\"message\":\"The resource record 'set-cname' does not exist in resource group 'xplat-test-dns-zone-record-set9283' of subscription '2c224e7e-3ef5-431d-a57b-e71f4662e3a6'.\"}", { 'cache-control': 'private',
  'content-length': '189',
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'dfd0ad1e-d6fb-4284-97d6-386a15316b45',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '44a32443-d29c-428f-9732-5836c3e0019d',
  'x-ms-routing-request-id': 'WESTEUROPE:20160817T091040Z:44a32443-d29c-428f-9732-5836c3e0019d',
  date: 'Wed, 17 Aug 2016 09:10:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone-record-set9283/providers/Microsoft.Network/dnszones/example1.com/CNAME/set-cname?api-version=2016-04-01')
  .reply(404, "{\"code\":\"NotFound\",\"message\":\"The resource record 'set-cname' does not exist in resource group 'xplat-test-dns-zone-record-set9283' of subscription '2c224e7e-3ef5-431d-a57b-e71f4662e3a6'.\"}", { 'cache-control': 'private',
  'content-length': '189',
  'content-type': 'application/json; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'dfd0ad1e-d6fb-4284-97d6-386a15316b45',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '44a32443-d29c-428f-9732-5836c3e0019d',
  'x-ms-routing-request-id': 'WESTEUROPE:20160817T091040Z:44a32443-d29c-428f-9732-5836c3e0019d',
  date: 'Wed, 17 Aug 2016 09:10:40 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone-record-set9283/providers/Microsoft.Network/dnszones/example1.com/CNAME/set-cname?api-version=2016-04-01', '*')
  .reply(201, "{\"id\":\"\\/subscriptions\\/2c224e7e-3ef5-431d-a57b-e71f4662e3a6\\/resourceGroups\\/xplat-test-dns-zone-record-set9283\\/providers\\/Microsoft.Network\\/dnszones\\/example1.com\\/CNAME\\/set-cname\",\"name\":\"set-cname\",\"type\":\"Microsoft.Network\\/dnszones\\/CNAME\",\"etag\":\"e1ea73f2-5526-47a1-b00a-b816b6295734\",\"properties\":{\"fqdn\":\"set-cname.example1.com.\",\"TTL\":3600,\"CNAMERecord\":{\"cname\":\"testcname\"}}}", { 'cache-control': 'private',
  'content-length': '390',
  'content-type': 'application/json; charset=utf-8',
  etag: 'e1ea73f2-5526-47a1-b00a-b816b6295734',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'cf062322-acc4-4ec0-af59-3787a2bf69a0',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '6eb7f98b-d8d1-4b61-a7e2-c8cde3a07bac',
  'x-ms-routing-request-id': 'WESTEUROPE:20160817T091042Z:6eb7f98b-d8d1-4b61-a7e2-c8cde3a07bac',
  date: 'Wed, 17 Aug 2016 09:10:41 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplat-test-dns-zone-record-set9283/providers/Microsoft.Network/dnszones/example1.com/CNAME/set-cname?api-version=2016-04-01', '*')
  .reply(201, "{\"id\":\"\\/subscriptions\\/2c224e7e-3ef5-431d-a57b-e71f4662e3a6\\/resourceGroups\\/xplat-test-dns-zone-record-set9283\\/providers\\/Microsoft.Network\\/dnszones\\/example1.com\\/CNAME\\/set-cname\",\"name\":\"set-cname\",\"type\":\"Microsoft.Network\\/dnszones\\/CNAME\",\"etag\":\"e1ea73f2-5526-47a1-b00a-b816b6295734\",\"properties\":{\"fqdn\":\"set-cname.example1.com.\",\"TTL\":3600,\"CNAMERecord\":{\"cname\":\"testcname\"}}}", { 'cache-control': 'private',
  'content-length': '390',
  'content-type': 'application/json; charset=utf-8',
  etag: 'e1ea73f2-5526-47a1-b00a-b816b6295734',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': 'cf062322-acc4-4ec0-af59-3787a2bf69a0',
  server: 'Microsoft-IIS/8.5',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-resource-requests': '11999',
  'x-ms-correlation-request-id': '6eb7f98b-d8d1-4b61-a7e2-c8cde3a07bac',
  'x-ms-routing-request-id': 'WESTEUROPE:20160817T091042Z:6eb7f98b-d8d1-4b61-a7e2-c8cde3a07bac',
  date: 'Wed, 17 Aug 2016 09:10:41 GMT',
  connection: 'close' });
 return result; }]];