import React from "react";
import { Download, Building2 } from "lucide-react";

interface HeroSectionProps {
  isVisible: boolean;
  scrollToSection: (sectionId: string) => void;
  downloadResume: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  isVisible,
  scrollToSection,
  downloadResume,
}) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://www.shutterstock.com/image-photo/stock-market-forex-trading-graph-600nw-2345047121.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80"></div>
      </div>

      <div
        className={`relative z-10 text-center text-white px-4 sm:px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Professional Profile Image */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl">
              <img
                src="./Portfolio_Image.jpeg"
                alt="Jagadish Chandra Paul - Professional Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-amber-400 rounded-full p-2 sm:p-3 shadow-lg border-4 border-amber-400">
              <Building2 className="text-blue-900" size={16} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Jagadish Chandra Paul
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Senior Banking Officer at State Bank of India
        </p>
        <p className="text-base sm:text-lg mb-8 sm:mb-12 text-blue-200 max-w-2xl mx-auto">
          Driving financial excellence and digital transformation in banking
          with over a decade of dedicated service
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <button
            onClick={() => scrollToSection("about")}
            className="bg-amber-500 hover:bg-amber-600 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Learn More About Me
          </button>
          <button
            onClick={downloadResume}
            className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Download size={18} />
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
