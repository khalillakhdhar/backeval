const Quiz = require('../models/quiz');

// Upload a new quiz
exports.uploadQuiz = (req, res) => {
  const { title, description, level, chapter } = req.body;
  const csvUrl = req.file.path;

  const newQuiz = new Quiz({
    title,
    csvUrl,
    description,
    level,
    chapter
  });

  newQuiz.save()
    .then(() => res.status(201).json({ message: 'Quiz uploaded successfully!' }))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Get all quizzes
exports.getAllQuizzes = (req, res) => {
  Quiz.find().populate('chapter')
    .then(quizzes => res.status(200).json(quizzes))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Get quizzes by chapter
exports.getQuizzesByChapter = (req, res) => {
  const { chapterId } = req.params;
  Quiz.find({ chapter: chapterId }).populate('chapter')
    .then(quizzes => res.status(200).json(quizzes))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Get quizzes by level
exports.getQuizzesByLevel = (req, res) => {
  const { level } = req.params;
  Quiz.find({ level }).populate('chapter')
    .then(quizzes => res.status(200).json(quizzes))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Update a quiz
exports.updateQuiz = (req, res) => {
  const { id } = req.params;
  const { title, description, level, chapter } = req.body;

  Quiz.findByIdAndUpdate(id, { title, description, level, chapter }, { new: true })
    .then(updatedQuiz => res.status(200).json(updatedQuiz))
    .catch(err => res.status(400).json({ error: err.message }));
};

// Delete a quiz
exports.deleteQuiz = (req, res) => {
  const { id } = req.params;

  Quiz.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Quiz deleted successfully!' }))
    .catch(err => res.status(400).json({ error: err.message }));
};
