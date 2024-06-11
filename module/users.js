import { getUser } from "./user.js"
export const getAllAlbums = async() => {
    let res = await fetch("http://172.16.101.146:5804/users");
    let data = await res.json();
    return data;
}


const addUser = async (userData) => {
    if (
        typeof userData.id !== "string" || 
        typeof userData.name !== "string" || 
        typeof userData.username !== "string" || 
        typeof userData.email !== "string" || 
        typeof userData.phone !== "string" || 
        typeof userData.website !== "string" || 
        typeof userData.address !== "object" || 
        typeof userData.company !== "object" ||
        typeof userData.address.street !== "string" ||
        typeof userData.address.suite !== "string" ||
        typeof userData.address.city !== "string" ||
        typeof userData.address.zipcode !== "string" ||
        typeof userData.address.geo !== "object" ||
        typeof userData.address.geo.lat !== "string" ||
        typeof userData.address.geo.lng !== "string" ||
        typeof userData.company.name !== "string" ||
        typeof userData.company.catchPhrase !== "string" ||
        typeof userData.company.bs !== "string"
    ) {
        return { status: 406, message: `Invalid user data` };
    }

    let config = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    }

    let res = await fetch("http://172.16.101.146:5804/users", config);
    let data = await res.json();
    return data;
}

const deleteUser = async (userId) => {
    // Validación del userId
    if (typeof userId !== "string" || userId === undefined) 
        return { status: 406, message: `Invalid userId` };

    let config = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }

    let res = await fetch(`http://172.16.101.146:5804/users/${userId}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The user you want to delete is not registered` };

    let data = await res.json();
    data.status = 202;
    data.message = `The user was deleted from the database`;
    return data;
}

const updateUser = async (userData) => {
    // Validación de los campos del objeto userData
    if (
        typeof userData.id !== "string" || 
        typeof userData.name !== "string" || 
        typeof userData.username !== "string" || 
        typeof userData.email !== "string" || 
        typeof userData.phone !== "string" || 
        typeof userData.website !== "string" || 
        typeof userData.address !== "object" || 
        typeof userData.company !== "object" ||
        typeof userData.address.street !== "string" ||
        typeof userData.address.suite !== "string" ||
        typeof userData.address.city !== "string" ||
        typeof userData.address.zipcode !== "string" ||
        typeof userData.address.geo !== "object" ||
        typeof userData.address.geo.lat !== "string" ||
        typeof userData.address.geo.lng !== "string" ||
        typeof userData.company.name !== "string" ||
        typeof userData.company.catchPhrase !== "string" ||
        typeof userData.company.bs !== "string"
    ) {
        return { status: 406, message: `Invalid user data` };
    }

    let config = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    }

    let res = await fetch(`http://172.16.101.146:5804/users/${userData.id}`, config);
    if (res.status === 404) 
        return { status: 204, message: `The user you want to update is not registered` };

    let data = await res.json();
    data.status = 200;
    data.message = `The user data was updated successfully`;
    return data;
}
