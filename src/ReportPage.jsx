import React from 'react';
import './ReportPage.css'; // Import the CSS file

const ReportPage = ({ all_Questions, userAnswers, correctAnswers }) => {
    return (
        <div className="report-container">
            <h1 className="report-title">Quiz Report</h1>
            {all_Questions.map((question, index) => (
                <div key={index} className="question-card">
                    <p className="question-number">Question {index + 1}:</p>
                    <p className="question-text">Question: {question.question}</p>
                    <p className="user-answer">User's Answer: {userAnswers[index]}</p>
                    <p className="correct-answer">Correct Answer: {correctAnswers[index]}</p>
                </div>
            ))}
        </div>
    );
};

export default ReportPage;
