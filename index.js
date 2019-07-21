const express         = require('express');
const mongoClient     = require('mongodb').MongoClient;
const bodyParser      = require('body-parser');


const app   = express();
const db    = require('./config/db');
const routes = require('./app/todo-routes')
const dbPort = 8081

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//var url = "mongodb+srv://jhoelccari:sd6CsvVWVvQDmr6O@cluster0-gmk8b.mongodb.net/todo-db?retryWrites=true&w=majority";

const client = new mongoClient( db.dburl() , { useNewUrlParser: true });

client.connect(err => {
    if (err) return console.log(err)
    const database = client.db("todo-list");
    // perform actions on the collection object
    routes(app, database);
    app.listen(dbPort, ()=>{
        console.log("[MongoDB] Listen on "+ dbPort +" port");
    })
});

