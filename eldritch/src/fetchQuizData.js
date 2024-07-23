import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBosuxYhROXTB6XQkFD7mq3JyacuSEpGW4"; // Directly hardcode your API key

const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    let prompt = `
        Validate the topic "${topic}" to ensure it is not a random combination of letters and that it represents actual words. If the topic is valid, generate ${numberOfQuestions} ${questionType} questions. Use LaTeX formatting for any mathematical expressions in the following JSON format:
        {
            "valid": true,
            "questions": [
                {
                    "question": "Sample question?",
                    ${questionType === 'true/false' ? `
                "options": ["True", "False"],
                ` : `
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                `}
                    "answer": "Correct Option"
                }
            ]
        }
        If the topic is not valid, return:
        {
            "valid": false,
            "error": "Invalid topic"
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        console.log('API response:', result);
        
        const responseData = JSON.parse(await result.response.text());
        console.log('Parsed response data:', responseData);

        if (!responseData.valid) {
            return { error: responseData.error };
        }

        const quizData = responseData.questions.map(question => ({
            ...question,
            question: question.question.replace(/\$/g, "\\(").replace(/\$/g, "\\)"), // Ensure LaTeX formatting
            options: question.options.map(option => option.replace(/\$/g, "\\(").replace(/\$/g, "\\)")) // Ensure LaTeX formatting
        }));

        return quizData;
    } catch (error) {
        console.error("Error generating content:", error);
        if (error.response && error.response.status === 400) {
            return { error: 'Invalid topic' };
        }
        return { error: 'Failed to generate quiz. Please try again.' };
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
