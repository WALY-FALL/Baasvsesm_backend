
import express from "express";
import {createClass, getClasseById, getMyClasses, updateClass, deleteClass} from "../controller/classcontroller.js";
import { protect } from "../middlewares/authMiddleware.js";
import Classe from "../models/classmodel.js";


const router = express.Router();//creation de l'objet router

  // 🔹 Route publique : récupérer toutes les classes d’un prof
router.get("/profs/:profId", async (req, res) => {
  try {
    const classes = await Classe.find({ profId: req.params.profId });

    if (!classes || classes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune classe trouvée pour ce professeur.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Classes récupérées avec succès.",
      classes,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des classes :", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des classes.",
      error: err.message,
    });
  }
});

// Route pour créer une classe (protégée par auth)
router.post("/create", protect, createClass);

//router.get("/classe/:id", getClasseById);

// Route pour récupérer MES classes (protégée aussi)
router.get("/my-classes", protect, getMyClasses);

router.get("/:id", protect, getClasseById);          // Voir une classe par son ID

// Modifier une classe (protégé)
router.put("/update/:id", protect, updateClass);

// Supprimer une classe (protégé)
router.delete("/delete/:id", protect, deleteClass);

export default router;
