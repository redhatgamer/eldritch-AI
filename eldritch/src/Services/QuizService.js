import axios from 'axios';

const API_KEY = 'your_openai_api_key'; // Replace with your actual OpenAI API key
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

export const fetchAIQuestions = async (topic) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                prompt: `Generate a multiple-choice quiz question on the topic: ${topic}`,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.5,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching AI questions:', error);
        return null;
    }
};
