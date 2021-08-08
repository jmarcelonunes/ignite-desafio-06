import { v4 as uuidV4 } from 'uuid';
import { document } from "../utils/dynamodbClient";

interface ICreateToDo {
  title: string,
  deadline: Date
}

interface ITemplate {
  id: string;
  userid: string;
  title: string;
  done: boolean;
  deadline: Date;
}

export const handle = async (event) => {
    const { title, deadline } = JSON.parse(event.body) as ICreateToDo;
    const {userid} = event.pathParameters;
    const id = uuidV4();
    const todo : ITemplate = {
      id,
      userid,
      done: false,
      title,
      deadline
    }

    await document
      .put({
        TableName: "users_to_do",
        Item: todo
      })
      .promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "To do created!",
            content: todo,
        }),
        headers: {
            "Content-type": "application/json",
        },
    };
};