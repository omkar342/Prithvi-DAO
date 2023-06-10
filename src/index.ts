// Import the necessary packages
import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from "path";

// Import dotenv for environment variables
import dotenv from "dotenv";

// Import the database connection function
import connectDB from "./config/database";

// Import the route handlers
import userRoutes from "./routes/user-routes";
import videoRoutes from "./routes/video-routes";

dotenv.config();

// Create an Express app
const app = express();

// Set the port number
const port = 3000;

// Connect to the database
connectDB();

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: false,
    // tempFileDir: path.join(__dirname, "../uploads"),
  })
);

// Define a route handler for the root path
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define route handlers for user and video routes
app.use("/api/user", userRoutes);
app.use("/api/video", videoRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port no. ${port}`);
});
