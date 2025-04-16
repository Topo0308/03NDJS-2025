import express from "express"
import connectDB from "./db/connectDB.js";
import authRoute from "./routes/auth.js";

//connect DB
connectDB();

//init express
const app = express();

//api route
app.user("/api/v1/", authRoutes);

const port = process.env.PORT || 5000; // .env PORT or HARD coded

app.listen(port, () => {
	console.log("server runing on port ${port});
});
