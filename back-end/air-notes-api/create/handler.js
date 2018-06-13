const AWS = require("aws-sdk");
const validator = require('./validate')
const schema = require('./schema')

module.exports.create = async (event, context, callback) => {

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const request = event;
    const body = JSON.parse(request.body);

    validator(schema, body)

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
  } catch (error) {
      console.log(error)
      const response = {
        statusCode: 500,
        body: JSON.stringify(error),
      };

      return response
  }
}
