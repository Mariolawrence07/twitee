import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).send({
      status: 401,
      error: "Access Denied, kindly provide token",
    });
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).send({
        status: 400,
        error: "Access Denied, invalid token",
      });
    }
    req.decoded = decoded;
    return next();
  });
}
export default verifyToken;
