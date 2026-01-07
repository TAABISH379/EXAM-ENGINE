require('dotenv').config({ path: 'server/.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // For @google/generative-ai, we might need to use the model directly or check docs.
        // There isn't a direct listModels on the client instance in some versions?
        // Actually usually it is not exposed directly on the helper class easily.
        // But let's try a simple generation strictly with 'gemini-1.5-flash' again but catch error details.
        // Or just try 'gemini-1.0-pro'.

        // Let's try to just print the key (masked) to be sure it is loaded.
        console.log("Key loaded:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 5) + "..." : "NO KEY");

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
    } catch (error) {
        console.log("Error with gemini-1.5-flash:", error.message);
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.0-pro");
    } catch (error) {
        console.log("Error with gemini-1.0-pro:", error.message);
    }
}

listModels();
