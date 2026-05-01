import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routers/route.js";
import cors from "cors";
import authrouter from "./routers/auth.js";
import formrouter from "./routers/route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();
let port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authrouter);
app.use("/api/form", formrouter);

// Serve React build
const distPath = path.join(__dirname, "../propscroll-india/dist");
app.use(express.static(distPath));
app.get("*path", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`server is running on port : ${port} || http://127.0.0.1:${port}`);
});