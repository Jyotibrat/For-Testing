import React from "react";
import { GraduationCap, Award } from "lucide-react";

interface EducationItem {
  degree?: string;
  specialization?: string;
  institution?: string;
  year?: string;
  grade?: string;
}

const EducationSection: React.FC = () => {
  const education: EducationItem[] = [
    {
      degree: "Post-Graduate Diploma in Business Analytics",
      institution: "SCDL, Pune, India",
      year: "2008 - 2010",
      grade: "First Class with Distinction",
    },
    {
      degree: "Post-graduate Diploma in Financial Advising",
      specialization: "Financial Planning and Services",
      institution: "Indian Institute of Banking and Finance",
      year: "2007 - 2008",
    },
    {
      degree: "Certified Associate of the Indian Institute of Bankers",
      specialization: "Banking and Financial Support Services",
      institution: "Indian Institute of Banking and Finance",
      year: "2003 - 2006",
    },
    {
      degree: "Bachelor of Science (B.Sc.)",
      specialization: "Chemistry",
      institution: "Goalpara College",
      year: "1992 - 1995",
      grade: "Second Class",
    },
    {
      degree: "Higher Secondary",
      specialization: "Science",
      institution: "Rokakhata HS School, Bilasipara, Assam, India",
      year: "1991 - 1992",
    },
    {
      degree: "High School",
      institution: "HN Seminary HS School, Bagribari, Assam, India",
      year: "1984 - 1990",
    },
  ];

  const certifications: string[] = [
    "Certificate in Discipline Management",
    "Content Marketing Certification",
    "CFP Certification - Global Excellence in Financial Planning",
    "Certified Financial Planner",
    "Certificate of Membership, Innovation Cell, MHRD, Govt. of India",
    "UGC - Net (Management)",
  ];

  return (
    <section id="education" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
              <GraduationCap className="text-blue-600" size={28} />
              Academic Qualifications
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  {edu.degree && (
                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {edu.degree}
                    </h4>
                  )}
                  {edu.specialization && (
                    <p className="text-blue-600 font-semibold mb-2 text-sm sm:text-base">
                      {edu.specialization}
                    </p>
                  )}
                  {edu.institution && (
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      {edu.institution}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {edu.year && (
                      <span className="text-gray-500 text-sm sm:text-base">
                        {edu.year}
                      </span>
                    )}
                    {edu.grade && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
              <Award className="text-amber-500" size={28} />
              Professional Certifications
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Award className="text-amber-600" size={20} />
                    </div>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">
                      {cert}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
