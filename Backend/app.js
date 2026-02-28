import express from "express";
import dotenv from "dotenv";
import connectdb from "./src/config/mongo.config.js";
import Url from "./src/models/shorturl.model.js";
import { nanoid } from "nanoid";

dotenv.config();
const app = express();
app.use(express.json());
connectdb();

app.post("/create", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }
        const shortUrl = nanoid(7);
        const newUrl = new Url({
            full_url: url,
            short_url: shortUrl,
        });
        await newUrl.save();
        res.status(201).json({
            shortUrl: shortUrl
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const urlDoc = await Url.findOne({ short_url: id });
        if (!urlDoc) {
            return res.status(404).json({ message: "URL not found" });
        }
        res.redirect(urlDoc.full_url);
    } 
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running successfully.");
});