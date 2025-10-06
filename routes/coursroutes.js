import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// 📁 Configuration de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Route pour uploader un fichier de cours
router.post("/upload", upload.single("cours"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Aucun fichier reçu" });
    }

    res.json({
      success: true,
      message: "Cours importé avec succès",
      filePath: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
    });
  } catch (error) {
    console.error("Erreur upload:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
