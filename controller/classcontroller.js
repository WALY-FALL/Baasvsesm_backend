//Fonction pour créer une classe dans la base de donnee mongooose


import Classe from "../models/classmodel.js";


//Fonction qui crée une classe
export const createClass = async (req, res) => {
  try {
    const {serie, niveau, description } = req.body;

    // Vérifier si la classe existe déjà
   /* const existingClasse = await Classe.findOne({ email });
    if (existingClasse) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }*/

    // Créer une nouvelle classe
    const newClass = await Classe.create({
      serie,
      niveau,
      description
    });

   // res.status(201).json({ success: true, message: "Class created", userId: newUser._id });
    res.status(201).json({ success: true, message: "Class created", classId: newClass._id });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Récupérer toutes les classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Classe.find(); // Récupère toutes les classes
    res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
