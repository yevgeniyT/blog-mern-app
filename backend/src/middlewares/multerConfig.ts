import multer from "multer";
import path from "path";
// Set up Multer storage for avatar images with a custom disk storage engine,
// specifying the destination folder for uploaded files as "src/uploads/avatars".
const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Use process.cwd() instead of __dirname to get the correct directory,
        // considering that the code will be transpiled to the 'dist' folder when using TypeScript.
        cb(null, path.join(process.cwd(), "src/uploads/avatars"));
    },
    // Generate a unique filename for each uploaded file, by combining the current timestamp with the original file name.
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const blogImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "src/uploads/blogImages"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const avatarUpload = multer({ storage: avatarStorage });
const blogImageUpload = multer({ storage: blogImageStorage });

export { avatarUpload, blogImageUpload };
