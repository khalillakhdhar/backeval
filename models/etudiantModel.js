const mongoose = require('mongoose');

const options = { discriminatorKey: 'role', collection: 'users' };

const etudiantSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mdp: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Utilisateur', 'Enseignant', 'Admin'],
      default: 'Utilisateur'
    },
  },
  {
    timestamps: true,
    ...options
  }
);

const Etudiant = mongoose.model('Etudiant', etudiantSchema);

module.exports = Etudiant;
