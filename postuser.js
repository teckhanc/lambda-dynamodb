// Import AWS SDK
const AWS = require('aws-sdk');

// Initialize DynamoDB DocumentClient
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Table name
const TABLE_NAME = 'Users';

// Lambda handler
exports.handler = async (event) => {
  try {
    // Parse the JSON body
    const body = JSON.parse(event.body);
    const { userId, name, email } = body;

    // Define parameters for DynamoDB
    const params = {
      TableName: TABLE_NAME,
      Item: {
        userId: userId,
        name: name,
        email: email
      }
    };

    // Put item into DynamoDB
    await dynamodb.put(params).promise();

    // Success response
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User added successfully!' }),
    };

  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
