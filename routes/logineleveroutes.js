import express from "express";
import { login } from "../controller/loginelevecontroller.js";

const router = express.Router();

// Route POST pour se connecter
router.post("/", login);

export default router;
