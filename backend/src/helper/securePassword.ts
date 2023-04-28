import bcrypt from "bcryptjs";

// create fanction that will encrypt password

//Both hash() and compare() functions from bcryptjs return a Promise. Therefore, you should indicate that they are async functions and return a Promise:
const encryptPassword = async (
    plaintextPassword: string | undefined
): Promise<string> => {
    // Define the length of the salt for hashing
    const saltRounds = 10;

    if (!plaintextPassword) {
        return Promise.reject(new Error("Password is not provided"));
    }

    try {
        return bcrypt.hash(plaintextPassword, saltRounds);
    } catch (error) {
        return Promise.reject(error);
    }
};

// fuction that will compare password from input with encrypt password
const checkPassword = async (
    plaintextPassword: string,
    hashPassword: string
): Promise<boolean> => {
    // use await as without it user will pass varification with any password
    return await bcrypt.compare(plaintextPassword, hashPassword);
};

export { encryptPassword, checkPassword };
