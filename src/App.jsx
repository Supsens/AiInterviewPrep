import { Route,Routes } from "react-router-dom";
import Question from "./componets/Question";
import Cards from "./componets/Cards";
import { useState } from "react";
import FeedBack from "./componets/FeedBack";
import Navbar from './componets/Navbar';
import Hero from './componets/Hero';
import Features from './componets/Features';
import CTA from './componets/CTA';
import  { Toaster } from 'react-hot-toast';

export default function App() {
  const [result, setResult] = useState({
    jobRole: '',
    experience: '',
    companyName: '',
    questions: [],
  });
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(''));
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<>
        
      <Hero />
      <Features />
      <CTA />
     
      </>} />
      
      <Route path="/question" element={<Question setResult={setResult} />} />
      <Route path="/cards" element={<Cards jobRole={result.jobRole} experience={result.experience} companyName={result.companyName} questions={result.questions} setUserAnswers={setUserAnswers} userAnswers={userAnswers} />} />
      <Route path="/feedback" element={<FeedBack questions={result.questions} userAnswers={userAnswers} />} />

    </Routes>
    <Toaster/>
    </>
  )
}
