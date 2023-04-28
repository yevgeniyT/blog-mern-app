import { Router } from "express";

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
} from "../controllers/adminControllers";
import { isLoggedIn } from "../middlewares/isLoggedIn";
import { isAdmin } from "../middlewares/isAdmin";
import { onCreateUserValidation } from "../middlewares/inputValidation";
import upload from "../middlewares/multerConfig";

const adminRouter = Router();

//This route will first check if the user is logged in using the isLoggedIn middleware. If the user is logged in, the isAdmin middleware will then check if the user has an admin role. If the user is an admin, the getAllUsers controller function will be executed, and the list of all users will be sent as a response.
adminRouter.get("/users", isLoggedIn, isAdmin, getAllUsers);
adminRouter.get("/:userId", isLoggedIn, isAdmin, getUserById);
adminRouter.put("/:userId", isLoggedIn, isAdmin, updateUserById);
adminRouter.delete("/:userId", isLoggedIn, isAdmin, deleteUserById);
adminRouter.post("/users", upload.none(), onCreateUserValidation, createUser);
export default adminRouter;
