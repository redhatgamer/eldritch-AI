import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCsywwrhOmbSs5z4fqUVSmT65fhHG1TEgg"; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

export async function fetchQuizData(questionType, numberOfQuestions, topic) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    let prompt;
    if (questionType === 'both') {
        const multipleChoiceQuestions = Math.floor(numberOfQuestions / 2);
        const trueFalseQuestions = numberOfQuestions - multipleChoiceQuestions;

        const multipleChoicePrompt = `
            Please generate ${multipleChoiceQuestions} multiple choice questions about ${topic} in the following JSON format:
            [
                {
                    "question": "Sample question?",
                    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                    "answer": "Correct Option"
                }
            ];
        `;

        const trueFalsePrompt = `
            Please generate ${trueFalseQuestions} true/false questions about ${topic} in the following JSON format:
            [
                {
                    "question": "Sample true/false question?",
                    "options": ["True", "False"],
                    "answer": "True"
                }
            ];
        `;

        try {
            const [multipleChoiceResult, trueFalseResult] = await Promise.all([
                model.generateContent(multipleChoicePrompt),
                model.generateContent(trueFalsePrompt)
            ]);

            const multipleChoiceData = JSON.parse(multipleChoiceResult.response.text());
            const trueFalseData = JSON.parse(trueFalseResult.response.text());
            const quizData = shuffle([...multipleChoiceData, ...trueFalseData]);
            return quizData;
        } catch (error) {
            console.error("Error generating content:", error);
            throw error;
        }
    } else {
        prompt = `
            Please generate ${numberOfQuestions} ${questionType} questions about ${topic} in the following JSON format:
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
            const result = await model.generateContent(prompt);
            const quizData = JSON.parse(result.response.text());
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
