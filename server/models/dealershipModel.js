import { client } from "../config/db.js";
const db = client.db("Cars");

const dealership = db.createCollection("dealer", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "dealership_email",
        "dealership_name",
        "dealership_location",
        "password",
        "cars",
        "deals",
        "sold_vehicles",
      ],
      properties: {
        dealership_email: {
          bsonType: "string",
          description: "must be a string and is required",
          required: true,
        },
        dealership_name: {
          bsonType: "string",
          description: "must be a string and is required",
          required: true,
        },
        dealership_location: {
          bsonType: "string",
          description: "must be a string and is required",
          required: true,
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required",
          required: true,
        },
        cars: {
          bsonType: "array",
        },
        deals: {
          bsonType: "array",
        },
        sold_vehicles: {
          bsonType: "array",
        },
      },
    },
  },
});
