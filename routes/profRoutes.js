import Prof from "../models/profmodel.js";
import express from "express";
import { signup, login } from "../controller/profController.js";

const router = express.Router();//creation de l'objet router

// Route POST pour créer un utilisateur
router.post("/signup", signup); //Quant une requéte post (Create) arrive /api/signup, exécute la fonction signup qui créera l'utilisateur


  // ✅ Route GET : liste de tous les profs
router.get("/", async (req, res) => {
  try {
    const profs = await Prof.find().select("-password"); // on cache le mot de passe

    res.status(200).json({
      success: true,
      message: "Liste des professeurs récupérée avec succès",
      profs,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des professeurs",
      error: err.message,
    });
  }
});



  // DELETE un utilisateur par ID
router.delete("/:id", async (req, res) => {
    try {
      const prof = await Prof.findByIdAndDelete(req.params.id);
  
      if (!prof) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.json({ message: "Utilisateur supprimé avec succès", prof });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Route POST pour se connecter
router.post("/login", login);


// ✅ Route GET : récupérer tous les profs disponibles
router.get("/", async (req, res) => {
    try {
      const profs = await Prof.find().select("-password"); // on exclut le mot de passe
      res.status(200).json({
        success: true,
        message: "Liste des profs récupérée avec succès",
        data: profs,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des profs :", err);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });

export default router;
