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