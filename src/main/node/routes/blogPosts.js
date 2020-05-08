const tableName = "what-ive-been-up-to-api-dev";

export async function putBlogPost(dynamoDB, blogPost){
    let params = {
        TableName: tableName,
        Item: blogPost
    };
    let responseData = {}
    try {
        console.log("Putting blog post");
        await dynamoDB.put(params, (err, data) => {
            if(err) console.log(err.message);
            else {
                console.log(data);
                responseData = data;
            }
        }).promise()
        return responseData
    } catch(e){
        console.log("something went wrong with put blogPost(): " + e)
        return e
    }

}

export async function getBlogPost(dynamoDB, blogPostId){
    let params = {
        Key: {
            id: parseInt(blogPostId)
        },
        TableName: tableName
    };
    let blogPost = {}
    try {
        console.log(`Getting blog post with ID: ${blogPostId}`);
        await dynamoDB.get(params, (err, data) => {
            if(err) console.log(err.message);
            else {
                console.log(data);
                blogPost = data.Item;
            }
        }).promise()
        return blogPost
    } catch(e){
        console.log("something went wrong with getBlogPost(): " + e)
        return e
    }
}