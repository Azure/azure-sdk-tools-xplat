// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '6e0b24a6-2bef-4598-9bd3-f87e9700e24c',
    name: 'Windows Azure Internal Consumption',
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
  process.env['AZURE_BATCH_ACCOUNT'] = 'test1';
  process.env['AZURE_BATCH_ENDPOINT'] = 'https://test1.westus.batch.azure.com';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://test1.westus.batch.azure.com:443')
  .post('/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z/disablescheduling?api-version=2016-02-01.3.0&timeout=30')
  .reply(200, "", { 'transfer-encoding': 'chunked',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': 'e62041b5-7afb-4418-887f-00fe47a76303',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': 'f49ef403-f29f-446f-ac13-ae6a06467689',
  dataserviceversion: '3.0',
  dataserviceid: 'https://test1.westus.batch.azure.com/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z/disablescheduling',
  date: 'Fri, 22 Apr 2016 06:11:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://test1.westus.batch.azure.com:443')
  .post('/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z/disablescheduling?api-version=2016-02-01.3.0&timeout=30')
  .reply(200, "", { 'transfer-encoding': 'chunked',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': 'e62041b5-7afb-4418-887f-00fe47a76303',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': 'f49ef403-f29f-446f-ac13-ae6a06467689',
  dataserviceversion: '3.0',
  dataserviceid: 'https://test1.westus.batch.azure.com/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z/disablescheduling',
  date: 'Fri, 22 Apr 2016 06:11:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://test1.westus.batch.azure.com:443')
  .get('/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z?api-version=2016-02-01.3.0&timeout=30')
  .reply(200, "{\r\n  \"odata.metadata\":\"https://test1.westus.batch.azure.com/$metadata#nodes/@Element\",\"id\":\"tvm-1650185656_1-20160422t053728z\",\"url\":\"https://test1.westus.batch.azure.com/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z\",\"state\":\"offline\",\"schedulingState\":\"disabled\",\"stateTransitionTime\":\"2016-04-22T06:12:00.3618707Z\",\"lastBootTime\":\"2016-04-22T05:54:18.8040259Z\",\"allocationTime\":\"2016-04-22T05:37:28.0108159Z\",\"ipAddress\":\"10.80.34.68\",\"affinityId\":\"TVM:tvm-1650185656_1-20160422t053728z\",\"vmSize\":\"small\",\"totalTasksRun\":0,\"totalTasksSucceeded\":0,\"runningTasksCount\":0\r\n}", { 'transfer-encoding': 'chunked',
  'content-type': 'application/json;odata=minimalmetadata',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': 'eebbe0e7-35f1-4127-adcb-06d63c19ffc4',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': 'eb7b67b5-8617-423b-9d4b-841dea7a20d7',
  dataserviceversion: '3.0',
  date: 'Fri, 22 Apr 2016 06:11:59 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://test1.westus.batch.azure.com:443')
  .get('/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z?api-version=2016-02-01.3.0&timeout=30')
  .reply(200, "{\r\n  \"odata.metadata\":\"https://test1.westus.batch.azure.com/$metadata#nodes/@Element\",\"id\":\"tvm-1650185656_1-20160422t053728z\",\"url\":\"https://test1.westus.batch.azure.com/pools/xplatTestPool/nodes/tvm-1650185656_1-20160422t053728z\",\"state\":\"offline\",\"schedulingState\":\"disabled\",\"stateTransitionTime\":\"2016-04-22T06:12:00.3618707Z\",\"lastBootTime\":\"2016-04-22T05:54:18.8040259Z\",\"allocationTime\":\"2016-04-22T05:37:28.0108159Z\",\"ipAddress\":\"10.80.34.68\",\"affinityId\":\"TVM:tvm-1650185656_1-20160422t053728z\",\"vmSize\":\"small\",\"totalTasksRun\":0,\"totalTasksSucceeded\":0,\"runningTasksCount\":0\r\n}", { 'transfer-encoding': 'chunked',
  'content-type': 'application/json;odata=minimalmetadata',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': 'eebbe0e7-35f1-4127-adcb-06d63c19ffc4',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': 'eb7b67b5-8617-423b-9d4b-841dea7a20d7',
  dataserviceversion: '3.0',
  date: 'Fri, 22 Apr 2016 06:11:59 GMT',
  connection: 'close' });
 return result; }]];