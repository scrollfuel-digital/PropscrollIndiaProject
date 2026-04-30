import express from "express";
import dotenv from "dotenv";
import router from "./routers/route.js";
import cors from "cors";
import authrouter from "./routers/auth.js";
import formrouter from "./routers/route.js";

dotenv.config();

let app = express();
let port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.use("/api/auth", authrouter);
app.use("/api/form", formrouter);

// THEN START SERVER
app.listen(port, () => {
  console.log(`server is running on port : ${port} || http://127.0.0.1:${port}`);
});