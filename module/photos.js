import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5800/albums");
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

const updatePhoto = async (photoId, updatedPhotoData) => {
    // Validación de los parámetros de entrada
    if (
        typeof photoId !== "string" || photoId === undefined ||
        typeof updatedPhotoData !== "object" || updatedPhotoData === undefined
    ) {
        return { status: 406, message: `Invalid parameters` };
    }

    let config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPhotoData)
    }

    let res = await fetch(`http://172.16.101.146:5803/photos/${photoId}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The photo you want to update is not registered` };

    let data = await res.json();
    data.status = 200;
    data.message = `The photo data was updated successfully`;
    return data;
}
