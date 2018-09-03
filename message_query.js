'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.query = function(event, context, callback){
	var params = {
		TableName : process.env.DYNAMODB_TABLE,
    IndexName: 'recipient-index',
    KeyConditionExpression: 'recipient = :recipient',
    ExpressionAttributeValues: {
      ':recipient': event.pathParameters.recipient,
    },
	};

  // query the messages
  dynamoDb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t query messages.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
}