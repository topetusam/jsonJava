import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5802/albums");
    let data = await res.json();
    return data;
}

const validateAddAlbum = async({userId, title}) => {
    if (typeof userId !== "string" || userId === undefined) return { status: 406, mensaje: "userId is invalid"};
    if (typeof title !== "string" || title === undefined)  return { status: 406, mensaje: "title is invalid" };
    let user = await getUser ({userId});
    if(user.status == 204) return {status: 200, message: `El usuario buscado no existe`}
}
export const addAlbum = async(arg)=>{
    let val = await validateAddAlbum(arg);
    if (val) return val;
    let config={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(arg),
}

let res =await fetch("http://172.16.101.146:5802/albums", config);
let data = await res.json();
return data;id
}


const validateDeleteAlbum = async({id}) => {
    if (typeof id !== "string" || id === undefined) return {status: 406, message: `The album to search does not exist`}
}

export const deleteAlbum = async(arg)=>{
    let val = await validateDeleteAlbum(arg);
    if (val) return val;
    let config={
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    }

    let res =await fetch(`http://172.16.101.146:5802/albums/${arg.id}`, config);
    if(res.status===404) return {status: 204, message: `The album you want to deleate is not registered in albums`}
    let data = await res.json();
    data.status = 202
    data.message = `The album was deleted from the database`;
    return data;
}