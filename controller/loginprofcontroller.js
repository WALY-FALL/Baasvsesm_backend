import Prof from "../models/profmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
