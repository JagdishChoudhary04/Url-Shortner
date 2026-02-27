import express from "express";
import dotenv from "dotenv";
import connectdb from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shorturl.model.js";
import {nanoid} from "nanoid";
dotenv.config("./.env");
const app = express();

app.use(express.json());
connectdb();

app.post("/create", async (req, res) => {
    try {
        const { url } = req.body;
        if (!url){
            return res.status(400).json({ message: "URL is required" });
        } 
        const shortUrl = nanoid(7);
        const newUrl = new urlSchema({
            full_url: url,
            short_url: shortUrl,
        })
        res.send(nanoid(7));
        newUrl.save();
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/:id", async (req, res) => {
    const {id} = req.params()
    const url = await urlSchema.findOne({short_url: shortUrl})
})
app.listen(3000, () => {
    console.log("Server is running successfully.");
});