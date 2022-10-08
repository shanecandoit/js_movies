const express = require('express');
const app = express();
const port = process.env.port || 3000;

const path = require("path");
const dotenv = require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');

const envVariables = process.env;
const mongoUrl = envVariables.MONGO_DB;


const Movies = require('./moviesDAO');
const moviesDAO = new Movies();
// const uri = "mongodb+srv://<username>:<password>@cluster0.g7hbkno.mongodb.net/?retryWrites=true&w=majority";
console.log('moviesDAO', moviesDAO);

console.log('mongoUrl', mongoUrl);
const client = new MongoClient(mongoUrl, { 
    useNewUrlParser: true, useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 });
client.connect();
const collection = client.db("test").collection("devices");
console.log('collection', collection);


let movies = moviesDAO.injectDB(client)

console.log('movies', movies);
// perform actions on the collection object

//client.close();




app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/api/v1/movies', (req, res) => {
    res.send(movies);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
