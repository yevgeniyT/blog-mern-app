import mongoose, { Schema, Document, model } from "mongoose";

const categoriesEnum = [
    "Technology",
    "Lifestyle",
    "Health",
    "Travel",
    "Business",
    "Food",
    "Entertainment",
    "Education",
    "Personal Development",
    "Environment",
];

const tagsEnum = [
    "Gadgets",
    "Productivity",
    "Fitness",
    "Adventure",
    "Entrepreneurship",
    "Recipes",
    "Movies",
    "Tutorials",
    "Motivation",
    "Sustainability",
];
export interface IBlogPost extends Document {
    title: string;
    slug: string;
    content: string;
    author: Schema.Types.ObjectId;
    categories: string[];
    tags: string[];
    comments: (typeof commentSchema)[];
    blogImage: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const blogPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        // to get unique name
        slug: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            //type: mongoose.Schema.Types.ObjectId: This sets the data type of the author field to be an ObjectId. In MongoDB,
            type: Schema.Types.ObjectId,
            //ref: 'User': This tells Mongoose that the ObjectId in the author field should reference a document in the 'User' collection
            ref: "User",
            // required: true,
            trim: true,
        },
        categories: {
            type: String,
            enum: categoriesEnum,
        },
        blogImage: {
            type: String,
        },
        tags: {
            type: String,
            enum: tagsEnum,
        },
        comments: [commentSchema],
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const moderationActionSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    moderator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
        enum: ["approve", "reject"],
        required: true,
    },
    reason: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const blogPost = model("Posts", blogPostSchema);
const ModerationAction = model("ModerationAction", moderationActionSchema);

export { blogPost, ModerationAction };
