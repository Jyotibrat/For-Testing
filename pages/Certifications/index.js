// components
import CertificateShowcase from '@/components/Certificate';
import Bulb from '@/components/Bulb';
import Circles from '@/components/Circles';
import GlobeWithAwardBadges from '@/components/GlobeWithAwardBadges';
// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

const Certificate = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/20 via-primary/5 to-secondary/10 relative overflow-hidden'>
      <Circles />
      
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className='absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl'
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className='absolute bottom-20 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl'
        />
      </div>

      {/* Hero Section with Globe */}
      <div className='container mx-auto px-4 py-32'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className='flex-1 text-center lg:text-left'
          >
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
              My <span className='text-accent'>Certifications</span>
            </h1>
            <p className='text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0'>
              A collection of professional certifications and achievements that showcase my expertise and commitment to continuous learning in technology.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className='flex gap-8 pt-6'
            >
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-accent mb-2'>35+</div>
                <div className='text-white/60 text-sm md:text-base'>CERTIFICATIONS</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-accent mb-2'>10+</div>
                <div className='text-white/60 text-sm md:text-base'>PLATFORMS</div>
              </div>
              <div className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-accent mb-2'>2025</div>
                <div className='text-white/60 text-sm md:text-base'>LATEST</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className='pt-4'
            >
              <button className='group relative px-8 py-4 bg-gradient-to-r from-accent to-secondary rounded-full text-white font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 transform hover:scale-105 overflow-hidden'>
                <span className='relative z-10'>Explore Credentials</span>
                <div className='absolute inset-0 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0'></div>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Globe */}
          <div className='flex-1'>
            <GlobeWithAwardBadges />
          </div>
        </div>
      </div>

      {/* Certificates Showcase */}
      <div className='relative z-10 py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='text-center mb-16'
          >
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              My <span className='text-accent'>Achievements</span>
            </h2>
            <p className='text-white/70 text-lg max-w-2xl mx-auto'>
              Each certification represents dedication, expertise, and commitment to excellence in technology
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='w-full'
          >
            <CertificateShowcase />
          </motion.div>
        </div>
      </div>

      <Bulb />
    </div>
  );
};

export default Certificate;