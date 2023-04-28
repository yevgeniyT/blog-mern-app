// in order to connect DB use mongoose
import mongoose from "mongoose";

// inport configuration from index.ts
import dev from "./index";

//creates DB using package mongoose
const connectDB = async () => {
    try {
        // dev.db.url will have an error if not use (|| "") in db: { url: process.env.DB_URL || "" } in config/index.ts
        await mongoose.connect(dev.db.url);
        console.log("Cloud data base is connected");
        //If you simply use catch (error) { console.log(error); }, TypeScript might not raise an error because the error object's properties and methods are not being accessed directly. However, this approach is less safe because it doesn't guarantee that the error object is of a specific type or has specific properties, which could potentially lead to runtime errors. By using type checks, you ensure that your code handles errors more predictably and robustly.
    } catch (error: unknown) {
        if (typeof error === "string") {
            console.log(error);
        } else if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

export default connectDB;
