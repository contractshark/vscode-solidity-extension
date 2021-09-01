
var Ajv = require('ajv');
var ajv = new Ajv();
var validate = ajv.compile(schema);
var valid = validate(data);
if (!valid) console.log(validate.errors);