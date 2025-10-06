import Eleve from "../models/elevemodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ⚡ Générer un token JWT pour un utilisateur
const generateToken = (eleveId) => {
  return jwt.sign({ eleveId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

//export default generateToken;

//Fonction signup qui crée les utilisateurs dans la base de donnee
export const signup = async (req, res) => {
  try {
    const { name, email, password,profId } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingEleve = await Eleve.findOne({ email });
    if (existingEleve) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const newEleve = await Eleve.create({
      name,
      email,
      password: hashedPassword,
      profId,
    });

    res.status(201).json({
      success: true,
      message: "User created",
      eleve: {
        id: newEleve._id,
        name: newEleve.name,
        email: newEleve.email
      },
      token: generateToken(newEleve._id),
    });
    
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
