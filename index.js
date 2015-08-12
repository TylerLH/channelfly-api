import dotenv from "dotenv";
dotenv.load();
import express from "express";
import cors from "cors";
const app = express();
import search from "./search";

app.use(cors());

app.get("/search", search.lookup);

app.listen(3000);
