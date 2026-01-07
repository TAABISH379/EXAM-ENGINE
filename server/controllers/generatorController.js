const aiService = require('../services/aiService');

exports.generatePaper = async (req, res) => {
    try {
        const { board, className, subject, difficulty } = req.body;

        if (!board || !className || !subject) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const paper = await aiService.generateExamPaper({ board, className, subject, difficulty });
        res.json({ paper });
    } catch (error) {
        console.error('Error generating paper:', error);
        res.status(500).json({ error: 'Failed to generate paper. Please try again.' });
    }
};
