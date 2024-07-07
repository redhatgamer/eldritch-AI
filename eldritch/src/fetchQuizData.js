import { GoogleGenerativeAI } from "@google/generative-ai"; 
import config from "./config";


console.log("API Key:", config.GEMINI_API_KEY); // This should print your API key in the console

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);  //<--api key is stored in config, should have used .env file for protection but program wouldnt compile, for now this works for testing


export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    questionType = questionType === "Both" ? "multiple choice and true/false" : questionType;
    //if user checks both then it is changed to fit the prompt

    let prompt = `
    Please generate ${numberOfQuestions} ${questionType} questions about ${topic} in the following JSON format 
    and make sure the correct answer isnt always the same option:
    [
        {
            "question": "Sample question?",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "answer": "Correct Option"
        }
    ]`;

    try {
        let result = await model.generateContent(prompt);
        let quizData = JSON.parse(result.response.text());
        return quizData;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}
