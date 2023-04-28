//crypto is a built-in Node.js module for generating cryptographically strong random values.
import crypto from "crypto";
//fs is a built-in Node.js module for working with the file system.
import fs from "fs";
//path is another built-in module for handling and transforming file paths.
import path from "path";
//promisify is a utility function from the util module that converts callback-based functions to Promise-based functions.
import { promisify } from "util";

//Create a promisified version of fs.writeFile. WriteFile is a promisified version of fs.writeFile to enable the use of async/await.
const writeFile = promisify(fs.writeFile);

//This function generates a cryptographically secure random key by creating a buffer of 32 bytes and converting it to a hexadecimal string.
const generateKey = () => {
    return crypto.randomBytes(32).toString("hex");
};

//This is an immediately invoked function expression (IIFE) that defines an asynchronous function and immediately executes it. It uses a try-catch block to handle any errors that might occur during the key generation and file writing process.
(async () => {
    try {
        const sessionSecretKey = generateKey();
        const jwtSecureKey = generateKey();

        //This block generates the SESSION_SECRET_KEY and JWT_SECURE_KEY using the generateKey function and creates a string containing the keys in the format required for the .env file.
        const envContent = `
SESSION_SECRET_KEY=${sessionSecretKey}
JWT_SECURE_KEY=${jwtSecureKey}
`;
        //This block gets the path to the .env file using the path.join() function and writes the content to the file using the promisified writeFile function with the "utf8" encoding and the "a" flag to append the content to the file.
        const envPath = path.join(__dirname, ".env");
        await writeFile(envPath, envContent, { encoding: "utf8", flag: "a" });

        console.log("Keys generated and saved to .env file.");
    } catch (error) {
        console.error("Error generating keys:", error);
    }
})();
