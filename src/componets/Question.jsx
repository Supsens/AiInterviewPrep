import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import "../utils/Loader.css";
import toast from "react-hot-toast";
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GEMINI_API}`);

async function getQuestion(role, experience, companyName) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = `You are an interviewer. You will be given: a. job role, b. experience, and c. company name. Generate five questions related to the above in JSON format for:
    a. ${role}, b. ${experience} years of experience, c. ${companyName}. Also, provide suitable answers.
    The output should be in JSON format with keys jobRole, experience, companyName, and questions.`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text().replace(/```(?:json)?|```/g, "");
  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw error;
  }
}

function Question({ setResult }) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || !experience || !companyName) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await getQuestion(role, experience, companyName);

      console.log(response);

      setResult(response);
      setRole("");
      setExperience("");
      setCompanyName("");
    toast.success("Questions generated successfully!");
      navigate("/cards");
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-50 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Generate Interview Questions
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Job Role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Experience (years):
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select experience level
              </option>
              <option value="0-1">0-1 years</option>
              <option value="2-3">2-3 years</option>
              <option value="4-5">4-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Company Name:
            </label>
            <select
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="" disabled>
                Select a company
              </option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Facebook">Facebook</option>
              <option value="Apple">Apple</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pink text-white font-semibold py-2 rounded-md hover:bg-darkGray focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            Generate Questions
          </button>
        </form>
      </div>
      {loading && (
        <>
          <div className="flex items-center justify-center  mt-10">
            <div className="loader"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
