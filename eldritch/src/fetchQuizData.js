import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "API_KEY";

const genAI = new GoogleGenerativeAI(apiKey);

async function fetchQuestions(questionType, numberOfQuestions, topic) {
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

    let result = await model.generateContent(prompt);
    let quizData = JSON.parse(result.response.text());
    return quizData;
}

export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    if (questionType === "both") {
        const halfQuestions = Math.floor(numberOfQuestions / 2);
        const multipleChoiceQuestions = await fetchQuestions('multiple choice', halfQuestions, topic);
        const trueFalseQuestions = await fetchQuestions('true/false', numberOfQuestions - halfQuestions, topic);
        return [...multipleChoiceQuestions, ...trueFalseQuestions].sort(() => Math.random() - 0.5); // Randomly shuffle the questions
    } else {
        return fetchQuestions(questionType, numberOfQuestions, topic);
    }
}