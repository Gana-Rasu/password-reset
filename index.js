import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("password reset");
});

const MONGO_URL = process.env.MONGO_URL;


async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongodb connected");
  return client;
}

const client = await createConnection();

app.post("/signup", async function (req, res) {
  const input = req.body;
  const result = await client.db("users").collection("credentials").insertOne(input);
  res.send(result);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app started in ${port}`);
});
