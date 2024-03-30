// User schema validation
async function createCollection(db) {
  const userSchema = db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["user_email", "password", "user_info"],
        properties: {
          user_info: {
            bsonType: "object",
            description: "must be a string and is required",
            required: ["name", "Age"],
            properties: {
              name: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              Age: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
          user_email: {
            bsonType: "string",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            description: "must be a valid email address and is required",
          },
          isAdmin: {
            bsonType: "bool",
            default: false,
          },
          password: {
            bsonType: "string",
            description: "must be a string and is required",
          },
          user_location: {
            bsonType: "string",
            description: "Location of the user",
          },
          vehicle_info: {
            bsonType: "array",
          },
        },
      },
      created_at: { bsonType: "date" },
      updated_at: { bsonType: "date" },
    },
  });

  console.log('Collection "users" created with schema validation');
}

export { createCollection };
