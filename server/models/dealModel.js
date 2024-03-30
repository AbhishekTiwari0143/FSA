import { client } from "../config/db.js";
const db = client.db("Cars");

const dealModel = db.createCollection("deal", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["car_id", "deal_info"],
      properties: {
        car_id: {
          bsonType: "string",
          description: "must be a string and is required",
          required: true,
        },
        deal_info: {
          bsonType: "object",
          description: "must be a string and is required",
          required: true,
          properties: {
            price: {
              bsonType: "string",
              description: "must be a string and is required",
              required: true,
            },
          },
        },
      },
    },
  },
});
