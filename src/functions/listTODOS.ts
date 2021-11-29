import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async(event) => {

  const { user_id } = event.pathParameters;

  const response = await document.scan({
    TableName: "users_todo",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues:{
      ":user_id" : user_id
    }
  }).promise();

  const users_todos = response.Items;


  if (users_todos) {
    return {
      statusCode: 200,
      body: JSON.stringify ({
        todos: users_todos,
      })
    }
  }

  return {
      statusCode: 400,
      body: JSON.stringify ({
        message: "Nothing is registered yet",        
      })
  }
  
}