import express from "express";
// const express = require("express");
import getUser from "../controllers/user.js";

const router = express.Router();
router.get("/find/:userId", getUser)

export default router;