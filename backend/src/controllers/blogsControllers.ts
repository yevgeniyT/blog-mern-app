import { Request, Response } from "express";

//other components imports

import slugify from "slugify";
import { errorHandler, successHandler } from "../helper/requestHandler";
import { blogPost } from "../models/blogsSchema";

const getAllBlogPosts = (req: Request, res: Response) => {
    try {
        // use reusable function to handle seccess status
        return successHandler(
            res,
            200,
            "All blog posts retrieved successfully",
            []
        );
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log("Error while getting all posts:", error.message);
        }
        return res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};

const addNewBlogPost = async (req: Request, res: Response) => {
    try {
        // 1.Distracture data we get from frontend
        const { title, content, category } = req.body;
        const blogImage = req.file;

        // 2. Create variable to store data from frontend

        const newBlogPost = new blogPost({
            title: title,
            slug: slugify(title),
            content: content,
            category: category,
            // tags: tags,
            blogImage: blogImage?.path,
        });
        // 3. Save blog post ot DB
        const blogPostsData = await newBlogPost.save();

        if (!blogPostsData)
            return errorHandler(res, 400, "Blog post was not created");

        return successHandler(
            res,
            200,
            "New blog post has been added",
            newBlogPost
        );
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log("Error while adding new post:", error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};
const getSingleBlogPost = async (req: Request, res: Response) => {
    try {
        // Your implementation logic goes here
        // For example: Fetch data, update data, delete data, etc.

        return successHandler(
            res,
            200,
            "Blog post is retrieved successfully",
            []
        );
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log("Error while getting single post:", error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};

const deleteBlogPost = async (req: Request, res: Response) => {
    try {
        // Your implementation logic goes here
        // For example: Fetch data, update data, delete data, etc.

        return successHandler(res, 200, "Blog is deleted successfully", []);
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log("Error while deleting post:", error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};

const updateBlogPost = async (req: Request, res: Response) => {
    try {
        // Your implementation logic goes here
        // For example: Fetch data, update data, delete data, etc.

        return successHandler(res, 200, "Blog is updated successfully", []);
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log("Error while updating post:", error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};
export {
    getAllBlogPosts,
    getSingleBlogPost,
    addNewBlogPost,
    deleteBlogPost,
    updateBlogPost,
};
