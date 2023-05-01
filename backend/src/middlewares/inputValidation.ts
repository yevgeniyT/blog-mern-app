import { createValidationMiddleware } from "./createValidationMiddleware";

const onCreateUserValidation = createValidationMiddleware([
    "email",
    "password",
    "firstName",
    "lastName",
]);
const signInValidation = createValidationMiddleware(["email", "password"]);

const resetPasswordValidation = createValidationMiddleware([
    "email",
    "password",
]);

const addPostValidation = createValidationMiddleware(["title", "content"]);
export {
    onCreateUserValidation,
    signInValidation,
    resetPasswordValidation,
    addPostValidation,
};
