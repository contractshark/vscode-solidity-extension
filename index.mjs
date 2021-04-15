import Ajv from 'ajv';
import * as data from './syntaxes/solidity.tmLangauge.json';

var ajv = new Ajv();
var valid = ajv.addSchema(defaultExport.schema, 'mySchema').validate('mySchema', data.default);
if (!valid) {
  throw new Error(ajv.errorsText());
}
