
import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5801/comments");
    let data = await res.json();
    return data;
}

const addComment = async (commentData) => {

    if (
        typeof commentData.postId !== "number" ||
        typeof commentData.id !== "string" || 
        typeof commentData.name !== "string" || 
        typeof commentData.email !== "string" || 
        typeof commentData.body !== "string"
    ) {
        return { status: 406, message: `Invalid comment data` };
    }

    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData)
    }

    let res = await fetch("http://172.16.101.146:5801/comments", config);
    let data = await res.json();
    return data;
}

const deleteComment = async (commentId) => {
    // Validación del commentId
    if (typeof commentId !== "string" || commentId === undefined) 
        return { status: 406, message: `Invalid commentId` };

    let config = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }

    let res = await fetch(`http://172.16.101.146:5801/comments/${commentId}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The comment you want to delete is not registered` };

    let data = await res.json();
    data.status = 202;
    data.message = `The comment was deleted from the database`;
    return data;
}

const updateComment = async (commentId, updatedCommentData) => {
    // Validación de los parámetros de entrada
    if (
        typeof commentId !== "string" || commentId === undefined ||
        typeof updatedCommentData !== "object" || updatedCommentData === undefined
    ) {
        return { status: 406, message: `Invalid parameters` };
    }

    let config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCommentData)
    }

    let res = await fetch(`http://172.16.101.146:5801/comments/${commentId}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The comment you want to update is not registered` };

    let data = await res.json();
    data.status = 200;
    data.message = `The comment data was updated successfully`;
    return data;
}

