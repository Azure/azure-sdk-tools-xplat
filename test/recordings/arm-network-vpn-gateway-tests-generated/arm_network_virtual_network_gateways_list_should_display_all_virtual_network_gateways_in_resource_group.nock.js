// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '9532a63e-f2eb-4649-bb23-5ed01077ce80',
    name: 'franks-official-test-sub',
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
  process.env['AZURE_VM_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworkGateways?api-version=2017-06-01')
  .reply(200, "{\r\n  \"value\": [\r\n    {\r\n      \"name\": \"virtualNetworkGatewayName\",\r\n      \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworkGateways/virtualNetworkGatewayName\",\r\n      \"etag\": \"W/\\\"b3da2883-1292-4792-a516-f69ef8611a54\\\"\",\r\n      \"type\": \"Microsoft.Network/virtualNetworkGateways\",\r\n      \"location\": \"westus\",\r\n      \"properties\": {\r\n        \"provisioningState\": \"Succeeded\",\r\n        \"resourceGuid\": \"aed00702-26b7-4145-a133-8059ee8581b9\",\r\n        \"ipConfigurations\": [\r\n          {\r\n            \"name\": \"default-ip-config\",\r\n            \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworkGateways/virtualNetworkGatewayName/ipConfigurations/default-ip-config\",\r\n            \"etag\": \"W/\\\"b3da2883-1292-4792-a516-f69ef8611a54\\\"\",\r\n            \"properties\": {\r\n              \"provisioningState\": \"Succeeded\",\r\n              \"privateIPAllocationMethod\": \"Dynamic\",\r\n              \"publicIPAddress\": {\r\n                \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/publicIPAddresses/publicIPAddressName\"\r\n              },\r\n              \"subnet\": {\r\n                \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/subnets/GatewaySubnet\"\r\n              }\r\n            }\r\n          }\r\n        ],\r\n        \"sku\": {\r\n          \"name\": \"Standard\",\r\n          \"tier\": \"Standard\",\r\n          \"capacity\": 2\r\n        },\r\n        \"gatewayType\": \"Vpn\",\r\n        \"vpnType\": \"RouteBased\",\r\n        \"enableBgp\": false,\r\n        \"activeActive\": false,\r\n        \"vpnClientConfiguration\": {\r\n          \"vpnClientAddressPool\": {\r\n            \"addressPrefixes\": [\r\n              \"15.0.0.0/8\"\r\n            ]\r\n          },\r\n          \"vpnClientProtocols\": [],\r\n          \"vpnClientRootCertificates\": [],\r\n          \"vpnClientRevokedCertificates\": []\r\n        },\r\n        \"bgpSettings\": {\r\n          \"asn\": 65010,\r\n          \"bgpPeeringAddress\": \"10.12.255.30\",\r\n          \"peerWeight\": 0\r\n        }\r\n      }\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '2266',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '666fcf5b-1ef7-41b2-b1e3-f31d589ba38d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '64e3f86f-21de-4889-a5ad-12b25c857a05',
  'x-ms-routing-request-id': 'WESTEUROPE:20170727T122346Z:64e3f86f-21de-4889-a5ad-12b25c857a05',
  date: 'Thu, 27 Jul 2017 12:23:45 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworkGateways?api-version=2017-06-01')
  .reply(200, "{\r\n  \"value\": [\r\n    {\r\n      \"name\": \"virtualNetworkGatewayName\",\r\n      \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworkGateways/virtualNetworkGatewayName\",\r\n      \"etag\": \"W/\\\"b3da2883-1292-4792-a516-f69ef8611a54\\\"\",\r\n      \"type\": \"Microsoft.Network/virtualNetworkGateways\",\r\n      \"location\": \"westus\",\r\n      \"properties\": {\r\n        \"provisioningState\": \"Succeeded\",\r\n        \"resourceGuid\": \"aed00702-26b7-4145-a133-8059ee8581b9\",\r\n        \"ipConfigurations\": [\r\n          {\r\n            \"name\": \"default-ip-config\",\r\n            \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworkGateways/virtualNetworkGatewayName/ipConfigurations/default-ip-config\",\r\n            \"etag\": \"W/\\\"b3da2883-1292-4792-a516-f69ef8611a54\\\"\",\r\n            \"properties\": {\r\n              \"provisioningState\": \"Succeeded\",\r\n              \"privateIPAllocationMethod\": \"Dynamic\",\r\n              \"publicIPAddress\": {\r\n                \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/publicIPAddresses/publicIPAddressName\"\r\n              },\r\n              \"subnet\": {\r\n                \"id\": \"/subscriptions/9532a63e-f2eb-4649-bb23-5ed01077ce80/resourceGroups/xplat-test-vpn-gateway/providers/Microsoft.Network/virtualNetworks/virtualNetworkName/subnets/GatewaySubnet\"\r\n              }\r\n            }\r\n          }\r\n        ],\r\n        \"sku\": {\r\n          \"name\": \"Standard\",\r\n          \"tier\": \"Standard\",\r\n          \"capacity\": 2\r\n        },\r\n        \"gatewayType\": \"Vpn\",\r\n        \"vpnType\": \"RouteBased\",\r\n        \"enableBgp\": false,\r\n        \"activeActive\": false,\r\n        \"vpnClientConfiguration\": {\r\n          \"vpnClientAddressPool\": {\r\n            \"addressPrefixes\": [\r\n              \"15.0.0.0/8\"\r\n            ]\r\n          },\r\n          \"vpnClientProtocols\": [],\r\n          \"vpnClientRootCertificates\": [],\r\n          \"vpnClientRevokedCertificates\": []\r\n        },\r\n        \"bgpSettings\": {\r\n          \"asn\": 65010,\r\n          \"bgpPeeringAddress\": \"10.12.255.30\",\r\n          \"peerWeight\": 0\r\n        }\r\n      }\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '2266',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '666fcf5b-1ef7-41b2-b1e3-f31d589ba38d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14993',
  'x-ms-correlation-request-id': '64e3f86f-21de-4889-a5ad-12b25c857a05',
  'x-ms-routing-request-id': 'WESTEUROPE:20170727T122346Z:64e3f86f-21de-4889-a5ad-12b25c857a05',
  date: 'Thu, 27 Jul 2017 12:23:45 GMT',
  connection: 'close' });
 return result; }]];