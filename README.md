# qstring

Comprehensive lightweight query string parser and stringifier + free parsing/output of process.argv.

Features:
  - `import { stringify, parse, parseProcessArgs } from 'qstring'` (or `qstring/dist/` for es2015)
  - `stringify(object);` -> string
  - `parse(queryString);` -> object
  - `parseProcessArgs(process.argv);` -> object
  - `toProcessArgs(object)` -> string
  - 164 SLOC (3.5KiB built vs 1.5KiB GZipped)
  - Dependency free.
  - Performant, less than 1ms for below object on a Dell D430 (2 cores, 1.2Gz, 2GB of RAM)

```javascript
const object = {
  '': 'defaultParamValue',
  example: [123.5, 252.23, 3, 'gaben'],
  level1Name: 'name',
  level1: {
    title: 'level1',
    '@$^strange~)*': '@:~)',
    level2: {
      level3Args: [1, 2, 'c'],
      level3: [{
        level4: 'foo'
      }, , {
        level4: 'bar'
      }]
    }
  }
};

// Output below.

//for readability purposes, using a multiline
const queryString = `
  ?defaultParamValue
  &example[0]=123.5
  &example[1]=252.23
  &example[2]=3
  &example[3]=gaben
  &level1Name=name
  &level1.title=level1
  &level1.%40%24%5Estrange~)*=%40%3A~)
  &level1.level2.level3Args=1
  &level1.level2.level3Args=2
  &level1.level2.level3Args=c
  &level1.level2.level3[].level4=foo
  &level1.level2.level3[2].level4=bar
`.replace(/[\n\t ]/g, ''); //strip all newlines and tabs

const processArgs = `
  --defaultParam 
  --example[0]=123.5 
  --example[1]=252.23 
  --example[2]=3 
  --example[3]=gaben 
  --level1Name=name 
  --level1.title=level1 
  --level1.@$^strange~)*=@:~) 
  --level1.level2.level3Args[0]=1 
  --level1.level2.level3Args[1]=2 
  --level1.level2.level3Args[2]=c --level1.level2.level3[0].level4=foo --level1.level2.level3[2].level4=bar'
```

Thanks, and have fun.
You can email:`dev@rob.pw`, I sometimes take project requests/commissions.
