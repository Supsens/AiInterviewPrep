import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Cards = ({ jobRole, experience, companyName, questions, userAnswers, setUserAnswers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const navigate = useNavigate();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span className="text-red-500">Browser does not support speech recognition.</span>;
  }

  const handleStartRecording = () => {
    resetTranscript();
    toast.success('Listening...');
    SpeechRecognition.startListening();
    
  };

  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
    toast.success('Stopped listening.');
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = transcript;
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      navigate('/feedback');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200 mt-8 sm:p-8 md:mt-12 lg:max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Job Role: {jobRole}</h1>
      <h2 className="text-xl text-gray-700 text-center">Experience: {experience}</h2>
      <h2 className="text-xl text-gray-700 mb-6 text-center">Company: {companyName}</h2>

      {!isCompleted ? (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Question {currentIndex + 1}:</h3>
          <p className="text-gray-700"><strong>Q:</strong> {questions[currentIndex].question}</p>
          <p className="text-gray-600 mt-2"><strong>Suggested Answer:</strong> {questions[currentIndex].answer}</p>

          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Your Answer:</h3>
          <label className="block mt-4">
            <strong>Your Answer (using mic):</strong>
            <p className="bg-gray-100 text-gray-800 p-3 rounded mt-2">
              {userAnswers[currentIndex] || "Click 'Start Recording' to record your answer"}
            </p>
          </label>

          <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleStartRecording}
              className={`w-full sm:w-auto px-4 py-2 font-semibold text-white rounded-lg ${
                listening ? 'bg-pink' : 'bg-pink hover:bg-darkBlueGray'
              }`}
            >
              {listening ? 'Recording...' : 'Start Recording'}
            </button>
            <button
              onClick={handleStopRecording}
              className="w-full sm:w-auto px-4 py-2 font-semibold text-white bg-pink hover:bg-darkBlueGray rounded-lg"
            >
              Stop Recording
            </button>
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-4 py-2 font-semibold text-white bg-pink hover:bg-darkBlueGray rounded-lg"
            >
              {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Thank you for completing the questions!</h3>
          <button
            onClick={() => navigate('/feedback')}
            className="mt-4 px-6 py-2 font-semibold text-white bg-pink hover:bg-blue-600 rounded-lg"
          >
            View Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Cards;
