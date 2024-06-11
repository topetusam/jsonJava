import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5800/posts");
    let data = await res.json();
    return data;
}

const validateAddPost = async (posts) => {
    if (!Array.isArray(posts) || posts.length === 0)
        return { status: 406, mensaje: "Invalid post structure or empty array" };

    for (let i = 0; i < posts.length; i++) {
        const currentPost = posts[i];
        
        if (
            typeof currentPost.userId !== "number" || 
            typeof currentPost.id !== "string" || 
            typeof currentPost.title !== "string" || 
            typeof currentPost.body !== "string"
        ) {
            return { status: 406, mensaje: `Invalid structure or data in post at index ${i}` };
        }
    }

    return null;
}

export const addPosts = async (posts) => {
    let val = await validateAddPost(posts);
    
    if (val) 
        return val;

    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
    }

    let res = await fetch("http://172.16.101.146:5800/posts", config);
    let data = await res.json();
    return data;
}

const validateDeletePost = async ({ id }) => {
    if (typeof id !== "string" || id === undefined) 
        return { status: 406, message: `The post to search does not exist` }
}

export const deletePost = async (arg) => {
    let val = await validateDeletePost(arg);
    if (val) return val;

    let config = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }

    let res = await fetch(`http://172.16.101.146:5800/posts/${arg.id}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The post you want to delete is not registered` }

    let data = await res.json();
    data.status = 202;
    data.message = `The post was deleted from the database`;
    return data;
}

const validateUpdatePost = async (postData) => {
    if (
        typeof postData.userId !== "number" || 
        typeof postData.id !== "string" || 
        typeof postData.title !== "string" || 
        typeof postData.body !== "string"
    ) {
        return { status: 406, message: `Invalid post data` };
    }
}

export const updatePost = async (postData) => {
    let val = await validateUpdatePost(postData);
    if (val) return val;

    let config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    }

    let res = await fetch(`http://172.16.101.146:5800/posts/${postData.id}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The post you want to update is not registered` };

    let data = await res.json();
    data.status = 200;
    data.message = `The post data was updated successfully`;
    return data;
}

