import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ExternalLink, Search, BookOpen } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  author: string;
  url: string;
  excerpt: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock blog data - in real app, this would fetch from Blogger API
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Getting Started with AI Tools Hub: A Complete Guide',
        content: 'Learn how to make the most of our AI-powered tools for your daily workflow...',
        published: '2024-01-15',
        author: 'Alex Johnson',
        url: 'https://aitoolshub.blogspot.com/2024/01/getting-started-guide.html',
        excerpt: 'A comprehensive guide to using AI Tools Hub effectively, covering all seven tools and best practices for maximum productivity.'
      },
      {
        id: '2',
        title: 'The Future of AI-Powered Development Tools',
        content: 'Exploring how AI is revolutionizing the way we write code and build applications...',
        published: '2024-01-10',
        author: 'Sarah Chen',
        url: 'https://aitoolshub.blogspot.com/2024/01/future-ai-development.html',
        excerpt: 'An in-depth look at how AI is transforming software development and what developers can expect in the coming years.'
      },
      {
        id: '3',
        title: 'AI Prompt Engineering: Best Practices and Tips',
        content: 'Master the art of crafting effective prompts for better AI responses...',
        published: '2024-01-05',
        author: 'Michael Rodriguez',
        url: 'https://aitoolshub.blogspot.com/2024/01/prompt-engineering-tips.html',
        excerpt: 'Essential techniques for writing prompts that get you the best results from AI models, with practical examples and strategies.'
      },
      {
        id: '4',
        title: 'Code Review with AI: Transforming Quality Assurance',
        content: 'How AI tools are changing the landscape of code review and quality control...',
        published: '2024-01-01',
        author: 'Emily Zhang',
        url: 'https://aitoolshub.blogspot.com/2024/01/ai-code-review.html',
        excerpt: 'Discover how AI-powered code analysis tools are helping developers write better, more secure code with automated insights.'
      },
      {
        id: '5',
        title: 'Building Multilingual Applications with AI Translation',
        content: 'Leveraging AI translation tools for global software development...',
        published: '2023-12-28',
        author: 'David Park',
        url: 'https://aitoolshub.blogspot.com/2023/12/multilingual-ai-translation.html',
        excerpt: 'Learn how to integrate AI translation capabilities into your applications for seamless global user experiences.'
      },
      {
        id: '6',
        title: 'Sentiment Analysis in User Feedback: A Practical Guide',
        content: 'Using AI to understand customer emotions and improve product development...',
        published: '2023-12-25',
        author: 'Lisa Wang',
        url: 'https://aitoolshub.blogspot.com/2023/12/sentiment-analysis-guide.html',
        excerpt: 'Practical applications of sentiment analysis for product managers and developers to better understand user feedback.'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen px-6 py-12"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI Tools Hub Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insights, tutorials, and updates from the world of AI-powered development
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mb-12"
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-400">Article</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-3 text-white line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.published)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </motion.div>
        )}

        {/* Blog Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-4">About Our Blog</h2>
          <p className="text-gray-300 mb-4">
            Our blog features the latest insights, tutorials, and updates about AI-powered development tools. 
            From beginner guides to advanced techniques, we cover everything you need to know about leveraging 
            AI in your development workflow.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">AI Development</span>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">Machine Learning</span>
            <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">Productivity</span>
            <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-sm">Tutorials</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog;