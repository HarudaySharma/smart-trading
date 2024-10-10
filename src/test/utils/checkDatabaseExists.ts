import mongoose from "mongoose";
// Replace with your MongoDB Atlas connection string

export default async function checkDatabaseExists(dbName: string) {
    try {

        // Get the admin database
        if (!mongoose.connection.db) {
            return false;
        }

        const adminDb = mongoose.connection.db.admin();

        // List databases
        const { databases } = await adminDb.listDatabases();

        // Check if the database exists
        const dbExists = databases.some(database => database.name === dbName);

        console.log(`Database "${dbName}" ${dbExists ? 'exists' : 'does not exist'}.`);
        return dbExists;
    } catch (error) {
        console.error('Error connecting to the database or checking existence:', error);
        return false;
    }

}

