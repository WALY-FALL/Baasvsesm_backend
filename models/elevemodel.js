import mongoose from "mongoose";

const eleveSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    prenom: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // optionnel si tu ne fais pas encore de hashage
      //minlength: 6,
    },
    profId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prof",
      default: null, // au début il n’a pas encore choisi de prof
    },
    classeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      default: null, // idem pour la classe
    },
  },
  { timestamps: true }
);

// Optionnel : retirer le mot de passe des réponses JSON
eleveSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const Eleve = mongoose.model("Eleve", eleveSchema);
export default Eleve;

