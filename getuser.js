// Import AWS SDK
const AWS = require('aws-sdk');

// Initialize DynamoDB DocumentClient
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Table name
const TABLE_NAME = 'Users';

// Lambda handler
exports.handler = async (event) => {
  try {
    // Get the userId from the query string parameters
    const userId = event.queryStringParameters.userId;

    // Define parameters for DynamoDB
    const params = {
      TableName: TABLE_NAME,
      Key: {
        userId: userId
      }
    };

    // Fetch item from DynamoDB
    const data = await dynamodb.get(params).promise();

    // Check if the item was found
    if (data.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
