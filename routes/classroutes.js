
import express from "express";
import {createClass, getClasseById, getMyClasses, updateClass, deleteClass} from "../controller/classcontroller.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();//creation de l'objet router


// Route pour créer une classe (protégée par auth)
router.post("/create", protect, createClass);

router.get("/classe/:id", getClasseById);

// Route pour récupérer MES classes (protégée aussi)
router.get("/my-classes", protect, getMyClasses);

router.get("/:id", protect, getClasseById);          // Voir une classe par son ID

// Modifier une classe (protégé)
router.put("/update/:id", protect, updateClass);

// Supprimer une classe (protégé)
router.delete("/delete/:id", protect, deleteClass);

export default router;
