import axios from 'axios';
import config from '../config'; // Ensure the path is correct

const BASE_URL = 'https://api.gemini.com/v1'; // Gemini API base URL

const getPublicData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-GEMINI-APIKEY': config.GEMINI_API_KEY, // Include API key in headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Gemini:', error);
        throw error; // Handle error appropriately in your components
    }
};

export { getPublicData };
