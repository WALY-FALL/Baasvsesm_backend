import Prof from "../models/profmodel.js";
import express from "express";
import { signup } from "../controller/signupprofcontroller.js";

const router = express.Router();//creation de l'objet router

// Route POST pour créer un utilisateur
router.post("/", signup); //Quant une requéte post (Create) arrive /api/signup, exécute la fonction signup qui créera l'utilisateur


// Route GET pour récupérer tous les profs
router.get("/", async (req, res) => {
    try {
      const profs = await Prof.find(); // récupère tous les documents
      res.json(profs);
    } catch (err) {
      res.status(500).json({ error: err.message });
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

export default router;
