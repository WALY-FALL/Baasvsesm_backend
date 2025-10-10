import mongoose from "mongoose";

const eleveSchema = new mongoose.Schema( // format ou schéma d'un utilisateur de notre app
  {
    nom: {
      type: String,
      required: true,
      trim: true, // permet de supprimer les espaces avant ou aprés le username du client
    },
    prenom: {
      type: String,
      required: true,
      trim: true, // permet de supprimer les espaces avant ou aprés le username du client
    },
    email: {
      type: String,
      required: true,
      unique: true, // chaque client doit avoir un unique email
      lowercase: true, //met tout en miniscule même si le client ecrit en majuscule
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

const Eleve= mongoose.model("Eleve", eleveSchema); //mongoose.model("modelName", Schema)
export default Eleve;
