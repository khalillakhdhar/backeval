const Chapitre = require('../models/chapitresModel');

// Get all chapitre
const getChapitre = async (req, res) => {
  try {
    const chapitre = await Chapitre.find().populate('responsable').populate('supports');
    res.status(200).json(chapitre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single chapitre
const getChapitreById = async (req, res) => {
  try {
    const chapitre = await Chapitre.findById(req.params.id).populate('responsable').populate('supports');
    if (!chapitre) {
      return res.status(404).json({ message: 'Chapitre not found' });
    }
    res.status(200).json(chapitre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create chapitre
const createChapitre = async (req, res) => {
  const { titre, description, responsable } = req.body;
  try {
    const chapitre = new Chapitre({ titre, description, responsable });
    await chapitre.save();
    res.status(201).json(chapitre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update chapitre
const updateChapitre = async (req, res) => {
  const { titre, description, responsable, supports } = req.body;
  try {
    const chapitre = await Chapitre.findById(req.params.id);
    if (!chapitre) {
      return res.status(404).json({ message: 'Chapitre not found' });
    }

    chapitre.titre = titre || chapitre.titre;
    chapitre.description = description || chapitre.description;
    chapitre.responsable = responsable || chapitre.responsable;
    chapitre.supports = supports || chapitre.supports;

    const updatedChapitre = await chapitre.save();
    res.status(200).json(updatedChapitre);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete chapitre
const deleteChapitre = async (req, res) => {
  try {
    const chapitre = await Chapitre.findById(req.params.id);
    if (!chapitre) {
      return res.status(404).json({ message: 'Chapitre not found' });
    }
    await chapitre.remove();
    res.status(200).json({ message: 'Chapitre removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChapitre,
  getChapitreById,
  createChapitre,
  updateChapitre,
  deleteChapitre,
};
