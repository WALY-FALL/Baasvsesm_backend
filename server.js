import "dotenv/config";   // Bibliotéque de node.js. Permet de charger les variables d'environnement
import express from "express"; // framework de node.js. Sert uniquement á gérer les routes http comm app.get, app.post ...
import cors from "cors";  // Middleware permet d'activer le CROSS-ORIGIN RESOURCE SHARING
import morgan from "morgan";//Middlewae du protocole http. permet de loguer dans le cosole toutes les requètes http
import profRoutes from "./routes/profRoutes.js"; //Objet routeur express, crèer avec express.Router().
import eleveRoutes from "./routes/eleveRoutes.js";
//import loginProfRoutes from "./routes/loginprofroutes.js";
import classRoutes from "./routes/classroutes.js";
import coursRoutes from "./routes/coursRoutes.js";



import connectDB from "./config/db.js"; 

const app = express(); //instance d'express


// Connexion à la base de données
connectDB();

// Middlewares
app.use(express.json()); // permet à notre app de pouvoir lire les fichiers JSON des requétes du client
app.use(cors());
app.use(morgan("dev"));

//Les routes
//app.use("/api/prof", signupProfRoutes); // pour toutes les requetes qui commencent par /api/signup utiliser signupRoutes. Permet à app d'utiliser lobjet router d'express avec la route /api/signup
app.use("/api/eleves", eleveRoutes);
app.use("/api/profs", profRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/cours", coursRoutes);

// ⚡ Permet d'accéder aux fichiers uploadés
app.use("/uploads", express.static("uploads"));
//app.use("/api/eleves", eleveRoutes);



// Tester les routes
/*app.get("/", (req, res) => {
  res.send("🚀 API running with ESM!");
});*/





// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
