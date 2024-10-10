import { config } from "dotenv";
import mongoose from "mongoose"

config();

export default async function connectToAtlas()  {
    const url = process.env.ATLAS_URL as string;
    const dbName = "root";

    try {
        await mongoose.connect(url, { dbName, })
        console.log(`CONNECTED TO MONGO ATLAS DB: "${dbName}"`)
        return true;
    }
    catch (err) {
        console.log(err)
        console.log(`ERROR CONNECTING TO MONGO ATLAS DB: "${dbName}"`)
        return false;
    }
}
