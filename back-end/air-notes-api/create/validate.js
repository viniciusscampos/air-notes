const Ajv = require('ajv');

module.exports =  function (schema, data) {
    var ajv = new Ajv();
    var validate = ajv.compile(schema);
    var valid = validate(data);
    if (!valid) throw new Error(validate.errors);
}