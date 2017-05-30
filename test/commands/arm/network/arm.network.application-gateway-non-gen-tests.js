/**
 * Copyright (c) Microsoft.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var _ = require('underscore');
var CLITest = require('../../../framework/arm-cli-test');
var constants = require('../../../../lib/commands/arm/network/constants');
var NetworkTestUtil = require('../../../util/networkTestUtil');
var networkUtil = new NetworkTestUtil();
var should = require('should');
var testUtils = require('../../../util/util');
var testPrefix = 'arm-network-application-gateway-non-gen-tests';
var util = require('util');
var utils = require('../../../../lib/util/utils');

var location, groupName = 'xplat-test-app-gw-non-gen',
  gatewayProp = {
    name: 'xplatTestAppGw',
    vnetName: 'xplatTestVnet',
    vnetAddress: '10.0.0.0/8',
    subnetName: 'xplatTestSubnet',
    subnetAddress: '10.0.0.0/11',
    servers: '1.1.1.1',
    defSslCertName: 'cert01',
    defaultSslCertPath: 'test/data/sslCert.pfx',
    httpSettingsProtocol: constants.appGateway.settings.protocol[0],
    httpSettingsPortAddress: 111,
    portValue: 112,
    httpListenerProtocol: 'Https',
    ruleType: constants.appGateway.routingRule.type[0],
    skuName: 'Standard_Small',
    skuTier: 'Standard',
    capacity: 2,
    tags: networkUtil.tags,
    configName: constants.appGateway.gatewayIp.name,
    portName: 'xplatTestPoolName',
    portAddress: 123,
    poolName: 'xplatTestPoolName',
    poolServers: '4.4.4.4,3.3.3.3',
    poolServersNew: '1.2.3.4,3.4.3.3',
    httpSettingsName: 'xplatTestHttpSettings',
    defHttpSettingsName: constants.appGateway.settings.name,
    httpSettingsPort: 234,
    httpSettingsPortNew: 345,
    httpSettingsPort1: 456,
    cookieBasedAffinity: 'Disabled',
    httpProtocol: 'Http',
    httpsProtocol: 'Https',
    httpListenerName: 'xplatTestListener',
    listenerHostName: 'fabrica.com',
    defHttpListenerName: constants.appGateway.httpListener.name,
    ruleName: 'xplatTestRule',
    path: '/',
    pathNew: '/testpath',
    urlPathMapName: 'urlPathMapName01',
    urlMapRuleName: 'urlMapRuleName01',
    defHttpSettingName: constants.appGateway.settings.name,
    httpSettingsName1: 'httpSettingsName1',
    defPoolName: constants.appGateway.pool.name,
    mapPath: '/test',
    newUrlMapRuleName: constants.appGateway.routingRule.name,
    newMapPath: '/test01',
    newMapPath1: '/test02',
    sslCertName: 'cert02',
    sslPassword: 'pswd',
    firewallMode: "Prevention",
    firewallEnabled: true,
    ruleSetType: 'OWASP',
    ruleSetVersion: '3.0',
    disabledRuleGroupName: 'REQUEST-910-IP-REPUTATION',
    disabledRuleGroupRules: '910000,910011,910012',
    wafSkuName: constants.appGateway.sku.name[3],
    wafSkuTier: constants.appGateway.sku.tier[1]
  };

var requiredEnvironment = [{
  name: 'AZURE_VM_TEST_LOCATION',
  defaultValue: 'eastus'
}];

describe('arm', function () {
  describe('network', function () {
    var suite, retry = 5, hour = 60 * 60000;
    before(function (done) {
      suite = new CLITest(this, testPrefix, requiredEnvironment);
      suite.setupSuite(function () {
        location = process.env.AZURE_VM_TEST_LOCATION;
        groupName = suite.isMocked ? groupName : suite.generateId(groupName, null);

        gatewayProp.group = groupName;
        gatewayProp.location = location;
        gatewayProp.name = suite.isMocked ? gatewayProp.name : suite.generateId(gatewayProp.name, null);
        gatewayProp.vnetName = suite.isMocked ? gatewayProp.vnetName : suite.generateId(gatewayProp.vnetName, null);
        gatewayProp.subnetName = suite.isMocked ? gatewayProp.subnetName : suite.generateId(gatewayProp.subnetName, null);
        gatewayProp.configName = suite.isMocked ? gatewayProp.configName : suite.generateId(gatewayProp.configName, null);
        gatewayProp.poolName = suite.isMocked ? gatewayProp.poolName : suite.generateId(gatewayProp.poolName, null);
        gatewayProp.portName = suite.isMocked ? gatewayProp.portName : suite.generateId(gatewayProp.portName, null);
        gatewayProp.httpListenerName = suite.isMocked ? gatewayProp.httpListenerName : suite.generateId(gatewayProp.httpListenerName, null);
        gatewayProp.httpSettingsName = suite.isMocked ? gatewayProp.httpSettingsName : suite.generateId(gatewayProp.httpSettingsName, null);
        gatewayProp.ruleName = suite.isMocked ? gatewayProp.ruleName : suite.generateId(gatewayProp.ruleName, null);
        gatewayProp.urlPathMapName = suite.isMocked ? gatewayProp.urlPathMapName : suite.generateId(gatewayProp.urlPathMapName, null);
        gatewayProp.urlMapRuleName = suite.isMocked ? gatewayProp.urlMapRuleName : suite.generateId(gatewayProp.urlMapRuleName, null);
        gatewayProp.sslCertName = suite.isMocked ? gatewayProp.sslCertName : suite.generateId(gatewayProp.sslCertName, null);

        if (!suite.isPlayback()) {
          networkUtil.createGroup(gatewayProp.group, gatewayProp.location, suite, function () {
            networkUtil.createVnet(gatewayProp.group, gatewayProp.vnetName, gatewayProp.location, gatewayProp.vnetAddress, suite, function () {
              networkUtil.createSubnet(gatewayProp.group, gatewayProp.vnetName, gatewayProp.subnetName, gatewayProp.subnetAddress, suite, function () {
                done();
              });
            });
          });
        } else {
          done();
        }
      });
    });
    after(function (done) {
      this.timeout(hour);
      networkUtil.deleteGroup(groupName, suite, function () {
        suite.teardownSuite(done);
      });
    });
    beforeEach(function (done) {
      suite.setupTest(done);
    });
    afterEach(function (done) {
      suite.teardownTest(done);
    });

    describe('application-gateway non-gen', function () {
      this.timeout(hour);

      it('create should pass', function (done) {
        var cmd = util.format('network application-gateway create {group} {name} -l {location} -e {vnetName} -m {subnetName} ' +
          '-r {servers} -y {defaultSslCertPath} -x {sslPassword} -i {httpSettingsProtocol} -o {httpSettingsPortAddress} -f {cookieBasedAffinity} ' +
          '-j {portValue} -b {httpListenerProtocol} -w {ruleType} -a {skuName} -u {skuTier} -z {capacity} -t {tags} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);

          var appGateway = JSON.parse(result.text);
          appGateway.name.should.equal(gatewayProp.name);
          appGateway.location.should.equal(gatewayProp.location);
          appGateway.sku.name.should.equal(gatewayProp.skuName);
          appGateway.sku.tier.should.equal(gatewayProp.skuTier);
          appGateway.sku.capacity.should.equal(gatewayProp.capacity);

          var ipConfigs = appGateway.gatewayIPConfigurations;
          _.some(ipConfigs, function (ipConfig) {
            return ipConfig.name === gatewayProp.configName;
          }).should.be.true;

          var sslCertificates = appGateway.sslCertificates;
          _.some(sslCertificates, function (sslCert) {
            return sslCert.name === gatewayProp.defSslCertName;
          }).should.be.true;

          var frontendIPs = appGateway.frontendIPConfigurations;
          _.some(frontendIPs, function (frontendIP) {
            return frontendIP.name === constants.appGateway.frontendIp.name;
          }).should.be.true;

          var frontendPorts = appGateway.frontendPorts;
          _.some(frontendPorts, function (frontendPort) {
            return frontendPort.port === gatewayProp.portValue;
          }).should.be.true;

          var addressPools = appGateway.backendAddressPools;
          _.some(addressPools, function (addressPool) {
            return addressPool.name === constants.appGateway.pool.name;
          }).should.be.true;

          var backendHttpSettings = appGateway.backendHttpSettingsCollection;
          _.some(backendHttpSettings, function (settings) {
            return settings.port === gatewayProp.httpSettingsPortAddress
                && settings.protocol.toLowerCase() === gatewayProp.httpSettingsProtocol.toLowerCase()
                && settings.cookieBasedAffinity === gatewayProp.cookieBasedAffinity;
          }).should.be.true;

          var httpListeners = appGateway.httpListeners;
          _.some(httpListeners, function (listener) {
            return listener.protocol.toLowerCase() === gatewayProp.httpListenerProtocol.toLowerCase();
          }).should.be.true;

          networkUtil.shouldHaveTags(appGateway);
          networkUtil.shouldBeSucceeded(appGateway);
          done();
        });
      });

      /*it('list should display all application gateways from all resource groups', function (done) {
        var cmd = 'network application-gateway list --json'.formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var gateways = JSON.parse(result.text);
          _.some(gateways, function (appGw) {
            return appGw.name === gatewayProp.name;
          }).should.be.true;
          done();
        });
      });

      it('list should display application gateways from specified resource group', function (done) {
        var cmd = 'network application-gateway list {group} --json'.formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var gateways = JSON.parse(result.text);
          _.some(gateways, function (appGw) {
            return appGw.name === gatewayProp.name;
          }).should.be.true;
          done();
        });
      });

      it('start should not fail already started application gateway', function (done) {
        var cmd = 'network application-gateway start {group} {name} --json'.formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          done();
        });
      });

      it('url path map create should create map in application gateway', function (done) {
        var cmd = util.format('network application-gateway url-path-map create {group} {name} {urlPathMapName} ' +
          '-r {urlMapRuleName} -p {mapPath} -i {defHttpSettingName} -a {defPoolName} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var appGateway = JSON.parse(result.text);
          appGateway.name.should.equal(gatewayProp.name);

          var urlPathMap = utils.findFirstCaseIgnore(appGateway.urlPathMaps, { name: gatewayProp.urlPathMapName });
          urlPathMap.name.should.equal(gatewayProp.urlPathMapName);
          urlPathMap.pathRules[0].name.should.equal(gatewayProp.urlMapRuleName);
          networkUtil.shouldBeSucceeded(urlPathMap);
          done();
        });
      });

      it('url path map rule create 2nd should create map rule in application gateway', function (done) {
        var cmd = util.format('network application-gateway url-path-map rule create {group} {name} {newUrlMapRuleName} ' +
          '-u {urlPathMapName} -p {newMapPath} -i {defHttpSettingName} -a {defPoolName} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var appGateway = JSON.parse(result.text);
          appGateway.name.should.equal(gatewayProp.name);

          var urlPathMap = utils.findFirstCaseIgnore(appGateway.urlPathMaps, {name: gatewayProp.urlPathMapName});
          urlPathMap.name.should.equal(gatewayProp.urlPathMapName);
          _.some(urlPathMap.pathRules, function (rule) {
            return (rule.name === gatewayProp.newUrlMapRuleName);
          }).should.be.true;
          networkUtil.shouldBeSucceeded(urlPathMap);
          done();
        });
      });

      it('url path map rule show should display created rule of URL path map', function (done) {
        var cmd = 'network application-gateway url-path-map rule show {group} {name} {urlPathMapName} {newUrlMapRuleName} --json'
          .formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var urlPathMapRule = JSON.parse(result.text);
          urlPathMapRule.name.should.equal(gatewayProp.newUrlMapRuleName);
          done();
        });
      });

      it('url path map rule list should display all rules from URL path map', function (done) {
        var cmd = 'network application-gateway url-path-map rule list {group} {name} {urlPathMapName} {urlMapRuleName} --json'.formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var urlPathMapRules = JSON.parse(result.text);
          _.some(urlPathMapRules, function(urlPathMapRule) {
            return urlPathMapRule.name === gatewayProp.newUrlMapRuleName
          }).should.be.true;
          done();
        });
      });

      it('url path map rule set should modify map in application gateway', function (done) {
        var cmd = util.format('network application-gateway http-settings create {group} {name} {httpSettingsName1} ' +
          '-o {httpSettingsPort1} -c {cookieBasedAffinity} -p {httpProtocol} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          cmd = util.format('network application-gateway url-path-map rule set {group} {name} {newUrlMapRuleName} ' +
            '-u {urlPathMapName} -p {newMapPath1} -i {httpSettingsName1} --json').formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var appGateway = JSON.parse(result.text);
            appGateway.name.should.equal(gatewayProp.name);

            var urlPathMap = utils.findFirstCaseIgnore( appGateway.urlPathMaps, {name: gatewayProp.urlPathMapName});
            urlPathMap.name.should.equal(gatewayProp.urlPathMapName);
            _.some(urlPathMap.pathRules, function (rule) {
              return (rule.name === gatewayProp.newUrlMapRuleName && rule.backendHttpSettings && rule.backendAddressPool);
            }).should.be.true;
            networkUtil.shouldBeSucceeded(urlPathMap);
            done();
          });
        });
      });

      it('url path map set should modify map in application gateway', function (done) {
        var cmd = util.format('network application-gateway url-path-map set {group} {name} {urlPathMapName} ' +
          '-i {httpSettingsName1} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var appGateway = JSON.parse(result.text);
          appGateway.name.should.equal(gatewayProp.name);

          var urlPathMap = utils.findFirstCaseIgnore( appGateway.urlPathMaps, {name: gatewayProp.urlPathMapName});
          urlPathMap.name.should.equal(gatewayProp.urlPathMapName);
          urlPathMap.defaultBackendHttpSettings.should.not.be.empty;
          urlPathMap.defaultBackendAddressPool.should.not.be.empty;
          networkUtil.shouldBeSucceeded(urlPathMap);
          done();
        });
      });

      // Changed application gateway state to "Stopped" in this test case.
      it('url path map rule delete should remove map rule in application gateway', function (done) {
        networkUtil.stopAppGateway(gatewayProp, suite, function () {
          var cmd = util.format('network application-gateway url-path-map rule delete {group} {name} {newUrlMapRuleName} ' +
            '-u {urlPathMapName} -q --json').formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var appGateway = JSON.parse(result.text);
            appGateway.name.should.equal(gatewayProp.name);

            var urlPathMap = utils.findFirstCaseIgnore(appGateway.urlPathMaps, {name: gatewayProp.urlPathMapName});
            urlPathMap.name.should.equal(gatewayProp.urlPathMapName);
            _.some(urlPathMap.pathRules, function (rule) {
              return (rule.name === gatewayProp.newUrlMapRuleName);
            }).should.be.false;
            networkUtil.shouldBeSucceeded(urlPathMap);
            done();
          });
        });
      });

      it('url-path-map delete should remove url path map from application gateway', function (done) {
        var cmd = 'network application-gateway url-path-map delete {group} {name} {urlPathMapName} -q --json'
          .formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var appGateway = JSON.parse(result.text);
          appGateway.name.should.equal(gatewayProp.name);
          var urlPathMaps = appGateway.probes;
          _.some(urlPathMaps, function (map) {
            return map.name === gatewayProp.urlPathMapName;
          }).should.be.false;
          networkUtil.shouldBeSucceeded(appGateway);
          done();
        });
      });*/

      it('waf-config create should create application gateway waf config', function (done) {
        var cmd = util.format('network application-gateway set -g {group} --sku-name {wafSkuName} --sku-tier {wafSkuTier} ' +
          '--name {name} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var cmd = util.format('network application-gateway waf-config create -g {group} --waf-mode {firewallMode} ' +
            '--rule-set-type {ruleSetType} --rule-set-version {ruleSetVersion} ' +
            '--enable {firewallEnabled} --gateway-name {name} --json').formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);

            output.firewallMode.should.equal(gatewayProp.firewallMode);
            output.enabled.should.equal(gatewayProp.firewallEnabled);
            output.ruleSetType.should.equal(gatewayProp.ruleSetType);
            output.ruleSetVersion.should.equal(gatewayProp.ruleSetVersion);
            
            done();
          });
        });
      });

      it('disabled-rule-group create should create new disabled rule group', function (done) {
        var cmd = ('network application-gateway waf-config disabled-rule-group create ' +
          '-n {disabledRuleGroupName} -g {group} --gateway-name {name} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.disabledRuleGroups.should.not.be.empty;

          _.some(output.disabledRuleGroups, function (group) {
            return group.ruleGroupName.toLowerCase() === gatewayProp.disabledRuleGroupName.toLowerCase() && !group.rules;
          }).should.be.true;

          done();
        });
      });

      it('disabled-rule-group show should show disabled rule group', function (done) {
        var cmd = ('network application-gateway waf-config disabled-rule-group show ' +
          '-n {disabledRuleGroupName} -g {group} --gateway-name {name} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.ruleGroupName.toLowerCase().should.equal(gatewayProp.disabledRuleGroupName.toLowerCase());
          should.not.exist(output.rules);

          done();
        });
      });

      it('disabled-rule-group list should list all disabled rule groups', function (done) {
        var cmd = ('network application-gateway waf-config disabled-rule-group list ' +
          '-g {group} --gateway-name {name} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.should.not.be.empty;

          _.some(output, function (group) {
            return group.ruleGroupName.toLowerCase() === gatewayProp.disabledRuleGroupName.toLowerCase() && !group.rules;
          }).should.be.true;

          done();
        });
      });

      it('disabled-rule-group set should modify disabled rule group', function (done) {
        var cmd = ('network application-gateway waf-config disabled-rule-group set ' +
          '-n {disabledRuleGroupName} -r {disabledRuleGroupRules} -g {group} --gateway-name {name} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.should.not.be.empty;
          output.disabledRuleGroups.should.not.be.empty;

          _.some(output.disabledRuleGroups, function (group) {
            return group.ruleGroupName.toLowerCase() === gatewayProp.disabledRuleGroupName.toLowerCase() 
                && group.rules.join(',').toLowerCase() === gatewayProp.disabledRuleGroupRules.toLowerCase();
          }).should.be.true;
          
          done();
        });
      });

      it('disabled-rule-group show should show modified disabled rule group', function (done) {
        var cmd = ('network application-gateway waf-config disabled-rule-group show ' +
          '-n {disabledRuleGroupName} -g {group} --gateway-name {name} --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.ruleGroupName.toLowerCase().should.equal(gatewayProp.disabledRuleGroupName.toLowerCase());
          output.rules.join(',').toLowerCase().should.equal(gatewayProp.disabledRuleGroupRules.toLowerCase());

          cmd = 'network application-gateway waf-config show -g {group} --gateway-name {name} --json'.formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);

            output.disabledRuleGroups.should.not.be.empty;

            _.some(output.disabledRuleGroups, function (group) {
              return group.ruleGroupName.toLowerCase() === gatewayProp.disabledRuleGroupName.toLowerCase() 
                  && group.rules.join(',').toLowerCase() === gatewayProp.disabledRuleGroupRules.toLowerCase();
            }).should.be.true;
            
            done();
          });
        });
      });

      it('disabled-rule-group delete should delete disabled rule group', function (done) {
        var cmd = ('network application-gateway waf-config disabled-rule-group delete ' +
          '-n {disabledRuleGroupName} -g {group} --gateway-name {name} --quiet --json').formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var output = JSON.parse(result.text);

          output.should.not.be.empty;
          output.disabledRuleGroups.should.be.empty;

          cmd = 'network application-gateway waf-config show -g {group} --gateway-name {name} --json'.formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);

            output.should.not.be.empty;
            output.disabledRuleGroups.should.be.empty;
            
            done();
          });
        });
      });

      it('waf-config delete should delete application gateway waf config', function (done) {
        var cmd = 'network application-gateway waf-config delete -g {group} --quiet --gateway-name {name} --json'.formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          cmd = 'network application-gateway waf-config show -g {group} --gateway-name {name} --json'.formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });

      it('delete should delete application gateway without waiting', function (done) {
        var cmd = 'network application-gateway delete {group} {name} -q --nowait --json'.formatArgs(gatewayProp);
        testUtils.executeCommand(suite, retry, cmd, function (result) {
          result.exitStatus.should.equal(0);
          var cmd = 'network application-gateway show {group} {name} --json'.formatArgs(gatewayProp);
          testUtils.executeCommand(suite, retry, cmd, function (result) {
            result.exitStatus.should.equal(0);
            var output = JSON.parse(result.text);
            output.should.be.empty;
            done();
          });
        });
      });
    });
  });
});