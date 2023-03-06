const { MongoClient, ObjectID } = require("mongodb");
const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "Connectify";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to DB");
    console.log('Connected Successfully');
  }
);