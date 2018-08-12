# qstring

Super simple lightweight query string parser and stringifier. 89 SLOC.

  - `import * as Query from 'qstring'` (or `qstring/dist/` for es2015)
  - `Query.stringify(object);` -> query string
  - `Query.parse(string);` -> object

```javascript
const object = {
  level1Name: 'name',
  level1: {
    title: 'level1',
    level2: {
      level3Args: [1, 2, 'c'],
      level3: [{
        level4: 'foo'
      }, {
        level4: 'bar'
      }]
    }
  }
};

//for readability purposes, using a multiline
const qs = `
  ?level1Name=name&level1.title=level1
  &level1.level2.level3Args=1
  &level1.level2.level3Args=2
  &level1.level2.level3Args=c
  &level1.level2.level3[].level4=foo
  &level1.level2.level3[2].level4=bar
`.replace(/[\n\t ]/g, ''); //strip all newlines and tabs
```

Thanks, and have fun.
`dev@rob.pw`, I sometimes take project requests/commissions.
