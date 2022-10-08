const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.port || 3000;

const { MongoClient, ServerApiVersion } = require("mongodb");

const envs = process.env;
const mongoUrl = envs.MONGO_DB;
console.log("mongoUrl", mongoUrl);

const Movies = require("./moviesDAO");
const moviesDAO = new Movies();
// const uri = "mongodb+srv://<username>:<password>@cluster0.g7hbkno.mongodb.net/?retryWrites=true&w=majority";
console.log("moviesDAO", moviesDAO);

async function main() {
  console.log("mongoUrl", mongoUrl);
  const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  const collection = client.db("test").collection("devices");
  console.log("collection", collection);

  await moviesDAO.injectDB(client);
  let movies = await moviesDAO.getMovies();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/v1/movies", (req, res) => {
    console.log("req", req);
    console.log("movies", movies);
    res.send(movies);
  });

  app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`);
  });
}

main().catch(console.error);
