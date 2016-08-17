exports.traverse = function(obj, indent) {
  var self = this;
  if(typeof(obj) != 'string') {
    for (var i in obj) {
      var item = obj[i];
      if (typeof(item) != 'object') {
        showKeyValue.apply(null,[i, item, indent]);
        continue;
      } else {
        if (item !== null) {
          if (i === 'tags') {
            var tagsObj = JSON.stringify(item);
            showKeyValue.apply(null,[i, tagsObj]);
            continue;
          }
          if(!(item instanceof Array)) {
            self.traverse(item, 2);
          } else {
            cli.output.header(utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(i)));
            for(var j in item) {
              self.traverse(item[j], 2);
            }
          }
        }
      }
    }
  } else {
    cli.output.list([utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(obj))], 2, false);
  }
};

exports.removeEmptyObjects = function(test) {
  var self = this;
  for (var i in test) {
    if (typeof (test[i]) === 'object' && Object.getOwnPropertyNames(test[i]).length === 0) {
      delete test[i];
    } else if (typeof test[i] === 'object') {
      self.removeEmptyObjects(test[i]);
    }
  }
};

function getHumanReadableFromCamelCase (inName) {
  if (!inName)
  {
    return inName;
  }

  var varName = inName;
  var outName = '';

  var i = 0;
  while (i < varName.length) {
    if (i === 0 || varName[i] === varName[i].toUpperCase()) {
      if (i > 0) {
        outName += ' ';
      }

      var abbrWords =['VM', 'IP', 'RM', 'OS', 'NAT', 'IDs', 'DNS', 'VNet', 'ASN', 'SubNet'];
      var matched = false;
      var matchedAbbr = '';
      abbrWords.every(function(item) {
        if (varName.substring(i).lastIndexOf(item, 0) === 0) {
          matched = true;
          matchedAbbr = item;
          return false;
        }
        return true;
      });

      if (matched) {
        outName += matchedAbbr;
        i = i + matchedAbbr.length;
      }
      else
      {
        var j = i + 1;
        while ((j < varName.length) && varName[j] == varName[j].toLowerCase())
        {
          j++;
        }
        outName += varName.substring(i, j);
        i = j;
      }
    }
    else
    {
      i++;
    }
  }

  return outName;
}

function showKeyValue(key, value, indent) {
  cli.output.nameValue(utils.capitalizeFirstLetter(getHumanReadableFromCamelCase(key)), value, indent);
}
