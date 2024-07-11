import { GoogleGenerativeAI } from "@google/generative-ai";
//ho
const apiKey = "AIzaSyBosuxYhROXTB6XQkFD7mq3JyacuSEpGW4"; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    let prompt;
    if (questionType === 'both') {
        let multipleChoiceQuestions = Math.floor(numberOfQuestions / 2);
        let trueFalseQuestions = numberOfQuestions - multipleChoiceQuestions;

        prompt = `
            Validate the topic "${topic}" to ensure it is not a random combination of letters and that it represents actual words. If the topic is valid, generate ${multipleChoiceQuestions} multiple choice questions and ${trueFalseQuestions} true/false questions in the following JSON format:
            {
                "valid": true,
                "questions": {
                    "multipleChoice": [
                        {
                            "question": "Sample question?",
                            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                            "answer": "Correct Option"
                        }
                    ],
                    "trueFalse": [
                        {
                            "question": "Sample true/false question?",
                            "options": ["True", "False"],
                            "answer": "True"
                        }
                    ]
                }
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
            let quizData = shuffle([...responseData.questions.multipleChoice, ...responseData.questions.trueFalse]);
            return quizData;
        } catch (error) {
            console.error("Error generating content:", error);
            if (error.response && error.response.status === 400) {
                return { error: 'Invalid topic' };
            }
            throw error;
        }
    } else {
        prompt = `
            Validate the topic "${topic}" to ensure it is not a random combination of letters and that it represents actual words. If the topic is valid, generate ${numberOfQuestions} ${questionType} questions in the following JSON format:
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
            let quizData = responseData.questions;
            return quizData;
        } catch (error) {
            console.error("Error generating content:", error);
            if (error.response && error.response.status === 400) {
                return { error: 'Invalid topic' };
            }
            throw error;
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
