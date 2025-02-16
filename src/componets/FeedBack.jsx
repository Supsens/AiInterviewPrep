import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Link, useNavigate } from 'react-router-dom';

import Confetti from 'react-confetti'
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GEMINI_API}`);


async function FeedBack(questions, userAnswers) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
        I am an interviewer. I provided the following questions with answers:
        
        ${questions.map((q, i) => `Question ${i + 1}: ${q.question}, Desired Answer: ${q.answer}`).join('\n')}
        
        The candidate provided the following answers:
        
        ${userAnswers.map((ans, i) => `Answer ${i + 1}: ${ans}`).join('\n')}
        
        For each question, give the following:
        1. A score out of 10 based on how well the answer aligns with the desired answer.
        2. The desired answer.
        3. Feedback on where the candidate went wrong or how they can improve.
        
        Please format the output in JSON as follows:
        {
            "report": [
                {
                    "question": "Question text",
                    "desiredAnswer": "Desired answer text",
                    "userAnswer": "User's answer text",
                    "score": "Score out of 10",
                    "feedback": "Feedback for improvement"
                },
                ...
            ],
            "totalScore": "Total score out of 50"
        }
    `;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text().replace(/```(?:json)?|```/g, '');
    try {
        return JSON.parse(responseText);
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        throw error;
    }
}

function FeedBackPage({ questions, userAnswers }) {
  const width = window.innerWidth;
  const height=window.innerHeight;
    const [report, setReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const navigate = useNavigate();
    const [confetti, setConfetti] = useState(true);

    setTimeout(() => {
          setConfetti(false);
    },5000)
    const handleGetReport = async () => {
        setIsLoading(true); // Set loading to true before the request
        try {
            const evaluation = await FeedBack(questions, userAnswers);
            setReport(evaluation);
        } catch (error) {
            console.error("Error fetching report:", error);
        } finally {
            setIsLoading(false); // Set loading to false after the request
        }
    };

    return (
        <>
        {
            questions.length !== userAnswers.length ? (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please answer all the questions</h1>
                    <Link to="/question" className="bg-pink text-white py-2 px-4 rounded shadow hover:bg-darkGray transition-colors duration-300">
                        Start practicing now
                    </Link>
                </div>
            </div>
          ) : (<div className="py-12 px-4 bg-D7CDCC">
            <h1 className="text-4xl font-bold text-center text-1D1E2C">Congratulations on Completing the Interview!</h1>
            <div className="flex justify-center mt-8">
                <button 
                    onClick={handleGetReport} 
                    disabled={isLoading} 
                    className="bg-pink text-white py-2 px-4 rounded shadow hover:bg-darkGray transition-colors duration-300"
                >
                    {isLoading ? 'Loading...' : 'View Report'}
                </button>
            </div>

            {report && (
                <div className="mt-12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-semibold mb-4 text-1D1E2C">Feedback Report</h2>
                    {report.report.map((item, index) => (
                        <div key={index} className="feedback-card p-4 mb-4 border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold">Question {index + 1}: {item.question}</h3>
                            <p><strong>Desired Answer:</strong> {item.desiredAnswer}</p>
                            <p><strong>Your Answer:</strong> {item.userAnswer}</p>
                            <p><strong>Score:</strong> {item.score} / 10</p>
                            <p><strong>Feedback:</strong> {item.feedback}</p>
                        </div>
                    ))}
                    <h3 className="text-xl font-semibold mt-4">Total Score: {report.totalScore} / 50</h3>
                    {
                        report.totalScore >= 40 ? (
                            <p className="text-green-600">You passed the interview! Keep up the good work!</p>
                        ) : (

                            <p className="text-red-600">You failed the interview. Please try again.
                            <button
                                className="bg-pink text-white py-2 px-4 rounded shadow hover:bg-darkGray transition-colors duration-300"
                                onClick={() => {navigate("/question")}}
                            >
                                Try Again
                            </button>
                            </p>
                        )


                    }
                </div>
            )}
            {
                confetti && (
                    <Confetti
                        width={width}
                        height={height}
                    />
                )
                
            }
        </div>
        )
        }
        
        </>
    );
}

export default FeedBackPage;
