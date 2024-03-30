import { client } from "../config/db.js";
const db = client.db("Cars");

const carSchema = db.createCollection("Car", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["car_name", "car_model", "car_type"],
      properties: {
        car_name: {
          bsonType: "string",
          description: "must be a string and is required",
          required: ["car_name"],
        },
        car_model: {
          bsonType: "string",
          description: "must be a string and is required",
          required: ["car_model"],
        },
        car_type: {
          bsonType: "string",
          description: "must be a string and is required",
          required: ["car_type"],
        },
        car_info: {
          bsonType: "object",
          description: "must be a string and is required",
          required: ["car_info"],
          properties: {
            car_info: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            car_price: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            car_year: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            car_mileage: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            car_fuel: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            car_color: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            car_description: {
              bsonType: "string",
              description: "must be a string and is required",
            },
          },
        },
      },
    },
  },
  created_at: { bsonType: "date" },
  updated_at: { bsonType: "date" },
});

export { carSchema };
