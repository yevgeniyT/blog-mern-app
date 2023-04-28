import { Router } from "express";

//express-formidable is a middleware for Express.js that simplifies handling form submissions with enctype multipart/form-data. It is particularly useful when your form includes file uploads.
// import formidable from "express-formidable";
// import multer to handle image upload
import upload from "../middlewares/multerConfig";

//other components imports
import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    requestPasswordReset,
    validatePasswordResetToken,
    resetPassword,
} from "../controllers/userController";
// reusable input validation imports
import {
    resetPasswordValidation,
    signInValidation,
    onCreateUserValidation,
} from "../middlewares/inputValidation";
// import dev from "../config";
import { isLoggedIn } from "../middlewares/isLoggedIn";

const userRouter = Router();

//Router for sign in user
userRouter.post(
    "/register",
    upload.single("avatarImage"),
    onCreateUserValidation,
    registerUser
);
//Router for verifying email
userRouter.post("/verify-email", verifyEmail);

userRouter.post("/login", signInValidation, loginUser);
userRouter.get("/logout", logoutUser);

// Read, Update, Delete profile routers using chaining
userRouter
    .route("/profile")
    .get(isLoggedIn, getUserProfile)
    .put(isLoggedIn, updateUserProfile)
    .delete(isLoggedIn, deleteUserProfile);

//Routers tp handele forgot-reset password
userRouter.post("/forgot-password", requestPasswordReset);
userRouter.get("/reset-password/:token", validatePasswordResetToken);
userRouter.put("/reset-password", resetPasswordValidation, resetPassword);

export default userRouter;
