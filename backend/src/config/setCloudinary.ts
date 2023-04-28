import { v2 as cloudinary } from "cloudinary";

import dev from ".";

// 1. Configuration
cloudinary.config({
    cloud_name: dev.cloudinary.cloud_name,
    api_key: dev.cloudinary.api_key,
    api_secret: dev.cloudinary.api_secret,
});

export default cloudinary;
