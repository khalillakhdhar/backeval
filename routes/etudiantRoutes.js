const express = require('express');
const {
  getEtudiants,
  getEtudiantById,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
} = require('../controllers/etudiantController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getEtudiants)
  .post(protect, createEtudiant);

router.route('/:id')
  .get(protect, getEtudiantById)
  .put(protect, updateEtudiant)
  .delete(protect, deleteEtudiant); 

module.exports = router;
