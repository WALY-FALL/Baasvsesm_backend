import express from "express";
import {
  signupEleve,
  loginEleve,
  addEleve,
  getElevesByProf,
} from "../controller/eleveController.js";

import Eleve from "../models/elevemodel.js";

const router = express.Router();

// 🔹 Inscription / connexion
router.post("/signup", signupEleve);
router.post("/login", loginEleve);

// 🔹 Ajouter un élève (par un prof)
/*router.post("/add", addEleve);*/

// 🔹 Récupérer les élèves d’un prof
router.get("/profs/:profId", getElevesByProf);

// 🔹 Lier un élève à un prof et une classe (⚙️ version finale)
router.put("/choisir", async (req, res) => {
  try {
    const { eleveId, profId, classeId } = req.body;
    console.log("📩 Requête reçue dans /choisir :", req.body);

    if (!eleveId || !profId || !classeId) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs (eleveId, profId, classeId) sont requis.",
      });
    }

    // ✅ Vérifier si l’élève a déjà choisi un prof et une classe
    const existingEleve = await Eleve.findById(eleveId);
    if (!existingEleve) {
      return res.status(404).json({
        success: false,
        message: "Élève non trouvé.",
      });
    }

    if (existingEleve.profId && existingEleve.classeId) {
        if (
          existingEleve.profId.toString() === profId &&
          existingEleve.classeId.toString() === classeId
        ) {
          return res.status(200).json({
            success: true,
            message: "Vous avez déjà cette classe et ce professeur.",
            eleve: existingEleve,
          });
        }
        return res.status(400).json({
          success: false,
          message: "Vous avez déjà choisi un professeur et une classe différente.",
        });
      }
      

    // ✅ Mettre à jour les infos de l’élève
    existingEleve.profId = profId;
    existingEleve.classeId = classeId;
    await existingEleve.save();

    res.status(200).json({
      success: true,
      message: "Élève lié au professeur et à la classe avec succès.",
      eleve: existingEleve,
    });
  } catch (error) {
    console.error("Erreur lors du lien élève-prof-classe :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour de l'élève.",
      error: error.message,
    });
  }
});

export default router;


/*import express from "express";
import {
  signupEleve,
  loginEleve,
  addEleve,
  getElevesByProf,
} from "../controller/eleveController.js";

import Eleve from "../models/elevemodel.js";

const router = express.Router();

// 🔹 Inscription / connexion
router.post("/signup", signupEleve);
router.post("/login", loginEleve);

// 🔹 Ajouter un élève (par un prof)
router.post("/add", addEleve);

// 🔹 Récupérer les élèves d’un prof
router.get("/profs/:profId", getElevesByProf);

// 🔹 Lier un élève à un prof et une classe
router.put("/choisir", async (req, res) => {
  try {
    const { eleveId, profId, classeId } = req.body;

    if (!eleveId || !profId || !classeId) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs (eleveId, profId, classeId) sont requis.",
      });
    }

    const eleve = await Eleve.findByIdAndUpdate(
      eleveId,
      { profId, classeId },
      { new: true } // Retourne la version mise à jour
    );

    if (!eleve) {
      return res.status(404).json({
        success: false,
        message: "Élève non trouvé.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Élève lié au professeur et à la classe avec succès.",
      eleve,
    });
  } catch (error) {
    console.error("Erreur lors du lien élève-prof-classe :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour de l'élève.",
      error: error.message,
    });
  }
});

export default router;*/


/*import express from "express";
import { signupEleve, loginEleve, addEleve, getElevesByProf } from "../controller/eleveController.js";

const router = express.Router();

// Routes pour l'élève
router.post("/signup", signupEleve);
router.post("/login", loginEleve);

// Routes pour ajouter un élève
router.post("/add", addEleve); // ✅ correspond à ton axios.post
router.get("/prof/:profId", getElevesByProf);

export default router;*/
