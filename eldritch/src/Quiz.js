import React, { useState } from 'react';
import Question from './Question';
import DropDown from './typeOfQuestion';
import { fetchQuizData } from './fetchQuizData';

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    //handling question type and number of Q's
    const [questionType, setQuestionType] = useState('');   
    const [quizData, setQuizData] = useState([]);
    const [numQuestions, setNumQuestions] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);


    const handleQuestionTypeChange = (selectedValue) => {
        setQuestionType(selectedValue);
    };

    const handleNumQuestionChange = (selectedNum) => {
        setNumQuestions(selectedNum)
    };

    const handleSubmit = async () => {
        const data = await fetchQuizData(questionType, numQuestions, 'water');       //hardcoded topic
        setQuizData(data);
        setShowQuiz(true);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestionIndex].answer) {
            setScore(score + 1);
        }
        setSelectedOption('');
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowScore(true);
        }
    };

    return (
        <div>
            {!showQuiz ? (
                <>
                    <DropDown
                        label="Question type:  "
                        options={["true/false", "Multiple Choice", "Both"]}
                        onChange={handleQuestionTypeChange}
                /> <br></br>
                    <DropDown
                        label="Number of questions:  "
                        options={[4, 6, 8]}
                        onChange={handleNumQuestionChange}
                /> <br></br>

                    <input
                        label="mySubmit"
                        type="button"
                        value="Start Quiz"
                        onClick={handleSubmit}
                    />
                </>
            ) :showScore ? (
                <div>
                    <h1>Your score: {score}/{quizData.length}</h1>
                </div>
            ) : (
                <div>
                    <Question
                        question={quizData[currentQuestionIndex].question}
                        options={quizData[currentQuestionIndex].options}
                        selectedOption={selectedOption}
                        onOptionSelect={handleOptionSelect}
                    />
                    <button onClick={handleNextQuestion}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
