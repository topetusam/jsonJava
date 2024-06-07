import { getAllAlbums , addAlbum, deleteAlbum, updateAlbum} from "../modules/albums.js";
import { addPost } from "../module/post.js";

let menuAlbums =async() => {

let menu =prompt(`
¿ Album Menu ?
    1. Search All
    2. Add
    3. Delete
`, 1);
menu = Number(menu);
if(menu == 1) {
    return await getAllAlbums();
}
if(menu ==2) 
{
    let userId = prompt("Enter the user id: ", "10")
    let title = prompt("Enter the album title: ", "Gallery")
    return await addAlbum({userId, title});
}
if(menu ==3){
    let id= prompt("Enter to ID of the album you want to delete")
    return await deleteAlbum({id});
}

}
let opc = null;
do{
    opc = prompt(`
    ¿ Select an option ?
        1. Albums
        2. Posts
        0. Exit
    `)
    opc= Number(opc);
    if(opc==1) alert(JSON.stringify(await menuAlbums(), null, 4));
}while(opc)