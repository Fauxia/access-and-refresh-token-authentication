import mongoose from "mongoose";

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Error while connected to database", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb database disconnected ");
  });
};

export { connectToDb };
