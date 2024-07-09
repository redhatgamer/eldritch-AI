import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyBosuxYhROXTB6XQkFD7mq3JyacuSEpGW4"; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    let prompt = `
        Please generate ${numberOfQuestions} ${questionType} questions about ${topic} in the following JSON format:
        [
            {
                "question": "Sample question?",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "answer": "Correct Option"
            }
        ];
    `;

    try {
        let result = await model.generateContent(prompt);
        let quizData = JSON.parse(result.response.text());
        return quizData;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}
