const AWS = require("aws-sdk");

module.exports.getAnchor = async (event, context, callback) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const request = event;
  const body = JSON.parse(request.body);

  // check if anchor is already in use
  var params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      "anchor": body.anchor
    }
  } 
  
  let data = await dynamoDb.get(params).promise()

  if (data && data.Item) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
    return response;
  }

  const response = {
    statusCode: 404,
    body: JSON.stringify({message: "No anchor was found with that id"})
  };
  return response;

}
