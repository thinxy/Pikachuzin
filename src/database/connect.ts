import mongoose from "mongoose";
import("dotenv/config");

mongoose
  .connect(process.env.CLIENT_DATABASE!, {
    dbName: "piakchu-db",
  })
  .then(() =>
    console.log("✅ | MongoDB database successfully connected!".green)
  )
  .catch((err) =>
    console.error(
      `❌ | An error occurred while connecting to the database: ${err.message}`
        .red
    )
  );

const db = mongoose.connection.db;
export default db;
