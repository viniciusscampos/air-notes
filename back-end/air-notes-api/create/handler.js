const AWS = require("aws-sdk");
const validator = require('./validate')
const schema = require('./schema')

module.exports.create = async (event, context, callback) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const request = event;
  const body = JSON.parse(request.body);

  const errors = await validator(schema, body);
  if(errors){      
    const response = {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
    return response;
  }

  var params = {
    TableName: process.env.DYNAMODB_TABLE,  
    Item: body
  }

  const response = await dynamoDb.put(params).promise()
  .then((data)=> {
    const response = {
      statusCode: 200,
      body: JSON.stringify(body),
    };

    return response
  }, (error) => {
    console.log(error);
  })

  return response;

}
