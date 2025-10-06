import jwt from "jsonwebtoken";
import Prof from "../models/profmodel.js"; // modèle User (profs)

export const protect = async (req, res, next) => {
  let token;

  // Vérifie si un token est présent dans l'en-tête Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Récupère le token ("Bearer xxxxxx")
      token = req.headers.authorization.split(" ")[1];

      // Vérifie et décode le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupère l'utilisateur et enlève le mot de passe
      req.prof = await Prof.findById(decoded.profId).select("-password");

      if (!req.prof) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }

      next(); // passe au contrôleur suivant
    } catch (error) {
      return res.status(401).json({ message: "Token invalide ou expiré" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Pas de token, accès refusé" });
  }
};
