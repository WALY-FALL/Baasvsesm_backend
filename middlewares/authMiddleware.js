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

// middlewares/auth.js (existant) -> doit remplir req.user
// middleware pour vérifier rôle prof
export function requireProf(req, res, next) 
{
  if (!req.user) return res.status(401).json({ message: "Non authentifié" });
  
  if (req.user.role !== "prof") return res.status(403).json({ message: "Accès réservé aux professeurs" });
  next();
}

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.prof = decoded; // contient l'id du prof et éventuellement son email
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};