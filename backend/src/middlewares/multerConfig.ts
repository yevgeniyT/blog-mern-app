//This configuration sets up Multer with a custom disk storage engine, specifying the destination folder for uploaded files as "src/uploads/". The filename is generated using the current timestamp and the original filename. This helps avoid filename collisions and maintain uniqueness.
import multer from "multer";

const storage = multer.diskStorage({
    //sets the destination folder for the uploaded files to "src/uploads/
    destination: function (req, file, cb) {
        cb(null, "src/uploads/avatars");
    },
    // /generates a unique filename for each uploaded file, by combining the current timestamp with the original file name.
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// upload will be used as middleware
const upload = multer({ storage: storage });

export default upload;
