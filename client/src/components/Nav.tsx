import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  scrollToSection
}) => {
  const navItems = ['home', 'about', 'experience', 'skills', 'education', 'contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo SVG - Clickable to go to Home */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
          >
            <img 
              src="/JCP.svg" 
              alt="JCP Logo" 
              className="w-15 h-15 sm:w-15 sm:h-12"
            />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-colors duration-300 hover:text-blue-600 text-sm lg:text-base ${
                  activeSection === section ? 'text-blue-600 font-semibold' : 'text-gray-700'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-left py-2 px-4 rounded-lg transition-colors duration-300 ${
                    activeSection === section 
                      ? 'text-blue-600 font-semibold bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;