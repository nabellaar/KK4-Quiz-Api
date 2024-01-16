const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendance");
const { verifyToken } = require("../middlewares/authJwt");

router.get("/attendances", [verifyToken], attendanceController.list);
