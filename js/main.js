import { getAllAlbums , addAlbum, deleteAlbum, updateAlbum } from "../modules/albums";
import { addPost, getAllPosts, deletePost, updatePost } from "../module/posts.js";
import { addPhoto, getAllPhotos, deletePhoto, updatePhoto } from "../module/photos.js";
import { getAllComments, addComments, deleteComments, UpdateComments } from "../module/comments.js";
import { getAllUsers, addUser, deleteUser, updateUser } from "../module/users.js";

let menuAlbums = async () => {
    let menu = prompt(`
    ¿ Album Menu ?
        1. Search All
        2. Add
        3. Delete
        4. Update
    `, 1);
    menu = Number(menu);
    if (menu == 1) {
        return await getAllAlbums();
    }
    if (menu == 2) {
        let userId = prompt("Enter the userId: ", "10")
    let title = prompt("Enter the album title: ", "Gallery")
    return await addAlbum({userId, title});
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the album you want to delete");
        return await deleteAlbum({ id });
    }
    if (menu == 4) {
        let id = prompt("Enter the ID of the album you want to update");
        let title = prompt("Enter the new album title: ", "New Gallery");
        return await updateAlbum({ id, title });
    }
};

let menuPosts = async () => {
    let menu = prompt(`
    ¿ Post Menu ?
        1. Search All
        2. Add
        3. Delete
        4. Update
    `, 1);
    menu = Number(menu);
    if (menu == 1) {
        return await getAllPosts();
    }
    if (menu == 2) {
        let userId = prompt("Enter the user id: ", "10");
        let title = prompt("Enter the post title: ", "New Post");
        let body = prompt("Enter the post body: ", "This is a new post");
        return await addPost({ userId, title, body });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the post you want to delete");
        return await deletePost({ id });
    }
    if (menu == 4) {
        let id = prompt("Enter the ID of the post you want to update");
        let title = prompt("Enter the new post title: ", "Updated Post");
        let body = prompt("Enter the new post body: ", "This is an updated post");
        return await updatePost({ id, title, body });
    }
};

let menuPhotos = async () => {
    let menu = prompt(`
    ¿ Photo Menu ?
        1. Search All
        2. Add
        3. Delete
        4. Update
    `, 1);
    menu = Number(menu);
    if (menu == 1) {
        return await getAllPhotos();
    }
    if (menu == 2) {
        let albumId = prompt("Enter the album id: ", "1");
        let title = prompt("Enter the photo title: ", "New Photo");
        let url = prompt("Enter the photo url: ", "http://example.com/photo.jpg");
        return await addPhoto({ albumId, title, url });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the photo you want to delete");
        return await deletePhoto({ id });
    }
    if (menu == 4) {
        let id = prompt("Enter the ID of the photo you want to update");
        let title = prompt("Enter the new photo title: ", "Updated Photo");
        let url = prompt("Enter the new photo url: ", "http://example.com/updated_photo.jpg");
        return await updatePhoto({ id, title, url });
    }
};

let menuUsers = async () => {
    let menu = prompt(`
    ¿ User Menu ?
        1. Search All
        2. Add
        3. Delete
        4. Update
    `, 1);
    menu = Number(menu);
    if (menu == 1) {
        return await getAllUsers();
    }
    if (menu == 2) {
        let name = prompt("Enter the user name: ", "John Doe");
        let username = prompt("Enter the user username: ", "johndoe");
        let email = prompt("Enter the user email: ", "johndoe@example.com");
        return await addUser({ name, username, email });
    }
    if (menu == 3) {
        let id = prompt("Enter the ID of the user you want to delete");
        return await deleteUser({ id });
    }
    if (menu == 4) {
        let id = prompt("Enter the ID of the user you want to update");
        let name = prompt("Enter the new user name: ", "Updated Name");
        let username = prompt("Enter the new user username: ", "updatedusername");
        let email = prompt("Enter the new user email: ", "updatedemail@example.com");
        return await updateUser({ id, name, username, email });
    }
};

let menuComments = async() => {
    let menu = prompt(`
    ¿ Comments Menu ?
        1. Search All
        2. Add
        3. Delete 
        4. Update
    `, 1);
    menu = Number(menu);
    if(menu==1){
        return await getAllComments();
    }
    if(menu==2){
        let postId = prompt("Enter the postId: ", "10");
        let name = prompt("Enter the name: ", "gonzalo");
        let email = prompt("Enter the email: ", "gonzaaa@gmail.com")
        let body = prompt("Enter the body: ", " beltran :)")
        return await addComments ({postId, name, email, body});
    }
    if(menu ==3){
        let id= prompt("Enter to ID of comments you want to delete")
        return await deleteComments({id});
    }
    if(menu == 4){
        return await UpdateComments();
    }
}


let opc = null;
do {
    opc = prompt(`
    ¿ Select an option ?
        1. Albums
        2. Posts
        3. Photos
        4. Users
        0. Exit
    `);
    opc = Number(opc);
    if (opc == 1) alert(JSON.stringify(await menuAlbums(), null, 4));
    if (opc == 2) alert(JSON.stringify(await menuPosts(), null, 4));
    if (opc == 3) alert(JSON.stringify(await menuPhotos(), null, 4));
    if (opc == 4) alert(JSON.stringify(await menuUsers(), null, 4));
} while (opc);
