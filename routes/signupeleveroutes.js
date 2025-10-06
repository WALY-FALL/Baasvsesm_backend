import Eleve from "../models/elevemodel.js";
import express from "express";
import { signup } from "../controller/signupelevecontroller.js";

const router = express.Router();//creation de l'objet router

// Route POST pour ajouter un eleve
router.post("/", signup); //Quant une requéte post (Create) arrive /api/signup, exécute la fonction signup qui créera l'utilisateur


// Route GET pour récupérer tous les élèves d'une classe
router.get("/Prof/:profId", async (req, res) => {
    try {
      const eleve = await Eleve.find({ profId: req.params.profId }); // récupère tous les documents
      res.json(eleve);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // DELETE un utilisateur par ID
router.delete("/:id", async (req, res) => {
    try {
      const eleve = await Eleve.findByIdAndDelete(req.params.id);
  
      if (!eleve) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.json({ message: "Utilisateur supprimé avec succès", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
