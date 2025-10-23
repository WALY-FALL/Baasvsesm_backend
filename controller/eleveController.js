import Eleve from "../models/elevemodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Générer un token JWT
const generateToken = (eleveId) => {
  return jwt.sign({ eleveId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};


// ✅ INSCRIPTION


// 🔹 Fonction signupEleve
export const signupEleve = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    // Vérifier si l'email existe déjà
    const existingEleve = await Eleve.findOne({ email });
    if (existingEleve) {
      return res.status(400).json({
        success: false,
        message: "Email déjà utilisé",
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'élève
    const newEleve = await Eleve.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    // Générer le token JWT
    const token = jwt.sign(
      { id: newEleve._id, email: newEleve.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Retourner les données
    res.status(201).json({
      success: true,
      token,
      eleve: newEleve,
    });
  } catch (error) {
    console.error("Erreur signupEleve:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'inscription",
      error: error.message,
    });
  }
};


/*export const signupEleve = async (req, res) => {
  try {
    const { nom, prenom, email, password} = req.body;

    console.log("📩 Données reçues pour inscription élève :", req.body);

    const existing = await Eleve.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEleve = new Eleve({
      nom,
      prenom,
      email,
      password: hashedPassword,
      //profId, // ✅ on enregistre le prof lié à cet élève
    });

    await newEleve.save();

    console.log("✅ Élève créé avec profId :", newEleve.profId);

    res.status(201).json({
      success: true,
      message: "Élève créé avec succès",
      eleve: newEleve,
    });
  } catch (error) {
    console.error("Erreur signupEleve:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};*/

/*export const signupEleve = async (req, res) => {
  try {
    const { nom, prenom, email, password, profId } = req.body;

    // 🔍 Chercher l'élève par email
    let eleve = await Eleve.findOne({ email }).populate("profId");;

    if (eleve) {
      // ✅ L'élève existe déjà → il a été ajouté par un prof
      // On met à jour son mot de passe et éventuellement son nom/prénom
      const hashedPassword = await bcrypt.hash(password, 10);
      eleve.password = hashedPassword;
      eleve.nom = eleve.nom || nom;
      eleve.prenom = eleve.prenom || prenom;
      await eleve.save();

      const token = jwt.sign({ id: eleve._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      return res.status(200).json({
        success: true,
        message: "Mot de passe créé avec succès. Vous pouvez maintenant vous connecter.",
        token,
        eleve
      });
    }

    // 🚀 Sinon, c’est un nouvel élève → on le crée
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEleve = new Eleve({ nom, prenom, email, password: hashedPassword, profId: req.user._id });
    await newEleve.save();

    const token = jwt.sign({ id: newEleve._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(201).json({
      success: true,
      message: "Compte créé avec succès",
      token,
      eleve: newEleve
    });

  } catch (err) {
    console.error("Erreur signupEleve:", err);
    return res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};*/

/*export const signupEleve = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;
    console.log("📩 Requête signup reçue :", req.body);

    // Vérifie si l'élève existe déjà (créé par le prof)
    let eleve = await Eleve.findOne({ email });

    if (eleve) {
      console.log("⚠️ Élève déjà existant :", eleve.email);
      // Si l’élève existe déjà mais sans mot de passe → il complète son profil
      if (!eleve.password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        eleve.nom = eleve.nom || nom;
        eleve.prenom = eleve.prenom || prenom;
        eleve.password = hashedPassword;
        await eleve.save();
        return res.status(200).json({ success: true, message: "Compte complété avec succès !" });
      } else {
        // Sinon, il a déjà un mot de passe → il ne peut pas se réinscrire
        return res.status(400).json({ success: false, message: "Email déjà utilisé" });
      }
    }

    // Cas où l'élève n’a jamais été créé par le prof
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🆕 Création d'un nouvel élève :", email);
    const newEleve = new Eleve({ nom, prenom, email, password: hashedPassword });
    await newEleve.save();

    res.status(201).json({ success: true, message: "Inscription réussie !" });
  } catch (error) {
    console.error("Erreur signupEleve:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};*/
/*export const signup = async (req, res) => {
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
};*/

// ✅ CONNEXION


export const loginEleve = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📩 Tentative de connexion de :", email);

    // 🔍 On récupère l'élève et on "populate" le prof
    const eleve = await Eleve.findOne({ email }).populate("profId");

    if (!eleve) {
      console.log("❌ Élève non trouvé");
      return res.status(404).json({ success: false, message: "Élève non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, eleve.password);
    if (!isMatch) {
      console.log("❌ Mot de passe incorrect");
      return res.status(400).json({ success: false, message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: eleve._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    console.log("✅ Élève connecté :", eleve.email, "Prof :", eleve.profId);

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      token,
      eleve: {
        _id: eleve._id,
        nom: eleve.nom,
        prenom: eleve.prenom,
        email: eleve.email,
        profId: eleve.profId?._id || eleve.profId, // ✅ envoie bien l'id du prof
      },
    });
  } catch (error) {
    console.error("Erreur login élève:", error);
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

