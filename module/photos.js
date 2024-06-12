import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5803/photos");
    let data = await res.json();
    return data;
}

const addPhoto = async (photoData) => {
    // Validación de los campos del objeto photoData
    if (
        typeof photoData.albumId !== "number" ||
        typeof photoData.id !== "string" || 
        typeof photoData.title !== "string" || 
        typeof photoData.url !== "string" || 
        typeof photoData.thumbnailUrl !== "string"
    ) {
        return { status: 406, message: `Invalid photo data` };
    }

    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photoData)
    }

    let res = await fetch("http://172.16.101.146:5803/photos", config);
    let data = await res.json();
    return data;
}

const deletePhoto = async (photoId) => {
    // Validación del photoId
    if (typeof photoId !== "string" || photoId === undefined) 
        return { status: 406, message: `Invalid photoId` };

    let config = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }

    let res = await fetch(`http://172.16.101.146:5803/photos/${photoId}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The photo you want to delete is not registered` };

    let data = await res.json();
    data.status = 202;
    data.message = `The photo was deleted from the database`;
    return data;
}

const validateUpdatePhotos = async(id)=>{
    if(typeof id != "string" || id == undefined){
        return false
    }
    let res = await fetch (`http://172.16.101.146:5803/photos/${id}`)
    if (res.status == 404){
        alert("The Id does not exist")
        return false
    }
    return true;
}

export const UpdatePhotos = async()=>{
    let id = prompt("Ingrese el Id de las photos que desea actualizar: ")
    if(!id){
        alert("ID no proporcionado")
        return false
    }
    if (!(await validateUpdatePhotos(id))){
        console.log("El ID no es válido o no existe");
        return false;
    }
    let argRes = await fetch (`http://172.16.101.146:5803/photos/${id}`)
    let arg = await argRes.json();

    let newalbumId = prompt("Ingrese nuevo albumId (deje en blanco para mantener): ");
    if (newalbumId) {
        arg.albumId = newalbumId;
    }

    let newtitle = prompt("Ingrese nuevo title (deje en blanco para mantener): ");
    if (newtitle) {
        arg.title = newtitle;
    }
    let newurl = prompt("Ingrese nuevo url (deje en blanco para mantener): ");
    if (newurl) {
        arg.url = newurl;
    }

    let newthumbnailUrl = prompt("Ingrese nuevo thumbnailUrl (deje en blanco para mantener): ");
    if (newthumbnailUrl) {
        arg.thumbnailUrl = newthumbnailUrl;
    }

    let config = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(arg)
    };
    let res = await fetch (`http://172.16.101.146:5803/photos/${arg.id}`, config);
    let data = await res.json();
    alert("Photos Actualizado");
    return data; 

}