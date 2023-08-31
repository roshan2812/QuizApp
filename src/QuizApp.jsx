import React, { useState, useEffect } from 'react';
import './QuizApp.css';
import ReportPage from './ReportPage';
import axios from 'axios';


const QuizApp = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [remainingTime, setRemainingTime] = useState(1800);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [shuffledOptions, setShuffledOptions] = useState([]);


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=15');
                const data = response.data;
                console.log(data)
                setQuestions(data.results);
                setAnsweredQuestions(Array(data.results.length).fill(false));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    console.log("qes",questions)

    useEffect(() => {
        if (questions.length > 0) {
            setShuffledOptions(shuffleArray([...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer]));
        }
    }, [currentQuestionIndex, questions]);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        if (remainingTime === 0) {
            clearInterval(timer);
            setQuizFinished(true);
        }

        return () => clearInterval(timer);
    }, [remainingTime, currentQuestionIndex, questions.length]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setUserAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = option;
            return updatedAnswers;
        });
        const updatedAnsweredQuestions = [...answeredQuestions];
        updatedAnsweredQuestions[currentQuestionIndex] = true;
        setAnsweredQuestions(updatedAnsweredQuestions);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const finishQuiz = () => {
        setQuizFinished(true)
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (quizFinished) {
        return <ReportPage all_Questions={questions} userAnswers={userAnswers} correctAnswers={questions.map(q => q.correct_answer)} />;
    }

    const handleNavigation = (index) => {
        setCurrentQuestionIndex(index);
    };


    return (
        <div className="quiz-container">
            <h1>Quiz App</h1>
            <p>Time Remaining: {minutes}:{seconds}</p>
            <div className="navigation-panel">
                {questions.map((_, index) => (
                    <button
                        key={index}
                        className={`navigation-button ${index === currentQuestionIndex ? 'active' : ''} ${answeredQuestions[index] ? 'answered' : ''}`}
                        onClick={() => handleNavigation(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <div className="question-container">
                <p dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                <ul>
                    {shuffledOptions.map((option, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={selectedOption === option || userAnswers[currentQuestionIndex] === option}
                                    onChange={() => handleOptionSelect(option)}
                                />
                                {option}
                            </label>
                        </li>
                    ))}
                </ul>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button className="next-button" onClick={handleNextQuestion}>
                        Next
                    </button>
                ) : (
                    <button className="finish-button" onClick={finishQuiz}>
                        Finish
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizApp;
