import React from 'react';
import { TrendingUp, Shield, Users, Target, Building2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
}

const SkillsSection: React.FC = () => {
  const skills: Skill[] = [
    { name: "Credit Analysis", level: 95, icon: TrendingUp },
    { name: "Risk Management", level: 90, icon: Shield },
    { name: "Customer Relationship Management", level: 95, icon: Users },
    { name: "Financial Planning", level: 88, icon: Target },
    { name: "Digital Banking", level: 85, icon: Building2 },
    { name: "Team Leadership", level: 92, icon: Users }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">Core Competencies</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Expertise developed through years of hands-on experience in banking and finance
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.level}% Proficiency</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;