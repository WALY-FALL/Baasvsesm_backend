import Eleve from "../models/elevemodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Générer un token JWT
const generateToken = (eleveId) => {
  return jwt.sign({ eleveId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// ✅ INSCRIPTION
export const signup = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Vérifier si l'élève existe déjà
    const existingEleve = await Eleve.findOne({ email });
    if (existingEleve) {
      return res.status(400).json({ success: false, message: "Email déjà utilisé" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'élève
    const newEleve = await Eleve.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Élève créé avec succès",
      eleve: {
        id: newEleve._id,
        nom: newEleve.nom,
        prenom: newEleve.prenom,
        email: newEleve.email,
      },
      token: generateToken(newEleve._id),
    });
  } catch (error) {
    console.error("Erreur signup:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// ✅ CONNEXION
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const eleve = await Eleve.findOne({ email });
    if (!eleve) {
      return res.status(400).json({ success: false, message: "Identifiants invalides" });
    }

    const isMatch = await bcrypt.compare(password, eleve.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Identifiants invalides" });
    }

    const token = generateToken(eleve._id);

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      eleve: {
        id: eleve._id,
        nom: eleve.nom,
        prenom: eleve.prenom,
        email: eleve.email,
      },
      token,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};


// ➕ Ajouter un élève
export const addEleve = async (req, res) => {
  try {
    const { nom, prenom, email, profId } = req.body;

  if (!nom || !prenom || !email || !profId) {

      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const newEleve = new Eleve({
      nom,
      prenom,
      email,
      profId,
      /*password: "defaultpassword", // Mot de passe par défaut à changer après*/
    });

    await newEleve.save();

    res.status(201).json(newEleve);
  } catch (error) {
    console.error("❌ Erreur lors de l’ajout d’un élève :", error);
    res.status(500).json({ message: "Erreur serveur lors de l’ajout" });
  }
};

// 📋 Récupérer tous les élèves d’un prof
export const getElevesByProf = async (req, res) => {
  try {
    const { profId } = req.params;
    const eleves = await Eleve.find({ profId });

    res.status(200).json(eleves);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des élèves :", error);
    res.status(500).json({ message: "Erreur serveur lors du chargement" });
  }
};

