import mongoose from "mongoose";

// Establece la conexión con la base de datos
function dbConnect() {
  const db = mongoose

    //atencion al poner "mongodb://localhost:27017/nextjs  DA ERROR !!!
    .connect("mongodb://127.0.0.1:27017/nextjs")
    .then(() => console.log("Connected to MongoDB!"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

  return db;
}

export default dbConnect;
