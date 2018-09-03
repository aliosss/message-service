<!--
title: AWS Serverless message service example in NodeJS
description: This example demonstrates a message email service storing the sent emails in AWS DynamoDB. 
layout: Doc
-->
# Serverless Message Service using AWS API Gateway, DynamoDB, Lambda and SES

This example demonstrates a message email service using AWS API Gateway, Lambda and SES. Emails are stored in DynamoDB.

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (24.08 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..........................
Serverless: Stack update finished...
Service Information
service: messages-api
stage: dev
region: us-east-1
stack: messages-api-dev
api keys:
  None
endpoints:
  POST - https://j6o6nftw7d.execute-api.us-east-1.amazonaws.com/dev/messages
  GET - https://j6o6nftw7d.execute-api.us-east-1.amazonaws.com/dev/messages/{recipient}
functions:
  create: messages-api-dev-create
  query: messages-api-dev-query
  notify: messages-api-dev-notify
```

## Usage

### Send a message

```bash
curl -X POST https://j6o6nftw7d.execute-api.us-east-1.amazonaws.com/dev/messages --data '{ "text": "Test text", "sender": "alicos@gmail.com", "subject":"something", "recipient": "alicos@gmail.com" }'
```

### List messages by recipient

```bash
curl https://j6o6nftw7d.execute-api.us-east-1.amazonaws.com/dev/messages/alicos@gmail.com
```
## Notes

- If the AWS account is in SES sandbox, both sender and recipient emails have to verified to be able to send emails.
- Deployed version's POST api endpoint is configured with an authorizer which is authorized by using AWS Cognito User Pool. Alternatively, a lambda based authorization could be used which can use any custom authorization method.