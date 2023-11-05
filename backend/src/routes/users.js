import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ message: "Korisnik vec postoji !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "Korisnik uspjesno registrovan! " });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "Korisnik ne postoji !" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Podaci koje ste unijeli su netacni !" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userID: user._id });
});

export { router as userRouter };
