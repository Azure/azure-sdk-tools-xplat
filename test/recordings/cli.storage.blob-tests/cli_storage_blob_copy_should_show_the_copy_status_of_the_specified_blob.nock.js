// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'a0d901ba-9956-4f7d-830c-2d7974c36666',
    name: 'Azure Storage DM Dev',
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
  process.env['AZURE_STORAGE_CONNECTION_STRING'] = 'DefaultEndpointsProtocol=https;AccountName=xplat;AccountKey=null';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://xplat.blob.core.windows.net:443')
  .head('/testblobcopydest/toCopy')
  .reply(200, "", { 'content-length': '10',
  'content-type': 'text/plain',
  'content-md5': 'aOEJ8PQMpyoV4FzCJ4b45g==',
  'last-modified': 'Wed, 20 Jul 2016 10:00:13 GMT',
  'accept-ranges': 'bytes',
  etag: '"0x8D3B084A480057E"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': 'fd8a4117-0001-0039-7c6d-e2d6a3000000',
  'x-ms-version': '2015-04-05',
  'x-ms-write-protection': 'false',
  'x-ms-lease-status': 'unlocked',
  'x-ms-lease-state': 'available',
  'x-ms-blob-type': 'BlockBlob',
  'x-ms-copy-id': 'e16c7aa9-8fc4-4604-b1a5-0413fdb8f11a',
  'x-ms-copy-source': 'https://xplat.blob.core.windows.net/testblobcopysource/toCopy?se=2016-07-27T10%3A00%3A14Z&sp=r&sv=2015-04-05&sr=b&sig=ASEs2Z1h8R6DBQVXWxNM%2FmXSjFgYmdoaK6CZRal%2FyLo%3D',
  'x-ms-copy-status': 'success',
  'x-ms-copy-progress': '10/10',
  'x-ms-copy-completion-time': 'Wed, 20 Jul 2016 10:00:13 GMT',
  date: 'Wed, 20 Jul 2016 10:00:13 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://xplat.blob.core.windows.net:443')
  .head('/testblobcopydest/toCopy')
  .reply(200, "", { 'content-length': '10',
  'content-type': 'text/plain',
  'content-md5': 'aOEJ8PQMpyoV4FzCJ4b45g==',
  'last-modified': 'Wed, 20 Jul 2016 10:00:13 GMT',
  'accept-ranges': 'bytes',
  etag: '"0x8D3B084A480057E"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': 'fd8a4117-0001-0039-7c6d-e2d6a3000000',
  'x-ms-version': '2015-04-05',
  'x-ms-write-protection': 'false',
  'x-ms-lease-status': 'unlocked',
  'x-ms-lease-state': 'available',
  'x-ms-blob-type': 'BlockBlob',
  'x-ms-copy-id': 'e16c7aa9-8fc4-4604-b1a5-0413fdb8f11a',
  'x-ms-copy-source': 'https://xplat.blob.core.windows.net/testblobcopysource/toCopy?se=2016-07-27T10%3A00%3A14Z&sp=r&sv=2015-04-05&sr=b&sig=ASEs2Z1h8R6DBQVXWxNM%2FmXSjFgYmdoaK6CZRal%2FyLo%3D',
  'x-ms-copy-status': 'success',
  'x-ms-copy-progress': '10/10',
  'x-ms-copy-completion-time': 'Wed, 20 Jul 2016 10:00:13 GMT',
  date: 'Wed, 20 Jul 2016 10:00:13 GMT',
  connection: 'close' });
 return result; }]];