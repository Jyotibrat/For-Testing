import React from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAuth } from '../contexts/AuthContext';

// Create a motion-wrapped Link component
const MotionLink = motion(Link);

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <MotionLink
            to="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Code className="w-8 h-8 text-blue-500" />
              <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              AI Tools Hub
            </h1>
          </MotionLink>

          <div className="flex items-center space-x-6">
            {user && (
              <UserMenu />
            )}
            <div className="px-4 py-2 bg-gray-800 rounded-full text-sm">
              <span className="text-green-400">●</span>
              <span className="ml-2 text-gray-300">7 AI Tools Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;