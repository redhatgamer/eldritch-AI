// src/services/geminiService.js

import axios from 'axios';
import config from '..config.js'

const BASE_URL = 'https://api.gemini.com/v1'; // Gemini API base URL

const getPublicData = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Gemini:', error);
        throw error; // Handle error appropriately in your components
    }
};

export { getPublicData };
