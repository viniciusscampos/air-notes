const AWS = require("aws-sdk")

module.exports.create = async (event, context, callback) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const request = event;
  const body = JSON.parse(request.body);

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
