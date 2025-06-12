import React from "react";
import {
  Briefcase,
  Calendar,
  Building2,
  MapPin,
} from "lucide-react";

interface Experience {
  title?: string;
  company?: string;
  period?: string;
  location?: string;
  skills?: string[];
}

const ExperienceSection: React.FC = () => {
  const experiences: Experience[] = [
    {
      title: "Branch Manager",
      company: "State Bank of India",
      period: "Jun 2022 - Present",
      location: "Borpool Branch, Jorhat, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Manager (MPST)",
      company: "State Bank of India",
      period: "Feb 2014 - Jul 2022",
      location: "SBI, Multi Product Sales Team (MPST), Jorhat, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Deputy Manager",
      company: "State Bank of India",
      period: "May 2013 - Jan 2014",
      location: "SBI, RBO, Jorhat, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Investment Counsellor",
      company: "State Bank of India",
      period: "Jun 2010 - Apr 2013",
      location: "SBI, LHO, Guwahati, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Deputy Manager",
      company: "State Bank of India",
      period: "Nov 2009 - May 2010",
      location: "SBI, LHO, Guwahati, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Team Leader MRT",
      company: "State Bank of India",
      period: "Aug 2007 - Oct 2009",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Assistant Manager (Credit)",
      company: "State Bank of India",
      period: "2005 - 2008",
      location: "Bamunpukhuri Branch, Jorhat, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Team Leader MRT",
      company: "State Bank of India",
      period: "2005 - 2008",
      location: "Sarupathar Branch, Sarupathar, Assam, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
    {
      title: "Bank Teller",
      company: "State Bank of India",
      period: "Jun 1996 - Dec 2004",
      location: "Tura, Meghalaya, India",
      skills: [
        "Documentation",
        "Calibration",
        "Build Strong Relationships",
        "Communication",
        "Organizational Skills",
        "Oral Communication"
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            A journey of consistent growth and achievement in the banking sector
          </p>
        </div>

        <div className="relative">
          {/* Continuous timeline line that goes through all circles */}
          <div
            className="absolute left-6 w-0.5 bg-blue-300 hidden md:block"
            style={{
              height: `${(experiences.length - 1) * 15}rem`,
              top: "2.5rem",
            }}
          ></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-8 sm:mb-12 md:ml-16">
              {/* Timeline circle positioned over the line */}
              <div className="absolute -left-16 top-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hidden md:flex z-10 border-4 border-blue-300">
                <Briefcase className="text-white" size={16} />
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  {exp.title && (
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {exp.title}
                    </h3>
                  )}
                  {exp.period && (
                    <div className="flex items-center gap-2 text-blue-600 mt-2 lg:mt-0">
                      <Calendar size={16} />
                      <span className="font-semibold text-sm sm:text-base">
                        {exp.period}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
                  {exp.company && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 size={16} />
                      <span className="font-semibold text-sm sm:text-base">
                        {exp.company}
                      </span>
                    </div>
                  )}
                  {exp.location && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin size={16} />
                      <span className="text-sm sm:text-base">
                        {exp.location}
                      </span>
                    </div>
                  )}
                </div>

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
