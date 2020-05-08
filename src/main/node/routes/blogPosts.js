const tableName = "what-ive-been-up-to-api-dev";

export async function putBlogPost(dynamoDB, blogPost){
    let params = {
        TableName: tableName,
        Item: blogPost
    };
    let response = {}
    try {
        console.log("Putting blog post");
        await dynamoDB.put(params, (err, data) => {
            if(err) console.log(err.message);
            else {
                console.log(data);
                response = data;
            }
        }).promise()
        return response
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

export async function getBlogPosts(dynamoDB, blogPostId){
    let params = {
        TableName: tableName
    };
    let blogPosts = {}
    try {
        console.log(`Getting blog post with ID: ${blogPostId}`);
        await dynamoDB.scan(params, (err, data) => {
            if(err) console.log(err.message);
            else {
                console.log(data);
                blogPosts = data.Items;
            }
        }).promise()
        return blogPosts
    } catch(e){
        console.log("something went wrong with getBlogPosts(): " + e)
        return e
    }
}

export async function deleteBlogPost(dynamoDB, blogPostId){
    let params = {
        Key: {
            id: parseInt(blogPostId)
        },
        TableName: tableName
    };
    let response = {}

    try {
        console.log(`Deleting post with: ${blogPostId}`);
        await dynamoDB.scan(params, (err, data) => {
            if(err) console.log(err.message);
            else {
                console.log(data);
                response = data;
            }
        }).promise()
        return response
    } catch(e){
        console.log("something went wrong with deleteBlogPost(): " + e)
        response = e
    }
}