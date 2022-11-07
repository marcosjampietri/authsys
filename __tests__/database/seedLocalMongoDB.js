const MongoClient = require("mongodb").MongoClient;
const { disconnect } = require("mongoose");
const { ObjectId } = require("mongodb");
const users = require("./users.json");
const { connectToMongo, uri } = require("./mongo");

const dataToSeed = { users };

const DB = "SUBSCRIPTION";

const oidToObjectId = (jsonData) =>
  jsonData.map((item) =>
    !!item.realtor
      ? {
          ...item,
          _id: ObjectId(item._id["$oid"]),
          realtor: ObjectId(item.realtor["$oid"]),
        }
      : {
          ...item,
          _id: ObjectId(item._id["$oid"]),
        }
  );

async function dropAndSeed(mongoClient, collectionName, jsonData) {
  const collection = mongoClient.db(DB).collection(collectionName);

  await collection.drop().catch((e) => {
    console.log("error when dropping", e);
    if (e.code !== 26) {
      throw e;
    }
  });
  await collection.insertMany(oidToObjectId(jsonData));
}

async function seedDB() {
  // Connection URL

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    await connectToMongo();

    console.log("Connected correctly to server");

    for (const key of Object.keys(dataToSeed)) {
      await dropAndSeed(client, key, dataToSeed[key]);
    }

    console.log("Database seeded! :)");

    await disconnect();

    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
