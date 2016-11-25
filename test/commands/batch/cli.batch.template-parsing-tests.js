//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';

var should = require('should');
var fs = require('fs');
var path = require('path');

var utils = require('../../../lib/util/utils');
var CLITest = require('../../framework/arm-cli-test');
var templateUtils = require('../../../lib/commands/batch/batch.templateUtils');


describe('cli', function () {
  describe('batch template parsing', function () {
    before(function (done) {
      done();
    });
    
    after(function (done) {
      done();
    });
    
    beforeEach(function (done) {
      done();
    });
    
    afterEach(function (done) {
      done();
    });

    describe('validateParameterUsage', function () {
      //TODO
    });

    describe('expression evaluation', function() {

      it('should replace a string containing only an expression', function(done) {
        const definition = {
          value : "['evaluateMe']"
        };
        const template = JSON.stringify(definition);
        const parameters = { };
        const result = templateUtils.parseTemplate(template, definition, parameters);
        result.value.should.equal("evaluateMe");
        done();
      });

      it('should replace an expression within a string', function(done) {
        const definition = {
          value : "prequel ['alpha'] sequel"
        };
        const template = JSON.stringify(definition);
        const parameters = { };
        const result = templateUtils.parseTemplate(template, definition, parameters);
        result.value.should.equal("prequel alpha sequel");
        done();
      });

      it('should replace multiple expressions within a string', function(done) {
        const definition = {
          value : "prequel ['alpha'] interquel ['beta'] sequel"
        };
        const template = JSON.stringify(definition);
        const parameters = { };
        const result = templateUtils.parseTemplate(template, definition, parameters);
        result.value.should.equal("prequel alpha interquel beta sequel");
        done();
      });

      it('should unescape an escaped expression', function(done) {
        const definition = {
          value : "prequel [['alpha'] sequel"
        };
        const template = JSON.stringify(definition);
        const parameters = { };
        const result = templateUtils.parseTemplate(template, definition, parameters);
        result.value.should.equal("prequel ['alpha'] sequel");
        done();
      });

      it('should not choke on JSON containing string arrays', function(done) {
        const definition = {
          values : [ 'alpha', 'beta', 'gamma', '[43]']
        };
        const template = JSON.stringify(definition);
        const parameters = { };
        const result = templateUtils.parseTemplate(template, definition, parameters);
        result.values[3].should.equal("43");
        done();
      });

      it('should not choke on JSON containing number arrays', function(done) {
        const definition = {
          values : [ 1, 1, 2, 3, 5, 8, 13]
        };
        const template = JSON.stringify(definition);
        const parameters = { };
        const result = templateUtils.parseTemplate(template, definition, parameters);
        result.values[3].should.equal(3);
        done();
      });
    });

    describe('parameters() function', function() {

      it('should replace string value for a string parameter', function(done) {

        // Arrange
        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "string"
            }
          }
        };
        const parameters = {
          code : "stringValue"
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);
        // Assert

        resolved.result.should.equal("stringValue");

        done();
      });

      it('should replace numeric value for string parameter as a string', function(done) {

        // Arrange
        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "string"
            }
          }
        };
        const parameters = {
          code : 42
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);
        // Assert

        resolved.result.should.equal("42");  // Expect a string

        done();
      });

      it('should replace int value for int parameter', function(done) {

        // Arrange
        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "int"
            }
          }
        };
        const parameters = {
          code : 42
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal(42);

        done();
      });

      it('should replace string value for int parameter as int', function(done) {

        // Arrange
        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "int"
            }
          }
        };
        const parameters = {
          code : "42"
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal(42);

        done();
      });

      it('should replace int values for int parameters in nested expressions', function(done) {

        // Arrange
        const template = {
          framesize : "Framesize is ([parameters('width')]x[parameters('height')]).",
          parameters : {
            width : {
              type: "int"
            },
            height : {
              type : "int"
            }
          }
        };

        const parameters = {
          width : 1920,
          height: 1080
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.framesize.should.equal("Framesize is (1920x1080).");

        done();
      });

      it('should replace bool value for bool parameter', function(done) {

        // Arrange
        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "bool"
            }
          }
        };
        const parameters = {
          code : true
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal(true);

        done();
      });

      it('should replace string value for bool parameter as bool value', function(done) {

        // Arrange
        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "bool"
            }
          }
        };
        const parameters = {
          code : "true"
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal(true);

        done();
      });

      it('should report an error for an unsupported parameter type', function(done) {

        const template = {
          result : "[parameters('code')]",
          parameters : {
            code : {
              "type": "currency"
            }
          }
        };
        const parameters = {
          code : true
        };
        const templateString = JSON.stringify(template);

        should.throws( function() { templateUtils.parseTemplate( templateString, template, parameters); });

        done();
      });

    });

    describe('variables() function', function() {

      it('should replace value for a variable', function(done) {

        // Arrange
        const template = {
          result : "[variables('code')]",
          variables : {
            code : "enigmatic"
          }
        };
        const parameters = 
        {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("enigmatic");

        done();
      });

      it('should replace function result for a variable', function(done) {

        // Arrange
        const template = {
          result : "[variables('code')]",
          variables : {
            code : "[concat('this', '&', 'that')]"
          }
        };
        const parameters = 
        {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("this&that");

        done();
      });

    });

    describe('concat() function', function () {

      it('should handle strings', function(done) {

        // Arrange
        const template = {
          result : "[concat('alpha', 'beta', 'gamma')]"
        };
        const parameters = {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("alphabetagamma");

        done();
      });

      it('should handle strings and numbers', function(done) {

        // Arrange
        const template = {
          result : "[concat('alpha', 42, 'beta', 3, '.', 1415, 'gamma')]"
        };
        const parameters = {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("alpha42beta3.1415gamma");

        done();
      });

      it('should handle strings containing commas correctly', function(done) {

        // Arrange
        const template = {
          result : "[concat('alpha', ', ', 'beta', ', ', 'gamma')]"  // five strings; strings 2 and 4 are 'comma space''
        };
        const parameters = {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("alpha, beta, gamma");

        done();
      });

      it('should handle strings containing square brackets correctly', function(done) {

        // Arrange
        const template = {
          result : "[concat('alpha', '[', 'beta', ']', 'gamma')]"
        };
        const parameters = {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("alpha[beta]gamma");

        done();
      });

      it('should handle with nested parameters() function calls', function(done) {

        // Arrange
        const template = {
          result : "[concat('alpha ', parameters('name'), ' gamma')]",
          parameters : {
            name : {
              type: "string"
            }
          }
        };
        const parameters = {
          name : "Frodo"
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("alpha Frodo gamma");

        done();
      });

      it('should handle with nested concat function calls', function(done) {

        // Arrange
        const template = {
          result : "[concat('alpha ', concat('this', '&', 'that'), ' gamma')]"
        };
        const parameters = {
        };
        const templateString = JSON.stringify(template);

        // Act
        const resolved = templateUtils.parseTemplate( templateString, template, parameters);

        // Assert
        resolved.result.should.equal("alpha this&that gamma");

        done();
      });
    });
  });
});
