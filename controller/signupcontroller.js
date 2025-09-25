import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";

//Fonction signup qui crée les utilisateurs dans la base de donnee
export const signup = async (req, res) => {
  try {
    const { username, email, password, matiere } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      matiere
    });

    res.status(201).json({ success: true, message: "User created", userId: newUser._id });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
