import Cours from "../models/coursmodel.js";
import Prof from "../models/profmodel.js";

// Ajouter un cours
export const ajouterCours = async (req, res) => {

  //console.log("📤 Création cours:", { titre, description, contenu, profId, classeId, fichiers });
  console.log("📦 BODY REÇU :", req.body);
console.log("📁 FILES :", req.files);



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
/*export const getCoursParClasse = async (req, res) => {
  try {
    const { classeId } = req.params;
    const cours = await Cours.find({ classeId }).populate("profId", "nom prenom"); // On peut peupler le nom du prof
    res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des cours de la classe", error: error.message });
  }
};*/

export const getCoursParClasse = async (req, res) => {
  try {
    const { classeId } = req.params;
    console.log("📥 [getCoursParClasse] Classe ID reçu :", classeId);

    // Vérifie si la classeId est bien reçue
    if (!classeId) {
      console.log("⚠️ Aucun classeId reçu !");
      return res.status(400).json({ message: "Classe ID manquant" });
    }

    // Récupération des cours
    const cours = await Cours.find({ classeId });
    console.log("🔍 Cours trouvés :", cours.length);

    // Vérifie les données des cours
    if (cours.length > 0) {
      console.log("📄 Exemple du premier cours :", cours[0]);
    }

    // Peuplement
    const coursPopulated = await Cours.find({ classeId }).populate("profId", "nom prenom");
    console.log("✅ Après populate :", coursPopulated.length);

    res.status(200).json(coursPopulated);
  } catch (error) {
    console.error("❌ Erreur backend complète :", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des cours de la classe",
      error: error.message,
      stack: error.stack,
    });
  }
};

