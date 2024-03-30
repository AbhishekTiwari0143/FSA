import { client } from "../config/db.js";
const db = client.db("Cars");

const soldVehicleModel = db.createCollection("Vehicle", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["car_id", "car_info"],
      properties: {
        car_id: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        car_info: {
          bsonType: "object",
          description: "must be a string and is required",
        },
      },
    },
  },
});

export default soldVehicleModel;
