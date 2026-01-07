require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        console.log("Checking gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
        console.log(result.response.text());
    } catch (error) {
        console.log("Error with gemini-1.5-flash:", error.message);
    }

    try {
        console.log("Checking gemini-pro...");
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-pro");
        console.log(result.response.text());
    } catch (error) {
        console.log("Error with gemini-pro:", error.message);
    }
}

listModels();
