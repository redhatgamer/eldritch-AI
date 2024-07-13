import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBosuxYhROXTB6XQkFD7mq3JyacuSEpGW4"; // Use environment variable for API key

const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    let prompt = `
        Validate the topic "${topic}" to ensure it is not a random combination of letters and that it represents actual words. If the topic is valid, generate ${numberOfQuestions} ${questionType} questions. Use LaTeX formatting for any mathematical expressions(Ensure that the input for formulas follows the correct LaTeX or MathML syntax. For example, for a formula like the kinetic energy equation, it should be formatted as E_k = \frac{1}{2}mv^2) in the following JSON format:
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
        let result = await model.generateContent(prompt);
        let responseData = JSON.parse(result.response.text());
        if (!responseData.valid) {
            return { error: responseData.error };
        }
        let quizData = responseData.questions.map(question => ({
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
        throw error;
    }
}

