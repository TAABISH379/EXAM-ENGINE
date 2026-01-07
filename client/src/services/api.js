import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const generatePaper = async (config) => {
    try {
        const response = await API.post('/generate-paper', config);
        return response.data.paper;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
