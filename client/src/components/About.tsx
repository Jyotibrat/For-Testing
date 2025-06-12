import React from 'react';
import { User, Target, CheckCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  const achievements = [
    "Managed portfolio worth ₹500+ Crores with zero NPAs",
    "Led digital transformation initiative for 15 branches",
    "Achieved 125% of annual targets for 5 consecutive years",
    "Trained and mentored 50+ banking professionals",
    "Recognized with Excellence Award 3 times"
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">About Me</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 sm:p-8 rounded-xl">
              <User className="text-blue-600 mb-4" size={32} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Professional Profile</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                As a dedicated banking professional with over 10 years of experience at State Bank of India, 
                I have consistently delivered exceptional results in customer service, risk management, and 
                digital banking transformation. My expertise spans credit analysis, team leadership, and 
                strategic financial planning.
              </p>
            </div>
            
            <div className="bg-amber-50 p-6 sm:p-8 rounded-xl">
              <Target className="text-amber-600 mb-4" size={32} />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Mission & Vision</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Committed to advancing financial inclusion and digital innovation in banking while maintaining 
                the highest standards of integrity and customer service. I strive to bridge traditional banking 
                excellence with modern technological solutions.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 sm:p-8 rounded-xl text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Key Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                  <p className="text-sm sm:text-base">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;