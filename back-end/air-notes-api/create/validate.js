const Ajv = require('ajv');

module.exports =  async function (schema, data) {
    var ajv = new Ajv();
    var validate = ajv.compile(schema);
    var valid = validate(data);
    if (!valid){
        return validate.errors;
    } 
}