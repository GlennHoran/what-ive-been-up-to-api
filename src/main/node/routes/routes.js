import cors from "cors";
import express from "express";
import serverless from "serverless-http"
import AWS from "aws-sdk/index"
import bodyParser from "body-parser"
import {getBlogPost, putBlogPost} from "./blogPosts";

const app = express();
const dynamoDb= new AWS.DynamoDB.DocumentClient();
const serverlessHandler = serverless(app);

// Serverless boilerplate
async function handler(event, context) {
    return await serverlessHandler(event, context);
}

app.use(bodyParser.json());
app.use(cors());

/////////////////////////////////////////////////////////
//////              Hello world                   //////
///////////////////////////////////////////////////////

app.get("/hello", (request, response) => {
    response.send("Hello world ")
});


app.get("/", async (request, response) => {
    try{
        const result = await getBlogPost(dynamoDb, request.query.id);
        response.send(result);
    } catch(e){
        response.send(400).body(e)
    }
});

app.put("/", async (request, response) => {
    try{
        const result = await putBlogPost(dynamoDb, request.body);
        response.send(result);
    } catch(e){
        response.send(400).body(e)
    }
});



// const port = 3013;
// app.listen(port, () => console.log(`Listening locally on port ${port}`));

export{
    handler, app
}