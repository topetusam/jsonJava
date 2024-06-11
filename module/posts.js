import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5800/albums");
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
