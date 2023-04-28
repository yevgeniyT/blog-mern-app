// not implementer yet

import cloudinary from "../config/setCloudinary";

const uploadAvatarImage = async (imageDataUrl: string) => {
    try {
        const response = await cloudinary.uploader.upload(imageDataUrl, {
            // is set up in cloudery acount in settings/upload
            upload_preset: "unsigned_upload",
            // is set up in cloudinary acount, the folder to store images
            folder: "blog-app-avatars",
            allowed_formats: [
                "png",
                "jpg",
                "jpeg",
                "svg",
                "ico",
                "jfif",
                "webp",
            ],
        });
        return response.public_id;
    } catch (error) {
        console.error("Error uploading image:", error);
    }
};

export { uploadAvatarImage };
