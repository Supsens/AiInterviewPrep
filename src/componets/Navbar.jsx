import { Link } from "react-router-dom";

export default function Navbar() {
    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-darkGray">InterviewAI</div>
            <div className="space-x-6">
              <a href="#features" className="text-darkGray hover:text-pink">Features</a>
              <Link to="/question" className="text-darkGray hover:text-pink">
              <button className="bg-pink text-white py-2 px-4 rounded shadow hover:bg-darkGray">
                Get Started
              </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }