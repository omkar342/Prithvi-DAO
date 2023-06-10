import User from "../models/userModel";

interface IUser {
  email: String;
  password: String;
}

const registerNewUser = async (
  email: String,
  password: String
): Promise<IUser> => {
  const newUser = new User({
    email,
    password,
  });

  const savedUser = await newUser.save();

  return savedUser;
};

export default registerNewUser;
