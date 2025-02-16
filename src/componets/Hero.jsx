import { Link } from "react-router-dom";
export default function Hero() {
    return (
      <div className="bg-gradient-to-r from-beige to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-darkGray mb-6">
              Master Your Tech Interviews with AI
            </h1>
            <p className="text-xl text-darkGray mb-8">
              Practice with our AI interviewer and get real-time feedback to improve your skills
            </p>
            <Link to={'/question'}>
            <button className="bg-white text-pink py-2 px-4 rounded shadow hover:bg-gray-100">
              Start Practicing Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }