// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '00977cdb-163f-435f-9c32-39ec8ae61f4d',
    name: 'node',
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
  process.env['AZURE_ARM_TEST_LOCATION'] = 'West US';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039?api-version=2015-11-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xDeploymentTestGroup4039' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-reads': '14990',
  'x-ms-request-id': 'ca4b7cdc-a656-4f5b-b992-d2d16db8edb3',
  'x-ms-correlation-request-id': 'ca4b7cdc-a656-4f5b-b992-d2d16db8edb3',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211432Z:ca4b7cdc-a656-4f5b-b992-d2d16db8edb3',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:32 GMT',
  connection: 'close',
  'content-length': '116' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039?api-version=2015-11-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xDeploymentTestGroup4039' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-reads': '14990',
  'x-ms-request-id': 'ca4b7cdc-a656-4f5b-b992-d2d16db8edb3',
  'x-ms-correlation-request-id': 'ca4b7cdc-a656-4f5b-b992-d2d16db8edb3',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211432Z:ca4b7cdc-a656-4f5b-b992-d2d16db8edb3',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:32 GMT',
  connection: 'close',
  'content-length': '116' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039?api-version=2015-11-01', '*')
  .reply(201, "{\"id\":\"/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourceGroups/xDeploymentTestGroup4039\",\"name\":\"xDeploymentTestGroup4039\",\"location\":\"westus\",\"tags\":{},\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '211',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-request-id': '7fd7b7bf-f19b-4ae6-9555-87857d034035',
  'x-ms-correlation-request-id': '7fd7b7bf-f19b-4ae6-9555-87857d034035',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211433Z:7fd7b7bf-f19b-4ae6-9555-87857d034035',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:32 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039?api-version=2015-11-01', '*')
  .reply(201, "{\"id\":\"/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourceGroups/xDeploymentTestGroup4039\",\"name\":\"xDeploymentTestGroup4039\",\"location\":\"westus\",\"tags\":{},\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '211',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-request-id': '7fd7b7bf-f19b-4ae6-9555-87857d034035',
  'x-ms-correlation-request-id': '7fd7b7bf-f19b-4ae6-9555-87857d034035',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211433Z:7fd7b7bf-f19b-4ae6-9555-87857d034035',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:32 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039/providers/Microsoft.Resources/deployments/Deploy1358/validate?api-version=2015-11-01', '*')
  .reply(400, "{\"error\":{\"code\":\"InvalidTemplate\",\"message\":\"Deployment template validation failed: 'The value for the template parameter 'siteLocation' at line '1' and column '248' is not provided. Please see http://aka.ms/arm-deploy/#parameter-file for usage details.'.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-request-id': '0406d246-7e30-488c-aaec-5083a8ed4102',
  'x-ms-correlation-request-id': '0406d246-7e30-488c-aaec-5083a8ed4102',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211433Z:0406d246-7e30-488c-aaec-5083a8ed4102',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:33 GMT',
  connection: 'close',
  'content-length': '259' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.post('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039/providers/Microsoft.Resources/deployments/Deploy1358/validate?api-version=2015-11-01', '*')
  .reply(400, "{\"error\":{\"code\":\"InvalidTemplate\",\"message\":\"Deployment template validation failed: 'The value for the template parameter 'siteLocation' at line '1' and column '248' is not provided. Please see http://aka.ms/arm-deploy/#parameter-file for usage details.'.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-writes': '1199',
  'x-ms-request-id': '0406d246-7e30-488c-aaec-5083a8ed4102',
  'x-ms-correlation-request-id': '0406d246-7e30-488c-aaec-5083a8ed4102',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211433Z:0406d246-7e30-488c-aaec-5083a8ed4102',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:33 GMT',
  connection: 'close',
  'content-length': '259' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039/providers/Microsoft.Resources/deployments/Deploy1358?api-version=2015-11-01', '*')
  .reply(400, "{\"error\":{\"code\":\"InvalidTemplate\",\"message\":\"Deployment template validation failed: 'The value for the template parameter 'siteLocation' at line '1' and column '248' is not provided. Please see http://aka.ms/arm-deploy/#parameter-file for usage details.'.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-request-id': '70100a87-61ac-44ea-aa67-12306f245602',
  'x-ms-correlation-request-id': '70100a87-61ac-44ea-aa67-12306f245602',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211434Z:70100a87-61ac-44ea-aa67-12306f245602',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:33 GMT',
  connection: 'close',
  'content-length': '259' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039/providers/Microsoft.Resources/deployments/Deploy1358?api-version=2015-11-01', '*')
  .reply(400, "{\"error\":{\"code\":\"InvalidTemplate\",\"message\":\"Deployment template validation failed: 'The value for the template parameter 'siteLocation' at line '1' and column '248' is not provided. Please see http://aka.ms/arm-deploy/#parameter-file for usage details.'.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-request-id': '70100a87-61ac-44ea-aa67-12306f245602',
  'x-ms-correlation-request-id': '70100a87-61ac-44ea-aa67-12306f245602',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211434Z:70100a87-61ac-44ea-aa67-12306f245602',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:33 GMT',
  connection: 'close',
  'content-length': '259' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .delete('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039?api-version=2015-11-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01',
  'retry-after': '15',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-request-id': '1147a428-cf17-4ec7-bff8-cff77bab2899',
  'x-ms-correlation-request-id': '1147a428-cf17-4ec7-bff8-cff77bab2899',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211436Z:1147a428-cf17-4ec7-bff8-cff77bab2899',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:35 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .delete('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xDeploymentTestGroup4039?api-version=2015-11-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01',
  'retry-after': '15',
  'x-ms-ratelimit-remaining-subscription-writes': '1198',
  'x-ms-request-id': '1147a428-cf17-4ec7-bff8-cff77bab2899',
  'x-ms-correlation-request-id': '1147a428-cf17-4ec7-bff8-cff77bab2899',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211436Z:1147a428-cf17-4ec7-bff8-cff77bab2899',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:14:35 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01',
  'retry-after': '15',
  'x-ms-ratelimit-remaining-subscription-reads': '14997',
  'x-ms-request-id': '67943955-5230-40f6-bbf2-cd74c14f90d0',
  'x-ms-correlation-request-id': '67943955-5230-40f6-bbf2-cd74c14f90d0',
  'x-ms-routing-request-id': 'WESTUS:20160130T211506Z:67943955-5230-40f6-bbf2-cd74c14f90d0',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:15:06 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01')
  .reply(202, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01',
  'retry-after': '15',
  'x-ms-ratelimit-remaining-subscription-reads': '14997',
  'x-ms-request-id': '67943955-5230-40f6-bbf2-cd74c14f90d0',
  'x-ms-correlation-request-id': '67943955-5230-40f6-bbf2-cd74c14f90d0',
  'x-ms-routing-request-id': 'WESTUS:20160130T211506Z:67943955-5230-40f6-bbf2-cd74c14f90d0',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:15:06 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-request-id': '5e390174-93aa-4fb0-abcb-229c11f38dfb',
  'x-ms-correlation-request-id': '5e390174-93aa-4fb0-abcb-229c11f38dfb',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211537Z:5e390174-93aa-4fb0-abcb-229c11f38dfb',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:15:36 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/operationresults/eyJqb2JJZCI6IlJFU09VUkNFR1JPVVBERUxFVElPTkpPQi1YREVQTE9ZTUVOVFRFU1RHUk9VUDQwMzktV0VTVFVTIiwiam9iTG9jYXRpb24iOiJ3ZXN0dXMifQ?api-version=2015-11-01')
  .reply(200, "", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-reads': '14998',
  'x-ms-request-id': '5e390174-93aa-4fb0-abcb-229c11f38dfb',
  'x-ms-correlation-request-id': '5e390174-93aa-4fb0-abcb-229c11f38dfb',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T211537Z:5e390174-93aa-4fb0-abcb-229c11f38dfb',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 21:15:36 GMT',
  connection: 'close',
  'content-length': '0' });
 return result; }]];
 exports.randomTestIdsGenerated = function() { return ['xDeploymentTestGroup4039','Deploy1358'];};