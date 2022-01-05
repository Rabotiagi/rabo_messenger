const FilesRepo = require("./../../database/repository/fileRepo.js");
const PhotosRepo = require("./../../database/repository/photosRepo.js");

async function getFile(fileId){
    const {path} = await FilesRepo.getFilePath(fileId);
    this.emit('file', path);
}

async function getUserPhoto(id){
    const photo = await PhotosRepo.getPhoto(id);
    this.emit('photo', photo ? photo.path : null);
}

module.exports = {
    getUserPhoto,
    getFile
};