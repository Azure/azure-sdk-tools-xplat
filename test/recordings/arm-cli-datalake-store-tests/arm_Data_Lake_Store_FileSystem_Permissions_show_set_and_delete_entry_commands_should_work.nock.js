// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '46153750-fa3b-4140-bf57-8beb7d5c971a',
    name: 'KonaMDI3_697842',
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
  process.env['AZURE_ARM_TEST_LOCATION'] = 'East US 2';
  process.env['AZURE_ARM_TEST_RESOURCE_GROUP'] = 'xplattestadlsrg01';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'f25794dd-1799-4746-b0cc-33271a200b8b',
  'set-cookie': [ 'UserPrincipalSession=cf228365-0075-4a15-b1ba-a8f19d5557bd; path=/; secure; HttpOnly' ],
  'server-perf': '[f25794dd17994746b0cc33271a200b8b][ AuthTime::1825.40442887253::PostAuthTime::1763110.57810746 ][HdfsGetAclStatus :: 00:00:036 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:062 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:42 GMT',
  connection: 'close',
  'content-length': '271' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': 'f25794dd-1799-4746-b0cc-33271a200b8b',
  'set-cookie': [ 'UserPrincipalSession=cf228365-0075-4a15-b1ba-a8f19d5557bd; path=/; secure; HttpOnly' ],
  'server-perf': '[f25794dd17994746b0cc33271a200b8b][ AuthTime::1825.40442887253::PostAuthTime::1763110.57810746 ][HdfsGetAclStatus :: 00:00:036 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:062 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:42 GMT',
  connection: 'close',
  'content-length': '271' });
 return result; },
function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .put('/webhdfs/v1/%2F?op=MODIFYACLENTRIES&aclspec=user%3A027c28d5-c91d-49f0-98c5-d10134b169b3%3Arwx&api-version=2015-10-01-preview')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-request-id': 'db4b463f-0ead-439d-aeb3-6c53e8aabf9d',
  contentlength: '0',
  'server-perf': '[db4b463f0ead439daeb36c53e8aabf9d][ AuthTime::907.994068741524::PostAuthTime::192.034543977835 ][MODIFYACLENTRIES :: 00:00:338 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:42 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .put('/webhdfs/v1/%2F?op=MODIFYACLENTRIES&aclspec=user%3A027c28d5-c91d-49f0-98c5-d10134b169b3%3Arwx&api-version=2015-10-01-preview')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-request-id': 'db4b463f-0ead-439d-aeb3-6c53e8aabf9d',
  contentlength: '0',
  'server-perf': '[db4b463f0ead439daeb36c53e8aabf9d][ AuthTime::907.994068741524::PostAuthTime::192.034543977835 ][MODIFYACLENTRIES :: 00:00:338 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:42 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\",\"user:027c28d5-c91d-49f0-98c5-d10134b169b3:rwx\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '9d1265ff-1398-460e-823e-b47c035273aa',
  'set-cookie': [ 'UserPrincipalSession=29615a64-e2fd-47f7-9785-65a0efe7d805; path=/; secure; HttpOnly' ],
  'server-perf': '[9d1265ff1398460e823eb47c035273aa][ AuthTime::1914.79033323853::PostAuthTime::1493011.67821087 ][HdfsGetAclStatus :: 00:00:094 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:162 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:45 GMT',
  connection: 'close',
  'content-length': '319' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\",\"user:027c28d5-c91d-49f0-98c5-d10134b169b3:rwx\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '9d1265ff-1398-460e-823e-b47c035273aa',
  'set-cookie': [ 'UserPrincipalSession=29615a64-e2fd-47f7-9785-65a0efe7d805; path=/; secure; HttpOnly' ],
  'server-perf': '[9d1265ff1398460e823eb47c035273aa][ AuthTime::1914.79033323853::PostAuthTime::1493011.67821087 ][HdfsGetAclStatus :: 00:00:094 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:162 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:45 GMT',
  connection: 'close',
  'content-length': '319' });
 return result; },
function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .put('/webhdfs/v1/%2F?op=MODIFYACLENTRIES&aclspec=user%3A027c28d5-c91d-49f0-98c5-d10134b169b3%3A-w-&api-version=2015-10-01-preview')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-request-id': 'f296af37-c14f-4cfb-92e8-537837badaaa',
  contentlength: '0',
  'server-perf': '[f296af37c14f4cfb92e8537837badaaa][ AuthTime::871.215750143706::PostAuthTime::196.312238250349 ][MODIFYACLENTRIES :: 00:00:144 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:47 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .put('/webhdfs/v1/%2F?op=MODIFYACLENTRIES&aclspec=user%3A027c28d5-c91d-49f0-98c5-d10134b169b3%3A-w-&api-version=2015-10-01-preview')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-request-id': 'f296af37-c14f-4cfb-92e8-537837badaaa',
  contentlength: '0',
  'server-perf': '[f296af37c14f4cfb92e8537837badaaa][ AuthTime::871.215750143706::PostAuthTime::196.312238250349 ][MODIFYACLENTRIES :: 00:00:144 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:47 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\",\"user:027c28d5-c91d-49f0-98c5-d10134b169b3:-w-\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '56dec417-e92c-4fa5-881a-2768f43be8bb',
  'server-perf': '[56dec417e92c4fa5881a2768f43be8bb][ AuthTime::954.612699684918::PostAuthTime::206.148441419413 ][HdfsGetAclStatus :: 00:00:109 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:110 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:48 GMT',
  connection: 'close',
  'content-length': '319' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\",\"user:027c28d5-c91d-49f0-98c5-d10134b169b3:-w-\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '56dec417-e92c-4fa5-881a-2768f43be8bb',
  'server-perf': '[56dec417e92c4fa5881a2768f43be8bb][ AuthTime::954.612699684918::PostAuthTime::206.148441419413 ][HdfsGetAclStatus :: 00:00:109 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:110 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:48 GMT',
  connection: 'close',
  'content-length': '319' });
 return result; },
function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .put('/webhdfs/v1/%2F?op=REMOVEACLENTRIES&aclspec=user%3A027c28d5-c91d-49f0-98c5-d10134b169b3&api-version=2015-10-01-preview')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-request-id': 'c6cdd12e-a1a1-446b-8cb3-394a9672e648',
  contentlength: '0',
  'server-perf': '[c6cdd12ea1a1446b8cb3394a9672e648][ AuthTime::892.597089714347::PostAuthTime::199.305339629557 ][REMOVEACLENTRIES :: 00:00:089 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:48 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .put('/webhdfs/v1/%2F?op=REMOVEACLENTRIES&aclspec=user%3A027c28d5-c91d-49f0-98c5-d10134b169b3&api-version=2015-10-01-preview')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-request-id': 'c6cdd12e-a1a1-446b-8cb3-394a9672e648',
  contentlength: '0',
  'server-perf': '[c6cdd12ea1a1446b8cb3394a9672e648][ AuthTime::892.597089714347::PostAuthTime::199.305339629557 ][REMOVEACLENTRIES :: 00:00:089 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:48 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('http://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '8257f595-7156-4f42-9ffd-9b9c7e8a92d3',
  'set-cookie': [ 'UserPrincipalSession=a5ab6392-98f8-41da-a83a-c28553c5aaf3; path=/; secure; HttpOnly' ],
  'server-perf': '[8257f59571564f429ffd9b9c7e8a92d3][ AuthTime::1858.76308854059::PostAuthTime::1102167.38790324 ][HdfsGetAclStatus :: 00:00:035 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:082 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:52 GMT',
  connection: 'close',
  'content-length': '271' });
 return result; },
function (nock) { 
var result = 
nock('https://xplattestadls3181.azuredatalakestore.net:443')
  .get('/webhdfs/v1/%2F?op=GETACLSTATUS&api-version=2015-10-01-preview')
  .reply(200, "{\"AclStatus\":{\"entries\":[\"user::rwx\",\"group::rwx\",\"other::---\",\"mask::rwx\",\"default:user::rwx\",\"default:group::rwx\",\"default:other::---\",\"default:mask::rwx\"],\"owner\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"group\":\"f5181084-3fee-489a-9278-85f6fc92c3bb\",\"stickyBit\":false}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '8257f595-7156-4f42-9ffd-9b9c7e8a92d3',
  'set-cookie': [ 'UserPrincipalSession=a5ab6392-98f8-41da-a83a-c28553c5aaf3; path=/; secure; HttpOnly' ],
  'server-perf': '[8257f59571564f429ffd9b9c7e8a92d3][ AuthTime::1858.76308854059::PostAuthTime::1102167.38790324 ][HdfsGetAclStatus :: 00:00:035 ms]%0a[SS Response Process :: 00:00:000 ms]%0a[GETACLSTATUS :: 00:00:082 ms]%0a',
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=15724800; includeSubDomains',
  date: 'Thu, 19 Nov 2015 22:07:52 GMT',
  connection: 'close',
  'content-length': '271' });
 return result; }]];