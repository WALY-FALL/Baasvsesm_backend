
import express from "express";
import {createClass, getClasses} from "../controller/classcontroller.js";


const router = express.Router();//creation de l'objet router

// Route POST pour créer une classe
router.post("/create", createClass); //Quand une requéte post (Create) arrive /api, exécute la fonction signup qui créera l'utilisateur

// Route pour lister toutes les classes
router.get("/all", getClasses);

export default router;
