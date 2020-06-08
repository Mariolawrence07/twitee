import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, 8);
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken({ id, email, name }) {
    const token = jwt.sign(
      {
        id,
        email,
        name,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    return token;
  },
  isValidNumber(number) {
    return /^\d+$/.test(number);
  },
};

export default Helper;
