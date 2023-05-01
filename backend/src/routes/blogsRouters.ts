import { Router } from "express";

// import multer to handle image upload
import upload from "../middlewares/multerConfig";
import {
    getAllBlogPosts,
    getSingleBlogPost,
    addNewBlogPost,
    deleteBlogPost,
    updateBlogPost,
} from "../controllers/blogsControllers";
import { blogImageUpload } from "../middlewares/multerConfig";
import { addPostValidation } from "../middlewares/inputValidation";

const blogsRouter = Router();

blogsRouter.get("/posts", getAllBlogPosts);
// upload single file with key blogImage
blogsRouter.post(
    "/posts/addblogpost",
    blogImageUpload.single("blogImage"),
    //check if title and field exists
    addPostValidation,
    addNewBlogPost
);
blogsRouter
    .route("/post/:id")
    .put(updateBlogPost)
    .get(getSingleBlogPost)
    .delete(deleteBlogPost);

export default blogsRouter;
