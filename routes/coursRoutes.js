import express from "express";
import multer from "multer";
import { ajouterCours, getCoursParProfesseur, getCoursParClasse } from "../controller/coursController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Configuration Multer pour les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes

// Ajouter un cours avec fichiers
// Ajouter un cours (sécurisé)
router.post("/", verifyToken, upload.array("fichiers", 10), ajouterCours);
//router.post("/", upload.array("fichiers", 10), ajouterCours); 
// "fichiers" = nom du champ dans le frontend, 10 = max 10 fichiers à la fois

// Récupérer tous les cours d'un professeur
router.get("/prof", verifyToken ,getCoursParProfesseur);

// Récupérer tous les cours d'une classe
router.get("/classe/:classeId", verifyToken, getCoursParClasse);

router.get("/test", (req, res) => {
  res.send("Route cours OK");
});

export default router;
