import express from "express";
import { connectToMongoDB } from "./config/db.js";
// import dealershipRoutes from "./routes/dealershipRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRouter from "./Routes/userRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
const app = express();
const port = 3000;

import cookieParser from "cookie-parser";

connectToMongoDB();
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);
// app.use("/api/dealerships", dealershipRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/uploads", uploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// db.createCollection("nicest", {
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: ["user_email", "user_info", "password"],
//       properties: {
//         user_email: {
//           bsonType: "string",
//           description: "Name must be a string and is required",
//         },
//         user_info: {
//           bsonType: "string",
//           description: "Age must be an integer and is required",
//         },
//         password: {
//           bsonType: "string",
//           pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
//           description: "Email must be a valid email address and is required",
//         },
//       },
//     },
//   },
// });
