import { Request, Response } from "express";

//other components imports
import User from "../models/usersSchema";
import { encryptPassword } from "../helper/securePassword";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find({ role: { $ne: "admin" } });

        res.status(200).json({
            message: "List of all users",
            users: allUsers,
        });
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log(error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};
const getUserById = async (req: Request, res: Response) => {
    try {
        //Check if the user exist
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "Can not find user with such id",
            });
        }
        res.status(200).json({
            message: "Successful operation",
            user: user,
        });
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log(error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};
const createUser = async (req: Request, res: Response) => {
    try {
        // 1. Recieve and distructure all data with types
        const { email, password, firstName, lastName } =
            req.body as Partial<userType>;
        // 2. Check if the user exist
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(404).json({
                message: "User with such email already exists",
            });
        }
        // 3. Use exported function to hash the password
        const hashPassword = await encryptPassword(password);

        // 4. Creating user without image:
        const newUser = new User({
            email: email,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            isActive: true,
        });

        //Save user to DB
        const user = await newUser.save();
        if (!user) {
            return res.status(400).json({
                message: "User was not created",
            });
        }
        return res.status(201).json({
            message: "User was created",
        });
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log(error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};
const updateUserById = async (req: Request, res: Response) => {
    try {
        //Check if the user exist
        const userId = req.params.userId;
        const { firstName, lastName, role, isActive }: userType = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "Can not find user with such id",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, role, isActive },
            //new: true: By default, the findByIdAndUpdate method returns the original document before the update. When you set the new option to true, it will return the updated document instead.
            //runValidators: true: Mongoose schemas can have validation rules defined, such as required fields, minlength, maxlength, etc. By default, these validation rules are applied when creating new documents, but not when updating existing ones. Setting the runValidators option to true ensures that the update operation follows the schema validation rules, so any updates that don't meet the criteria will result in an error.
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(500).json({
                message: "An error occurred while updating the user profile.",
            });
        }
        res.status(200).json({
            message: "User has been updated sucessfuly",
        });
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log(error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};
const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({
                message: "Can not find user with such id",
            });
        }
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({
            message: "User was deleted sucessfuly",
        });
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log("An unknown error occurred.");
        } else if (error instanceof Error) {
            console.log(error.message);
        }
        res.status(500).json({
            message: "An unknown error occurred.",
        });
    }
};

export { getAllUsers, getUserById, createUser, updateUserById, deleteUserById };
