'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.write = function(event, context, callback){
  const data = JSON.parse(event.body);

  // Some validation must be added here.
  
	var params = {
		Item : {
			id : uuid.v4(),
			sender : data.sender,
      recipient : data.recipient,
      subject: data.subject,
			text: data.text
		},
		TableName : process.env.DYNAMODB_TABLE
	};

  // write the message to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the message.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });	
}