import test from 'tape';
import { parse, stringify, parseProcessArgs } from '../';

const object = {
  '?': 'defaultParam',
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

const qs = `
  ?defaultParam
  &example=[123.5,252.23,3,gaben]
  &level1Name=name
  &level1.title=level1
  &level1.%40%24%5Estrange~)*=%40%3A~)
  &level1.level2.level3Args=1
  &level1.level2.level3Args=2
  &level1.level2.level3Args=c
  &level1.level2.level3[].level4=foo
  &level1.level2.level3[2].level4=bar
`.replace(/[\n\t ]/g, '');



test('Can convert an object into a queryString', t => {
  const queryString = stringify(object);
  t.equal(queryString, '?defaultParam&example[0]=123.5&example[1]=252.23&example[2]=3&example[3]=gaben&level1Name=name&level1.title=level1&level1.%40%24%5Estrange~)*=%40%3A~)&level1.level2.level3Args[0]=1&level1.level2.level3Args[1]=2&level1.level2.level3Args[2]=c&level1.level2.level3[0].level4=foo&level1.level2.level3[2].level4=bar');
  t.end();
})

test('Can convert a queryString into an object', t => {
  const queryObject = parse(qs);
  t.deepEqual(queryObject, object);
  t.end();
})

test('Can convert process.args into an object or queryString', t => {
  const queryObject = parseProcessArgs(process.argv);
  const queryString = stringify(queryObject);

  t.equal(queryString, '?param=1&flag=true&nested.query[2].params=6&sequence=H-Arg-PEPTIDE-OH&observed[0]=123.5&observed[1]=252.23&observed[2]=3&observed[3]=gaben');
  t.deepEqual(queryObject, {
    "param":1,
    "flag":true,
    "nested": {
      "query":[, , {
        "params":6
      }]
    },
    sequence: 'H-Arg-PEPTIDE-OH',
    observed: [123.5, 252.23, 3, 'gaben']
  });
  t.end();
});
