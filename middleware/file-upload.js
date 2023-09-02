const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const typeMap ={
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb)=> {
            cb(null, 'uploads/images')
        }, 
        filename: (req, file, cb) => {
            const ext = typeMap[file.mimetype];
            cb(null, uuidv4() + '.' + ext);
        } 
    }),
    fileFilter: (req, file, cb) => {
        const isValid = typeMap[file.mimetype];
        const error = isValid ? null : new Error('Invalid Mime Type!'); 
        cb(error, isValid);
    }
});


module.exports = fileUpload;