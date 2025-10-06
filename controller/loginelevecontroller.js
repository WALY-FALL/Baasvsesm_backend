import Eleve from "../models/elevemodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   

    // Vérifier si l'utilisateur existe
   const eleve = await Eleve.findOne({ email });
    if (!eleve) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, eleve.password);
    if (!isMatch) {
      return res.status(402).json({ success: false, message: "Invalid credentials" });
    }

    // Créer un token JWT
    const token = jwt.sign({ eleveId: eleve._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({
      success: true,
      eleve: {
        id: eleve._id,
        email: eleve.email
      },
      token,
    });
    
       
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
