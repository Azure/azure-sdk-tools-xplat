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
  .get('/nodeagentskus?api-version=2016-02-01.3.0&timeout=30')
  .reply(200, "{\r\n  \"odata.metadata\":\"https://test1.westus.batch.azure.com/$metadata#nodeagentskus\",\"value\":[\r\n    {\r\n      \"id\":\"batch.node.centos 7\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"OpenLogic\",\"offer\":\"CentOS\",\"sku\":\"7.0\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"OpenLogic\",\"offer\":\"CentOS\",\"sku\":\"7.1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"OpenLogic\",\"offer\":\"CentOS\",\"sku\":\"7.2\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Oracle\",\"offer\":\"Oracle-Linux-7\",\"sku\":\"OL70\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.debian 8\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"15.10\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Credativ\",\"offer\":\"Debian\",\"sku\":\"8\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.opensuse 13.2\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"SUSE\",\"offer\":\"openSUSE\",\"sku\":\"13.2\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.opensuse 42.1\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"SUSE\",\"offer\":\"openSUSE-Leap\",\"sku\":\"42.1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"SUSE\",\"offer\":\"SLES\",\"sku\":\"12\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"SUSE\",\"offer\":\"SLES\",\"sku\":\"12-SP1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"SUSE\",\"offer\":\"SLES-HPC\",\"sku\":\"12\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.ubuntu 14.04\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.0-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.1-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.2-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.3-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.4-LTS\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.windows amd64\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"2008-R2-SP1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"2012-Datacenter\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"2012-R2-Datacenter\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"Windows-Server-Technical-Preview\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"windows\"\r\n    }\r\n  ]\r\n}", { 'transfer-encoding': 'chunked',
  'content-type': 'application/json;odata=minimalmetadata',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': '0e9c27fd-ea79-48e6-a4d5-96bf8698268d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': '6c779c6c-28eb-466d-8536-553874cbac90',
  dataserviceversion: '3.0',
  date: 'Fri, 29 Apr 2016 22:50:06 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://test1.westus.batch.azure.com:443')
  .get('/nodeagentskus?api-version=2016-02-01.3.0&timeout=30')
  .reply(200, "{\r\n  \"odata.metadata\":\"https://test1.westus.batch.azure.com/$metadata#nodeagentskus\",\"value\":[\r\n    {\r\n      \"id\":\"batch.node.centos 7\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"OpenLogic\",\"offer\":\"CentOS\",\"sku\":\"7.0\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"OpenLogic\",\"offer\":\"CentOS\",\"sku\":\"7.1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"OpenLogic\",\"offer\":\"CentOS\",\"sku\":\"7.2\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Oracle\",\"offer\":\"Oracle-Linux-7\",\"sku\":\"OL70\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.debian 8\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"15.10\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Credativ\",\"offer\":\"Debian\",\"sku\":\"8\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.opensuse 13.2\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"SUSE\",\"offer\":\"openSUSE\",\"sku\":\"13.2\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.opensuse 42.1\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"SUSE\",\"offer\":\"openSUSE-Leap\",\"sku\":\"42.1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"SUSE\",\"offer\":\"SLES\",\"sku\":\"12\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"SUSE\",\"offer\":\"SLES\",\"sku\":\"12-SP1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"SUSE\",\"offer\":\"SLES-HPC\",\"sku\":\"12\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.ubuntu 14.04\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.0-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.1-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.2-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.3-LTS\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"Canonical\",\"offer\":\"UbuntuServer\",\"sku\":\"14.04.4-LTS\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"linux\"\r\n    },{\r\n      \"id\":\"batch.node.windows amd64\",\"verifiedImageReferences\":[\r\n        {\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"2008-R2-SP1\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"2012-Datacenter\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"2012-R2-Datacenter\",\"version\":\"latest\"\r\n        },{\r\n          \"publisher\":\"MicrosoftWindowsServer\",\"offer\":\"WindowsServer\",\"sku\":\"Windows-Server-Technical-Preview\",\"version\":\"latest\"\r\n        }\r\n      ],\"osType\":\"windows\"\r\n    }\r\n  ]\r\n}", { 'transfer-encoding': 'chunked',
  'content-type': 'application/json;odata=minimalmetadata',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': '0e9c27fd-ea79-48e6-a4d5-96bf8698268d',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': '6c779c6c-28eb-466d-8536-553874cbac90',
  dataserviceversion: '3.0',
  date: 'Fri, 29 Apr 2016 22:50:06 GMT',
  connection: 'close' });
 return result; }]];