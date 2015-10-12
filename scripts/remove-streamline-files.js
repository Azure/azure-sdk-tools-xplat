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

var path = require('path');
var rimraf = require('./rimraf.js');

var getHomeFolder = require('../lib/util/utilsCore').homeFolder;
var streamLineFolder = path.join(getHomeFolder(), '.streamline');

//if needed, we can filter&delete subfolders with namelike '*azure-cli*';
//otherwise, it's safe to clean up other apps' files, which are temp files anyway.
console.log('@@Start to clean:' + streamLineFolder);
setTimeout(cleanup(), 180000000);

function cleanup() {
  rimraf(streamLineFolder, function (er) {
    if (er) {
      throw new Error('@@error and error:' + JSON.stringify(er));
    //throw er;
    }
  })
}

