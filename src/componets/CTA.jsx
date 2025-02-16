export default function CTA() {
    const githubProfilePic = "https://github.com/supsens.png"; 
    return (
      <div className="bg-beige py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-darkGray">Connect with Me</h2>
          
          <div className="flex justify-center mb-4">
            <img 
              src={githubProfilePic} 
              alt="My GitHub Profile" 
              className="w-24 h-24 rounded-full border-4 border-pink shadow-md" 
            />
          </div>
          
          <p className="text-lg text-darkGray mb-8">
            I'm passionate about technology and always eager to learn new things. 
            Feel free to check out my GitHub profile and connect with me!
          </p>
          <button className="bg-pink text-white py-2 px-4 rounded shadow hover:bg-darkGray">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/supsens">
              Supsens
            </a>
          </button>
        </div>
      </div>
    );
  }
  