
import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { Plus } from 'lucide-react';

// Mocked blog data (this could come from an API)
const blogs = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    content: "Explore how artificial intelligence is revolutionizing the way we build and interact with websites. From AI-powered design tools to intelligent chatbots, discover the latest trends shaping the future of web development...",
    date: "May 15, 2024",
    author: "Alex Chen",
    image: "/api/placeholder/800/400",
  },
  {
    id: 2,
    title: "Optimizing React Performance: A Deep Dive",
    content: "Learn advanced techniques to boost your React application's performance. We'll cover code splitting, memoization, and the latest React features that can help you create lightning-fast user interfaces...",
    date: "May 12, 2024",
    author: "Sarah Johnson",
  },
  // More blog data
];

const SingleBlogPost = () => {
  const { id } = useParams<{ id: string }>(); // Assuming the ID is passed via URL
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow pt-8 pb-16 lg:pt-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold mb-6 dark:text-white">Blog Not Found</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold text-gray-900 dark:text-white">DevInsight</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Home</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            {blog.image && (
              <div className="mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              <time>{blog.date}</time> • <span>{blog.author}</span>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">{blog.content}</p>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 p-6 text-gray-700 dark:text-gray-400 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="mb-4 sm:mb-0">&copy; 2024 DevInsight. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
      
      {/* Floating Create Button */}
      <button
        onClick={() => console.log("Navigate to Create Blog Page")}
        className="fixed bottom-12 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
        aria-label="Create new blog post"
      >
        <Plus size={24} />
        <span className="ml-2 hidden md:inline">Create Blog</span>
      </button>
    </div>
  );
};

const Navbar = () => (
  <nav className="bg-white dark:bg-gray-800 shadow">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-gray-900 dark:text-white">DevInsight</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/" className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Home</a>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-800 p-6 text-gray-700 dark:text-gray-400 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
      <p className="mb-4 sm:mb-0">&copy; 2024 DevInsight. All rights reserved.</p>
      <div className="space-x-4">
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default SingleBlogPost;