import { APIGatewayProxyHandler } from "aws-lambda";
import {v4 as uuid} from "uuid";

import { document } from "../utils/dynamodbClient";

interface ICreateToDo {  
  deadline: string;
  title: string;
}

export const handle: APIGatewayProxyHandler = async(event) => {

  const { user_id } = event.pathParameters;

  const { deadline, title } = JSON.parse(event.body) as ICreateToDo;

  const response = await document.put({
    TableName: "users_todo",
    Item: {
      id: uuid(),
      user_id, 
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  if (response) {
    return {
      statusCode: 200,
      body: JSON.stringify ({
        message: "Tarefa incluída com sucesso!",        
      })
    }
  }

  return {
      statusCode: 400,
      body: JSON.stringify ({
        message: "Erro ao incluir tarefa",        
      })
  }
  
}