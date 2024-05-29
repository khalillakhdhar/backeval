const Etudiant = require('../models/etudiantModel');

// Get all etudiants
const getEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find({ role: 'Etudiant' });
    res.status(200).json(etudiants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single etudiant
const getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }
    res.status(200).json(etudiant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create etudiant
const createEtudiant = async (req, res) => {
  const { nom, prenom, email, mdp, telephone } = req.body;
  try {
    const etudiant = new Etudiant({ nom, prenom, email, mdp, telephone, role: 'Etudiant' });
    await etudiant.save();
    res.status(201).json(etudiant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update etudiant
const updateEtudiant = async (req, res) => {
  const { nom, prenom, email, mdp, telephone } = req.body;
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant not found' });
    }

    etudiant.nom = nom || etudiant.nom;
    etudiant.prenom = prenom || etudiant.prenom;
    etudiant.email = email || etudiant.email;
    etudiant.mdp = mdp || etudiant.mdp;
    etudiant.telephone = telephone || etudiant.telephone;

    const updatedEtudiant = await etudiant.save();
    res.status(200).json(updatedEtudiant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete etudiant

const deleteEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id)
    if (!etudiant) {
      return res.status(404).json({ message: 'Etudiant non trouvé' })
    }

    await Etudiant.findByIdAndDelete(req.params.id)
    res.json({ message: 'Etudiant supprimé avec succès' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Erreur du serveur' })
  }
}
module.exports = {
  getEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
};
