import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
  res.cookie("CarJWT", token, {
    sameStie: "strict",
    httpOnly: true,
  });

  return token;
};

export default createToken;
