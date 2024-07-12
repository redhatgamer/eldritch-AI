import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCsywwrhOmbSs5z4fqUVSmT65fhHG1TEgg"; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchQuizData(questionType, numberOfQuestions, topic, difficulty) {
    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    switch (difficulty) {
        case 'easy':
            difficulty="basic"
            break;
        case 'medium': 
            difficulty = "intermediate"
            break;
        case 'hard': 
            difficulty = "advanced"
            break;
        default:
            break;
    }

    let prompt;
    if (questionType === 'both') {
        let multipleChoiceQuestions = Math.floor(numberOfQuestions / 2);
        let trueFalseQuestions = numberOfQuestions - multipleChoiceQuestions;

        let multipleChoicePrompt = `
            Please generate ${multipleChoiceQuestions} ${difficulty} multiple choice questions about ${topic},emphasizing the level selected, in the following JSON format:
            [
                {
                    "question": "Sample question?",
                    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                    "answer": "Correct Option"
                }
            ];
        `;

        let trueFalsePrompt = `
            Please generate ${trueFalseQuestions} ${difficulty} true/false questions about ${topic},emphasizing the level selected, in the following JSON format:
            [
                {
                    "question": "Sample true/false question?",
                    "options": ["True", "False"],
                    "answer": "True"
                }
            ];
        `;

        try {
            let multipleChoiceResult = await model.generateContent(multipleChoicePrompt);
            let trueFalseResult = await model.generateContent(trueFalsePrompt);
            let multipleChoiceData = JSON.parse(multipleChoiceResult.response.text());
            let trueFalseData = JSON.parse(trueFalseResult.response.text());
            let quizData = shuffle([...multipleChoiceData, ...trueFalseData]);
            return quizData;
        } catch (error) {
            console.error("Error generating content:", error);
            throw error;
        }
    } else {
        prompt = `
            Please generate ${numberOfQuestions} ${difficulty}, ${questionType} questions about ${topic}, emphasizing the level selected, in the following JSON format:
            [
                {
                    "question": "Sample question?",
                    ${questionType === 'true/false' ? `
                "options": ["True", "False"],
                ` : `
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                `}
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
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
