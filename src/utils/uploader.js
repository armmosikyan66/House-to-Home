import multer from 'multer';
import * as path from "path";
import * as fs from "fs";
import fileFilter from "./helpers/fileFilter.js";
import generateUniqueNumber from "./helpers/generateUniqueNumber.js";
import {fileURLToPath} from "url";
import {dirname} from "path";

const generatedFolder = generateUniqueNumber(1, 999999).toString();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directoryPath = path.join(__dirname, "..", "..", 'static', 'uploads', generatedFolder);
        fs.mkdir(directoryPath, {recursive: true}, (err) => cb(err, directoryPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024
    }
});

const uploadMultipleFiles = (req, res, next) => {
    upload.array('images')(req, res, (err) => {
        if (err) {
            return next(err);
        }
        const files = req.files;
        const folderName = path.basename(path.dirname(files[0].path));
        const fileUrls = files.map(file => `/uploads/${folderName}/${file.filename}`);

        req.images = fileUrls;

        next();
    });
};

export default uploadMultipleFiles;
