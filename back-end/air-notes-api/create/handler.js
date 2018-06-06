const AWS = require("aws-sdk");

module.exports.create = (event, context, callback) => {

  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const request = event;
  const body = JSON.parse(request.body);

  var params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
        note: body.note
    }
  };

  dynamoDb.put(params, (error) => {
    if(error) {
      console.log(error);

      callback(null, {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the note item.'
      });
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify(params.Item)
  };

  callback(null, response);

};
