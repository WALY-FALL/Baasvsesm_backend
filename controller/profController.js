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
    const { nom, prenom, email, password, matiere } = req.body;

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
      nom,
      prenom,
      email,
      password: hashedPassword,
      matiere
    });

    res.status(201).json({
      success: true,
      message: "User created",
      prof: {
        id: newProf._id,
        nom: newProf.nom,
        prenom: newProf.prenom,
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

//Login Prof

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
     
  
      // Vérifier si l'utilisateur existe
     const prof = await Prof.findOne({ email });
      if (!prof) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
  
      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, prof.password);
      if (!isMatch) {
        return res.status(402).json({ success: false, message: "Invalid credentials" });
      }
  
      // Créer un token JWT
      const token = jwt.sign({ profId: prof._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
     
      res.status(200).json({
        success: true,
        prof: {
          id: prof._id,
          email: prof.email
          
        },
        token,
      });
      
         
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  