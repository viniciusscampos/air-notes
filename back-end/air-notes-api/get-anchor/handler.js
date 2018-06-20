const AWS = require("aws-sdk");

module.exports.create = async (event, context, callback) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const request = event;
  const body = JSON.parse(request.body);

  // check if anchor is already in use
  var params = {
    Key: {
      "anchor": body.anchor
    }
  } 
  
  let data = await docClient.get(params).promise()

  if (data && data.Item && data.Item.payload) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    return response;
  }

  const response = {
    statusCode: 404,
    message: "No anchor was found with that id",
  };
  return response;

}
