/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import UserModel from "../model/userModel.js";

// export default async function signup(req, res) {
export async function signup(req, res) {
  try {
    const { nom, username, password, email, tel, dateNaissance } = req.body;

    if (nom && username && password && email && tel && dateNaissance) {
      if (
        nom.length >= 2 &&
        password.length >= 4 &&
        tel.length >= 1 &&
        email.length >= 4
      ) {
        // TODO: implement regex
        let user = new UserModel();
        const passwords = await user.hashPassword(password);
        // console.log(passwords);
        user = await UserModel.create({
          nom,
          dateNaissance,
          email,
          username,
          password: passwords,
        });
        return res.status(200).send({
          error: "",
          message: "user created successfully",
          user,
        });
      }
      return res
        .status(422)
        .send({ message: "fields are not correct", user: {} });
    }
    return res
      .status(422)
      .send({ message: "all fields is required", user: {} });
  } catch (error) {
    return resstatus(500).send({ message: error.message, user: {} });
  }
}

export async function update(req, res) {
  try {
    const { nom, username, password, email, tel, dateNaissance } = req.body;

    if (nom && username && password && email && tel && dateNaissance) {
      if (
        nom.length >= 2 &&
        password.length >= 4 &&
        tel.length >= 1 &&
        email.length >= 4
      ) {
        // TODO: implement regex
        // let user = await UserModel.find();

        const passwords = await user.hashPassword(password);
        // console.log(passwords);
        user = await UserModel.create({
          nom,
          dateNaissance,
          email,
          username,
          password: passwords,
        });
        return res.send({
          error: "",
          message: "user created successfully",
          user,
        });
      }
      return res.send({ error: "fields are not correct", user: {} });
    }
    return res.send({ error: "all fields is required", user: {} });
  } catch (error) {
    return res.send({ error: error.message, user: {} });
  }
}

export async function getUser(req, res) {
  try {
    const users = await UserModel.find();
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
