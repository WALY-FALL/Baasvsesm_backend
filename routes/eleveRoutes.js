import express from "express";
import { signup, login, addEleve, getElevesByProf } from "../controller/eleveController.js";

const router = express.Router();

// Routes pour l'élève
router.post("/signup", signup);
router.post("/login", login);

// Routes pour ajouter un élève
router.post("/add", addEleve); // ✅ correspond à ton axios.post
router.get("/prof/:profId", getElevesByProf);

export default router;
