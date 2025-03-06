const mongo = require("mongodb");
require("dotenv").config();
const MongoClient = mongo.MongoClient;
const MONGO_URL = process.env.MONGO_URL;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      // console.log(client);
      callback();
      //callback jayega to app.js but sirf ye btane ko ki connect ho gya client leke nhi jayega ab
      _db = client.db("Demo");
      // in our database airbnb present and we ask to client to give us a connection to that and store that in _db variable
    })
    .catch((err) => {
      console.log(err);
    });
};
const getDB = () => {
  // agr database se connect nhi hua to _db varible me kuch nhi hoga so error
  if (!_db) {
    throw new Error("mongo not connect");
  }
  return _db;
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
