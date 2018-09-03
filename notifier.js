'use strict';

var AWS = require('aws-sdk');
var ses = new AWS.SES();

exports.notify = (event, context, callback) => {
  const data = event.Records[0].dynamodb.NewImage;

  const params = {
    Destination: {
      ToAddresses: [ data.recipient.S ],
    },
    Message: {
      Subject: {
        Data: data.subject ? data.subject.S : '',
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: data.text ? data.text.S : 'Template text',
          Charset: 'UTF-8'
        }
      }
    },
    Source: data.sender ? data.sender.S : 'noreply@test.com'
  };

  ses.sendEmail(params, function(error) {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t send email.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: 'success',
    };
    callback(null, response);
  })
};