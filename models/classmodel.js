import mongoose from "mongoose";

const classSchema = new mongoose.Schema( // format ou schéma d'un utilisateur de notre app
  {
    serie: {
      type: String,
      required: true,
      trim: true, // permet de supprimer les espaces avant ou aprés le username du client
    },
    niveau: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // ajoute createdAt et updatedAt automatiquement
);

const Classe= mongoose.model("Classe", classSchema); //mongoose.model("modelName", Schema)
export default Classe;
