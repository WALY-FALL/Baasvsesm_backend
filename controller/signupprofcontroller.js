import Prof from "../models/profmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ⚡ Générer un token JWT pour un utilisateur
const generateToken = (profId) => {
  return jwt.sign({ profId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

//export default generateToken;

//Fonction signup qui crée les utilisateurs dans la base de donnee
export const signup = async (req, res) => {
  try {
    const { name, email, password, matiere } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingProf = await Prof.findOne({ email });
    if (existingProf) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const newProf = await Prof.create({
      name,
      email,
      password: hashedPassword,
      matiere
    });

    res.status(201).json({
      success: true,
      message: "User created",
      prof: {
        id: newProf._id,
        name: newProf.name,
        email: newProf.email
      },
      token: generateToken(newProf._id),
    });
    
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
