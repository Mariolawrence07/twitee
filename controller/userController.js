import Helper from "../Helpers/helpers";
import models from "../models";

const { Users } = models;

const signUp = async ({ email, password }) => {
  const userExist = await Users.findOne({
    where: { email },
  });
  if (userExist && userExist.dataValues.id) {
    return null;
  }
  const userCreated = await Users.create(
    {
      email,
      name: email.substring(0, email.lastIndexOf("@")),
      password: Helper.hashPassword(password),
    },
    {
      returning: true,
      hooks: false,
    }
  );

  if (userCreated && userCreated.dataValues.id) {
    return {
      success: true,
      message: "user created successfully",
      id: userCreated.dataValues.id,
      email: userCreated.dataValues.email,
      name: userCreated.dataValues.name,
      token: Helper.generateToken(userCreated.dataValues),
    };
  }
};

const login = async ({ email, password }) => {
  const userFound = await Users.findOne({
    where: {
      email,
    },
  });
  if (
    !userFound ||
    !Helper.comparePassword(userFound.dataValues.password, password)
  ) {
    return null;
  }
  if (userFound.dataValues) {
    return {
      success: true,
      message: "Login successful",
      id: userFound.dataValues.id,
      name: userFound.dataValues.name,
      email: userFound.dataValues.email,
      token: Helper.generateToken(userFound.dataValues),
    };
  }
};

export default {
  signUp,
  login,
};
