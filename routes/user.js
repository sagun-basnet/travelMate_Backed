import express from "express";
// const express = require("express");
import getUser from "../controllers/user.js";

const router = express.Router();
// router.get("/find/:userId", getUser)
router.get("/", (req, res) =>{
    res.send("hellow");
})

export default router;