import express, { response } from "express";
import mongoose from "mongoose";
import { JobModel } from "../models/Jobs.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await JobModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const job = new JobModel(req.body);

  try {
    const response = await job.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const job = await JobModel.findById(req.body.jobID);
    const user = await UserModel.findById(req.body.userID);
    user.savedJobs.push(job);
    await user.save();
    res.json({ savedJobs: user.savedJobs });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedJobs/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedJobs: user?.savedJobs });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedJobs", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedJobs = await JobModel.find({
      _id: { $in: user.savedJobs },
    });
    res.json({ savedJobs });
  } catch (err) {
    res.json(err);
  }
});

export { router as jobsRouter };
