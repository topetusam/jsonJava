
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

const validateUpdateComments = async({id})=>{
    if(typeof id != "string" || id == undefined){
        return false
    }
    let res = await fetch (`http://172.16.101.146:5801/comments/${id}`)
    if (res.status == 404){
        alert("The Id does not exist")
        return false
    }
    return true;
}

export const UpdateComments = async()=>{
    let id = prompt("Ingrese el Id de los comentarios que desea actualizar: ")
    if(!id){
        alert("ID no proporcionado")
        return false
    }
    if (!(await validateUpdateComments(id))){
        console.log("El ID no es válido o no existe");
        return false;
    }
    let argRes = await fetch (`http://172.16.101.146:5801/comments/${id}`)
    let arg = await argRes.json();

    let newpostId = prompt("Ingrese nuevo postId (deje en blanco para mantener): ");
    if (newpostId) {
        arg.postId = newpostId;
    }

    let newName = prompt("Ingrese nuevo name (deje en blanco para mantener): ");
    if (newName) {
        arg.name = newName;
    }
    let newEmail = prompt("Ingrese nuevo email (deje en blanco para mantener): ");
    if (newEmail) {
        arg.email = newEmail;
    }

    let newBody = prompt("Ingrese nuevo body (deje en blanco para mantener): ");
    if (newBody) {
        arg.body = newBody;
    };
    let config = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(arg)
    };
    let res = await fetch (`http://172.16.101.146:5801/comments/${arg.id}`, config);
    let data = await res.json();
    alert("Comment Actualizado");
    return data; 

}

