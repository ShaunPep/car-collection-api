import { Db, MongoClient } from "mongodb";

let dbConnection: Db;

const connectToDb = (callBack: (error?: string) => void) => {
  MongoClient.connect("mongodb://localhost:27017/carcollection")
    .then((client) => {
      dbConnection = client.db();
      return callBack();
    })
    .catch((error) => {
      console.log(error);
      return callBack(error);
    });
};

const getDb = () => dbConnection;

export { connectToDb, getDb };
