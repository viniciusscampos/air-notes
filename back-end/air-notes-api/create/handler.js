const AWS = require("aws-sdk");
const validator = require('./validate')
const schema = require('./schema')

module.exports.create = async (event, context, callback) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const request = event;
  const body = JSON.parse(request.body);

  // validate client data
  const errors = await validator(schema, body);
  if(errors){      
    const response = {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
    return response;
  }

  // check if anchor is already in use
  var check = {
    Key: {
      "anchor": body.anchor
    }
  } 

  var records = await docClient.get(check).promise()
  
  if (records && records.Item && records.Item.payload) {
    const response = {
      statusCode: 403,
      message: "Anchor is already in use.",
      body: JSON.stringify(body),
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
