const express = require('express');
const {
  getChapitre,
  getChapitreById,
  createChapitre,
  updateChapitre,
  deleteChapitre,
} = require('../controllers/chapitreController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get( getChapitre) // Route pour obtenir tous les chapitre
  .post( createChapitre); // Route pour créer un chapitre

router.route('/:id')
  .get( getChapitreById) // Route pour obtenir un chapitre par ID
  .put( updateChapitre)  // Route pour mettre à jour un chapitre par ID
  .delete( deleteChapitre); // Route pour supprimer un chapitre par ID

module.exports = router;
