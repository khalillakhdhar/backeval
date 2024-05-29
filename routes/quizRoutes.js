const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('csv'), quizController.uploadQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/chapter/:chapterId', quizController.getQuizzesByChapter);
router.get('/level/:level', quizController.getQuizzesByLevel);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
