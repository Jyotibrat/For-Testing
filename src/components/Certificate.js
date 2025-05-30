// icons
import { RxArrowTopRight } from "react-icons/rx";
import { motion } from 'framer-motion';
import Image from 'next/image';

// data
const CertificateData = [
    {
        title: 'Fundamentals of Machine Learning and Artificial Intelligence',
        img: '/AWS_Certification_on_Fundamentals_of_AI_and_ML.png',
        link: 'https://www.linkedin.com/in/bindupautra-jyotibrat-a65693289/details/certifications/1718472439026/single-media-viewer/?profileId=ACoAAEYLyy0BAfljEsrWtQM_6WXPdyr3qIRneoQ',
        provider: 'AWS',
        category: 'AI/ML',
        year: '2024',
        skills: ['Machine Learning', 'AI Fundamentals', 'AWS Services']
    },
    {
        title: 'Foundations of Cybersecurity',
        img: '/Coursera_Foundations_of_Cybersecurity_by_Google.png',
        link: 'https://www.coursera.org/account/accomplishments/verify/XRRUN7FCMGC4',
        provider: 'Google',
        category: 'Cybersecurity',
        year: '2024',
        skills: ['Security Fundamentals', 'Risk Management', 'Compliance']
    },
    {
        title: 'Introduction to Software Engineering',
        img: '/Coursera_Introduction_to_Software_Engineering_by_IBM.png',
        link: 'https://www.coursera.org/account/accomplishments/verify/PA53HKYY9664',
        provider: 'IBM',
        category: 'Software Engineering',
        year: '2024',
        skills: ['SDLC', 'Agile', 'Software Design']
    },
    {
        title: 'Generative AI: Introduction and Applications',
        img: '/Generative_AI_Introduction_and_Applications.png',
        link: 'https://www.coursera.org/account/accomplishments/verify/4OPQVOI0OSQB',
        provider: 'Coursera',
        category: 'Generative AI',
        year: '2024',
        skills: ['Generative AI', 'LLMs', 'AI Applications']
    },
    {
        title: 'Learn Java',
        img: '/bjyotibrat_Learn_Java.png',
        link: 'https://www.codechef.com/certificates/public/d6a4d6f',
        provider: 'CodeChef',
        category: 'Programming',
        year: '2024',
        skills: ['Java', 'OOP', 'Data Structures']
    },
    {
        title: 'Learn C++',
        img: '/bjyotibrat_Learn_Cpp_1.png',
        link: 'https://www.codechef.com/certificates/public/1154e00',
        provider: 'CodeChef',
        category: 'Programming',
        year: '2024',
        skills: ['C++', 'Algorithms', 'Problem Solving']
    },
    {
        title: 'Learn Python',
        img: '/bjyotibrat_Learn_Python_1.png',
        link: 'https://www.codechef.com/certificates/public/9437588',
        provider: 'CodeChef',
        category: 'Programming',
        year: '2024',
        skills: ['Python', 'Data Analysis', 'Automation']
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.8,
        rotateX: -15
    },
    show: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8
        }
    }
};

const CertificateShowcase = () => {
    return (
        <div className='relative py-16'>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='text-center mb-16'
            >
                <div className='inline-block mb-4'>
                    <div className='flex items-center gap-4'>
                        <div className='w-8 h-1 bg-accent rounded-full'></div>
                        <span className='text-accent/80 font-medium tracking-wider uppercase text-sm'>Portfolio</span>
                        <div className='w-8 h-1 bg-secondary rounded-full'></div>
                    </div>
                </div>
            </motion.div>

            {/* Certificates Grid */}
            <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='show'
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4'
            >
                {CertificateData.map((cert, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.05,
                            rotateY: 5,
                            z: 100
                        }}
                        whileTap={{ scale: 0.95 }}
                        className='group relative perspective-1000'
                    >
                        {/* Card Container */}
                        <div className='relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden h-[480px] hover:border-accent/30 transition-all duration-500 transform-gpu'>
                            {/* Background Gradient Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                            
                            {/* Animated Border */}
                            <div className='absolute inset-0 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10'></div>

                            {/* Content */}
                            <div className='relative z-10 p-6 h-full flex flex-col'>
                                {/* Header */}
                                <div className='flex items-start justify-between mb-4'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-2 h-2 bg-accent rounded-full animate-pulse'></div>
                                        <span className='text-accent/80 text-xs font-semibold uppercase tracking-wider'>
                                            {cert.category}
                                        </span>
                                    </div>
                                    <div className='text-white/40 text-sm font-medium'>
                                        {cert.year}
                                    </div>
                                </div>

                                {/* Certificate Image */}
                                <div className='relative mb-6 flex-shrink-0 bg-white/5 rounded-2xl p-4 group-hover:bg-white/10 transition-colors duration-300'>
                                    <div className='relative h-32 w-full overflow-hidden rounded-xl'>
                                        <Image
                                            src={cert.img}
                                            alt={cert.title}
                                            fill
                                            className='object-contain transition-transform duration-500 group-hover:scale-110'
                                        />
                                    </div>
                                    
                                    {/* Hover Effect - External Link Icon */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        className='absolute top-2 right-2 w-8 h-8 bg-accent/20 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'
                                    >
                                        <RxArrowTopRight className='w-4 h-4 text-accent' />
                                    </motion.div>
                                </div>

                                {/* Certificate Info */}
                                <div className='flex-grow space-y-4'>
                                    <div>
                                        <h3 className='text-white font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300'>
                                            {cert.title}
                                        </h3>
                                        <p className='text-white/60 font-medium text-sm'>
                                            by {cert.provider}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className='space-y-2'>
                                        <h4 className='text-white/70 text-xs font-semibold uppercase tracking-wider'>Skills</h4>
                                        <div className='flex flex-wrap gap-1.5'>
                                            {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className='px-2 py-1 bg-white/10 text-white/70 rounded-md text-xs hover:bg-accent/20 hover:text-accent transition-all duration-300 cursor-default'
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className='mt-6 pt-4 border-t border-white/10'>
                                    <a
                                        href={cert.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='group/btn w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent/20 to-secondary/20 hover:from-accent hover:to-secondary text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 transform hover:scale-105'
                                    >
                                        <span>View Credential</span>
                                        <RxArrowTopRight className='w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1' />
                                    </a>
                                </div>
                            </div>

                            {/* Glowing Effect */}
                            <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'></div>
                        </div>

                        {/* Card Shadow */}
                        <div className='absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-20 transform scale-105'></div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className='text-center mt-16'
            >
                <div className='inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:border-accent/30 transition-all duration-300 cursor-pointer group'>
                    <span className='text-white/80 group-hover:text-white transition-colors font-medium'>
                        Explore More Achievements
                    </span>
                    <div className='w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors'>
                        <RxArrowTopRight className='w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CertificateShowcase;