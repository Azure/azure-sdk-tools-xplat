// This file has been autogenerated.

var profile = require('../../lib/util/profile');
exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
      id : 'db1ab6f0-4769-4b27-930e-01e2ef9c123c',
      managementCertificate : {
        key : 'mockedKey',
        cert : 'mockedCert'
      },
      name : 'Azure SDK sandbox',
      username : 'user@domain.example',
      registeredProviders : ['website', 'sqlserver'],
      registeredResourceNamespaces : [],
      isDefault : true
    }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.scopes = [
  /*Location list*/
  [

    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/locations')
        .reply(200, "<Locations xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><Location><Name>East Asia</Name><DisplayName>East Asia</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService><AvailableService>PersistentVMRole</AvailableService><AvailableService>HighMemory</AvailableService></AvailableServices></Location><Location><Name>Southeast Asia</Name><DisplayName>Southeast Asia</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService><AvailableService>PersistentVMRole</AvailableService><AvailableService>HighMemory</AvailableService></AvailableServices></Location><Location><Name>North Europe</Name><DisplayName>North Europe</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService><AvailableService>PersistentVMRole</AvailableService><AvailableService>HighMemory</AvailableService></AvailableServices></Location><Location><Name>West Europe</Name><DisplayName>West Europe</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService><AvailableService>PersistentVMRole</AvailableService><AvailableService>HighMemory</AvailableService></AvailableServices></Location><Location><Name>East US</Name><DisplayName>East US</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService><AvailableService>PersistentVMRole</AvailableService><AvailableService>HighMemory</AvailableService></AvailableServices></Location><Location><Name>North Central US</Name><DisplayName>North Central US</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService></AvailableServices></Location><Location><Name>South Central US</Name><DisplayName>South Central US</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService></AvailableServices></Location><Location><Name>West US</Name><DisplayName>West US</DisplayName><AvailableServices><AvailableService>Compute</AvailableService><AvailableService>Storage</AvailableService><AvailableService>PersistentVMRole</AvailableService><AvailableService>HighMemory</AvailableService></AvailableServices></Location></Locations>", {
          'cache-control' : 'no-cache',
          'content-length' : '2413',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : 'c6b61dd1e42a3581b07792eb93a77d35',
          date : 'Thu, 21 Nov 2013 13:48:36 GMT'
        });
      return result;
    }
  ],
  /*List VM*/
  [

    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/services/hostedservices')
        .reply(200, "<HostedServices xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><HostedService><Url>https://management.core.windows.net/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/services/hostedservices/xplattestvm</Url><ServiceName>xplattestvm</ServiceName><HostedServiceProperties><Description i:nil=\" true \"/><Location>West US</Location><Label>QUNTU2VydmljZQ==</Label><Status>Created</Status><DateCreated>2013-10-31T12:22:34Z</DateCreated><DateLastModified>2013-11-21T13:23:12Z</DateLastModified><ExtendedProperties/></HostedServiceProperties></HostedService></HostedServices>", {
          'cache-control' : 'no-cache',
          'content-length' : '4051',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : '5d885d0c15de3972b157f08150763761',
          date : 'Fri, 22 Nov 2013 05:21:37 GMT'
        });
      return result;
    },

    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/services/hostedservices/xplattestvm/deploymentslots/Production')
        .reply(200, "<Deployment xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><Name>xplattestvm</Name><DeploymentSlot>Production</DeploymentSlot><PrivateID>a25f927e85fe49b2b9a85bf4e69f2784</PrivateID><Status>Running</Status><Label>ZUhCc1lYUjBaWE4wZG0wPQ==</Label><Url>http://xplattestvm.cloudapp.net/</Url><Configuration>PFNlcnZpY2VDb25maWd1cmF0aW9uIHhtbG5zOnhzZD0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL1NlcnZpY2VIb3N0aW5nLzIwMDgvMTAvU2VydmljZUNvbmZpZ3VyYXRpb24iPg0KICA8Um9sZSBuYW1lPSJ4cGxhdHRlc3R2bSI+DQogICAgPEluc3RhbmNlcyBjb3VudD0iMSIgLz4NCiAgPC9Sb2xlPg0KPC9TZXJ2aWNlQ29uZmlndXJhdGlvbj4=</Configuration><RoleInstanceList><RoleInstance><RoleName>xplattestvm</RoleName><InstanceName>xplattestvm</InstanceName><InstanceStatus>ReadyRole</InstanceStatus><InstanceUpgradeDomain>0</InstanceUpgradeDomain><InstanceFaultDomain>0</InstanceFaultDomain><InstanceSize>Small</InstanceSize><InstanceStateDetails/><IpAddress>100.69.136.72</IpAddress><PowerState>Started</PowerState><HostName>localhost</HostName></RoleInstance></RoleInstanceList><UpgradeDomainCount>1</UpgradeDomainCount><RoleList><Role i:type=\"PersistentVMRole\"><RoleName>xplattestvm</RoleName><OsVersion/><RoleType>PersistentVMRole</RoleType><ConfigurationSets><ConfigurationSet i:type=\"NetworkConfigurationSet\"><ConfigurationSetType>NetworkConfiguration</ConfigurationSetType><SubnetNames/></ConfigurationSet></ConfigurationSets><DataVirtualHardDisks><DataVirtualHardDisk><HostCaching>None</HostCaching><DiskLabel>xplattestdisk</DiskLabel><DiskName>xplattestdisk</DiskName><LogicalDiskSizeInGB>10</LogicalDiskSizeInGB><MediaLink>http://acsforsdk2.blob.core.windows.net/disks/xplattestdisk</MediaLink></DataVirtualHardDisk></DataVirtualHardDisks><OSVirtualHardDisk><HostCaching>ReadWrite</HostCaching><DiskName>xplattestvm-xplattestvm-0-201311221958580002</DiskName><MediaLink>http://acsforsdk2.blob.core.windows.net/vm-images/j0iislbb.fmp201311221958260919.vhd</MediaLink><SourceImageName>xplattestimg</SourceImageName><OS>Linux</OS></OSVirtualHardDisk><RoleSize>Small</RoleSize></Role></RoleList><SdkVersion/><Locked>false</Locked><RollbackAllowed>false</RollbackAllowed><CreatedTime>2013-11-22T19:56:33Z</CreatedTime><LastModifiedTime>2013-11-22T20:14:46Z</LastModifiedTime><ExtendedProperties/><PersistentVMDowntime><StartTime>2013-09-27T17:00:00Z</StartTime><EndTime>2013-09-29T05:00:00Z</EndTime><Status>PersistentVMUpdateCompleted</Status></PersistentVMDowntime><VirtualIPs><VirtualIP><Address>137.135.61.255</Address><IsDnsProgrammed>true</IsDnsProgrammed><Name>__PseudoBackEndContractVip</Name></VirtualIP></VirtualIPs></Deployment>", {
          'cache-control' : 'no-cache',
          'content-length' : '2445',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : '23b475bd87883e1e9335b43052357f49',
          date : 'Fri, 22 Nov 2013 05:22:18 GMT'
        });
      return result;
    }

  ],

  /*Show VM*/
  [

    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/services/hostedservices')
        .reply(200, "<HostedServices xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><HostedService><Url>https://management.core.windows.net/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/services/hostedservices/xplattestvm</Url><ServiceName>xplattestvm</ServiceName><HostedServiceProperties><Description i:nil=\" true \"/><Location>West US</Location><Label>QUNTU2VydmljZQ==</Label><Status>Created</Status><DateCreated>2013-10-31T12:22:34Z</DateCreated><DateLastModified>2013-11-21T13:23:12Z</DateLastModified><ExtendedProperties/></HostedServiceProperties></HostedService></HostedServices>", {
          'cache-control' : 'no-cache',
          'content-length' : '4051',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : '5d885d0c15de3972b157f08150763761',
          date : 'Fri, 22 Nov 2013 05:21:37 GMT'
        });
      return result;
    },

    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/services/hostedservices/xplattestvm/deploymentslots/Production')
        .reply(200, "<Deployment xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><Name>xplattestvm</Name><DeploymentSlot>Production</DeploymentSlot><PrivateID>a25f927e85fe49b2b9a85bf4e69f2784</PrivateID><Status>Running</Status><Label>ZUhCc1lYUjBaWE4wZG0wPQ==</Label><Url>http://xplattestvm.cloudapp.net/</Url><Configuration>PFNlcnZpY2VDb25maWd1cmF0aW9uIHhtbG5zOnhzZD0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL1NlcnZpY2VIb3N0aW5nLzIwMDgvMTAvU2VydmljZUNvbmZpZ3VyYXRpb24iPg0KICA8Um9sZSBuYW1lPSJ4cGxhdHRlc3R2bSI+DQogICAgPEluc3RhbmNlcyBjb3VudD0iMSIgLz4NCiAgPC9Sb2xlPg0KPC9TZXJ2aWNlQ29uZmlndXJhdGlvbj4=</Configuration><RoleInstanceList><RoleInstance><RoleName>xplattestvm</RoleName><InstanceName>xplattestvm</InstanceName><InstanceStatus>ReadyRole</InstanceStatus><InstanceUpgradeDomain>0</InstanceUpgradeDomain><InstanceFaultDomain>0</InstanceFaultDomain><InstanceSize>Small</InstanceSize><InstanceStateDetails/><IpAddress>100.69.136.72</IpAddress><PowerState>Started</PowerState><HostName>localhost</HostName></RoleInstance></RoleInstanceList><UpgradeDomainCount>1</UpgradeDomainCount><RoleList><Role i:type=\"PersistentVMRole\"><RoleName>xplattestvm</RoleName><OsVersion/><RoleType>PersistentVMRole</RoleType><ConfigurationSets><ConfigurationSet i:type=\"NetworkConfigurationSet\"><ConfigurationSetType>NetworkConfiguration</ConfigurationSetType><SubnetNames/></ConfigurationSet></ConfigurationSets><DataVirtualHardDisks><DataVirtualHardDisk><HostCaching>None</HostCaching><DiskLabel>xplattestdisk</DiskLabel><DiskName>xplattestdisk</DiskName><LogicalDiskSizeInGB>10</LogicalDiskSizeInGB><MediaLink>http://acsforsdk2.blob.core.windows.net/disks/xplattestdisk</MediaLink></DataVirtualHardDisk></DataVirtualHardDisks><OSVirtualHardDisk><HostCaching>ReadWrite</HostCaching><DiskName>xplattestvm-xplattestvm-0-201311221958580002</DiskName><MediaLink>http://acsforsdk2.blob.core.windows.net/vm-images/j0iislbb.fmp201311221958260919.vhd</MediaLink><SourceImageName>xplattestimg</SourceImageName><OS>Linux</OS></OSVirtualHardDisk><RoleSize>Small</RoleSize></Role></RoleList><SdkVersion/><Locked>false</Locked><RollbackAllowed>false</RollbackAllowed><CreatedTime>2013-11-22T19:56:33Z</CreatedTime><LastModifiedTime>2013-11-22T20:14:46Z</LastModifiedTime><ExtendedProperties/><PersistentVMDowntime><StartTime>2013-09-27T17:00:00Z</StartTime><EndTime>2013-09-29T05:00:00Z</EndTime><Status>PersistentVMUpdateCompleted</Status></PersistentVMDowntime><VirtualIPs><VirtualIP><Address>137.135.61.255</Address><IsDnsProgrammed>true</IsDnsProgrammed><Name>__PseudoBackEndContractVip</Name></VirtualIP></VirtualIPs></Deployment>", {
          'cache-control' : 'no-cache',
          'content-length' : '2445',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : '23b475bd87883e1e9335b43052357f49',
          date : 'Fri, 22 Nov 2013 05:22:18 GMT'
        });
      return result;
    }

  ],

  /*Export VM*/
  [

    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/services/hostedservices')
        .reply(200, "<HostedServices xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><HostedService><Url>https://management.core.windows.net/bfb5e0bf-124b-4d0c-9352-7c0a9f4d9948/services/hostedservices/xplattestvm</Url><ServiceName>xplattestvm</ServiceName><HostedServiceProperties><Description>Implicitly created hosted service</Description><Location>West US</Location><Label>eHBsYXR0ZXN0dm0=</Label><Status>Created</Status><DateCreated>2013-11-22T05:21:47Z</DateCreated><DateLastModified>2013-11-22T05:22:06Z</DateLastModified><ExtendedProperties/></HostedServiceProperties></HostedService></HostedServices>", {
          'cache-control' : 'no-cache',
          'content-length' : '4051',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : '5d885d0c15de3972b157f08150763761',
          date : 'Fri, 22 Nov 2013 05:21:37 GMT'
        });
      return result;
    },
    function (nock) {
      var result = nock('https://management.core.windows.net:443')
        .get('/db1ab6f0-4769-4b27-930e-01e2ef9c123c/services/hostedservices/xplattestvm/deploymentslots/Production')
        .reply(200, "<Deployment xmlns=\"http://schemas.microsoft.com/windowsazure\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\"><Name>xplattestvm</Name><DeploymentSlot>Production</DeploymentSlot><PrivateID>170effaeb0e34121aa192c4b1ee0a4a8</PrivateID><Status>Running</Status><Label>ZUhCc1lYUjBaWE4wZG0wPQ==</Label><Url>http://xplattestvm.cloudapp.net/</Url><Configuration>PFNlcnZpY2VDb25maWd1cmF0aW9uIHhtbG5zOnhzZD0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEiIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHhtbG5zPSJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL1NlcnZpY2VIb3N0aW5nLzIwMDgvMTAvU2VydmljZUNvbmZpZ3VyYXRpb24iPg0KICA8Um9sZSBuYW1lPSJ4cGxhdHRlc3R2bSI+DQogICAgPEluc3RhbmNlcyBjb3VudD0iMSIgLz4NCiAgPC9Sb2xlPg0KPC9TZXJ2aWNlQ29uZmlndXJhdGlvbj4=</Configuration><RoleInstanceList><RoleInstance><RoleName>xplattestvm</RoleName><InstanceName>xplattestvm</InstanceName><InstanceStatus>RoleStateUnknown</InstanceStatus><InstanceUpgradeDomain>0</InstanceUpgradeDomain><InstanceFaultDomain>0</InstanceFaultDomain><InstanceSize>Small</InstanceSize><InstanceStateDetails/><IpAddress>100.70.160.148</IpAddress><PowerState>Starting</PowerState></RoleInstance></RoleInstanceList><UpgradeDomainCount>1</UpgradeDomainCount><RoleList><Role i:type=\"PersistentVMRole\"><RoleName>xplattestvm</RoleName><OsVersion/><RoleType>PersistentVMRole</RoleType><ConfigurationSets><ConfigurationSet i:type=\"NetworkConfigurationSet\"><ConfigurationSetType>NetworkConfiguration</ConfigurationSetType><SubnetNames/></ConfigurationSet></ConfigurationSets><DataVirtualHardDisks/><OSVirtualHardDisk><HostCaching>ReadWrite</HostCaching><DiskName>xplattestvm-xplattestvm-0-201311220521540165</DiskName><MediaLink>http://acsforsdk2.blob.core.windows.net/vm-images/m4j0trul.1z0201311220521530491.vhd</MediaLink><SourceImageName>xplattestimg</SourceImageName><OS>Linux</OS></OSVirtualHardDisk><RoleSize>Small</RoleSize></Role></RoleList><SdkVersion/><Locked>false</Locked><RollbackAllowed>false</RollbackAllowed><CreatedTime>2013-11-22T05:21:52Z</CreatedTime><LastModifiedTime>2013-11-22T05:22:10Z</LastModifiedTime><ExtendedProperties/><PersistentVMDowntime><StartTime>2013-09-28T08:00:00Z</StartTime><EndTime>2013-10-04T20:00:00Z</EndTime><Status>PersistentVMUpdateCompleted</Status></PersistentVMDowntime><VirtualIPs><VirtualIP><Address>138.91.158.10</Address><IsDnsProgrammed>true</IsDnsProgrammed><Name>__PseudoBackEndContractVip</Name></VirtualIP></VirtualIPs></Deployment>", {
          'cache-control' : 'no-cache',
          'content-length' : '2445',
          'content-type' : 'application/xml; charset=utf-8',
          server : '1.0.6198.25 (rd_rdfe_stable.131118-1436) Microsoft-HTTPAPI/2.0',
          'x-ms-servedbyregion' : 'ussouth',
          'x-ms-request-id' : '23b475bd87883e1e9335b43052357f49',
          date : 'Fri, 22 Nov 2013 05:22:18 GMT'
        });
      return result;
    }
  ]

]
