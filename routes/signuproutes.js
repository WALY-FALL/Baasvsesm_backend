import User from "../models/usermodel.js";
import express from "express";
import { signup } from "../controller/signupcontroller.js";

const router = express.Router();//creation de l'objet router

// Route POST pour créer un utilisateur
router.post("/", signup); //Quant une requéte post (Create) arrive /api/signup, exécute la fonction signup qui créera l'utilisateur


// Route GET pour récupérer tous les utilisateurs
router.get("/", async (req, res) => {
    try {
      const users = await User.find(); // récupère tous les documents
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // DELETE un utilisateur par ID
router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      res.json({ message: "Utilisateur supprimé avec succès", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;
