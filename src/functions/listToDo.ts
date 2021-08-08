import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";


export const handle: APIGatewayProxyHandler = async (event) => {
    const {userid} = event.pathParameters;
    const response = await document
    .query({
      TableName: "users_to_do",
      KeyConditionExpression: "userid = :userid",
      ExpressionAttributeValues: {
        ":userid": userid,
      },
    })
    .promise();

    const toDoExists = response.Items[0];

    if(toDoExists){
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "To dos encontrados",
                ToDos: response.Items,
            }),
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Nenhum To Do foi encontrado para esse usuário",
        }),
    }

}