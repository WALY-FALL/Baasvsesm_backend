import Cours from "../models/coursmodel.js";

// Ajouter un cours
export const ajouterCours = async (req, res) => {


  try {

    //console.log("BODY:", req.body);
    //console.log("FILES:", req.files);
    const { titre, description, contenu, profId, classeId } = req.body;
    const fichiers = req.files ? req.files.map(file => ({ nom: file.originalname, url: file.path })) : [];

    const nouveauCours = new Cours({
      titre,
      description,
      contenu,
      profId,
      classeId,
      fichiers,
    });

    await nouveauCours.save();
    res.status(201).json({ message: "Cours ajouté avec succès", cours: nouveauCours });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout du cours", error: error.message });
  }
};

// Récupérer tous les cours d'un professeur
export const getCoursParProfesseur = async (req, res) => {
  try {
    const profId = req.prof.id; // récupéré depuis le token
    const cours = await Cours.find({ profId: profId });
    res.json(cours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/*export const getCoursParProfesseur = async (req, res) => {
  try {
    const { profId } = req.params;
    const cours = await Cours.find({ profId }).populate("classeId", "nom"); // On peut peupler le nom de la classe
    res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des cours du professeur", error: error.message });
  }
};*/

// Récupérer tous les cours d'une classe
export const getCoursParClasse = async (req, res) => {
  try {
    const { classeId } = req.params;
    const cours = await Cours.find({ classeId }).populate("professeurId", "nom prenom"); // On peut peupler le nom du prof
    res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des cours de la classe", error: error.message });
  }
};
