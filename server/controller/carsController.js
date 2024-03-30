import asyncHandler from "../middlewares/asyncHandler.js";

import { client } from "../config/db.js";
const db = client.db("Cars");
const carCollection = db.collection("Car");

const carRegister = asyncHandler(async (req, res) => {
  const { car_name, car_model, car_type, car_info } = req.body;

  if (!car_name || !car_model || !car_type) {
    throw new Error("Please fill all the fields!");
  }

  const carExists = await carCollection.findOne({ car_model });

  if (!carExists) {
    const carData = {
      car_name,
      car_model,
      car_type,
      car_info,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await carCollection.insertOne(carData);
    res.status(201).json({
      success: true,
      message: "Car added successfully!",
      data: result,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Car already exists!",
    });
  }
});

const soldCarCollection = db.collection("sold-car");

const soldVehicle = asyncHandler(async (req, res) => {
  const { car_id, car_info } = req.body;

  if (!car_id) {
    throw new Error("Please fill the field!");
  }
  const carData = {
    car_id,
    car_info,
    updated_at: new Date(),
  };

  try {
    const carSold = await soldCarCollection.insertOne(carData);
    res.status(201).json({
      success: true,
      message: "Car sold successfully!",
      data: carSold,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

const deal = db.collection("deal");

const carDeal = asyncHandler(async (req, res) => {
  const { car_id, deal_info } = req.body;

  if (!car_id || !deal_info) {
    throw new Error("Please fill all the fields!");
  }

  const dealData = {
    car_id,
    deal_info,
    updated_at: new Date(),
  };

  try {
    const carDeal = await deal.insertOne(dealData);
    res.status(201).json({
      success: true,
      message: "Deal added successfully!",
      data: carDeal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
});

export { carRegister, soldVehicle, carDeal };
