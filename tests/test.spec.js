import test from 'tape';
import * as Query from '../';

const object = {
  level1Name: 'name',
  level1: {
    title: 'level1',
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
  ?level1Name=name&level1.title=level1
  &level1.level2.level3Args=1
  &level1.level2.level3Args=2
  &level1.level2.level3Args=c
  &level1.level2.level3[].level4=foo
  &level1.level2.level3[2].level4=bar
`.replace(/[\n\t ]/g, '');

test('Can convert an object into a queryString', t => {
  const queryString = Query.stringify(object);
  t.equal(queryString, '?level1Name=name&level1.title=level1&level1.level2.level3Args[0]=1&level1.level2.level3Args[1]=2&level1.level2.level3Args[2]=c&level1.level2.level3[0].level4=foo&level1.level2.level3[2].level4=bar');
  t.end();
})

test('Can convert a queryString into an object', t => {
  const queryObject = Query.parse(qs);
  t.deepEqual(queryObject, object);
  t.end();
})

// test('Can convert a queryString with brackets but without an index into an object', t => {
//   const qsSansIndexes = '?level1Name=name&level1.title=level1&level1.level2.level3Args=1&level1.level2.level3Args=2&level1.level2.level3Args=c&level1.level2.level3[].level4=foo&level1.level2.level3[].level4=bar';
//   const queryObject = Query.parse(qsSansIndexes);
//   t.deepEqual(queryObject, object);
//   t.end();
// });
