function FeatureCard({ title, description }) {
    return (
      <div className="p-6 bg-white rounded shadow hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-semibold mb-4 text-darkGray">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }
  
  // Features Component
  export default function Features() {
    const features = [
      {
        title: "Real-time Feedback",
        description: "Get instant feedback on your responses and improve your interview skills"
      },
      {
        title: "Custom Scenarios",
        description: "Practice with scenarios tailored to your experience level and target role"
      },
      {
        title: "Performance Analytics",
        description: "Track your progress and identify areas for improvement"
      }
    ];
  
    return (
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-darkGray">Why Choose InterviewAI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  