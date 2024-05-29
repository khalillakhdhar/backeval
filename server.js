const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const chapitreRoutes = require('./routes/chapitreRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const quizRoutes = require('./routes/quizRoutes');  // Import the quiz routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/chapitre', chapitreRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/quizzes', quizRoutes);  // Use the quiz routes

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error(`Failed to connect to MongoDB: ${error.message}`);
});
