import React, { useState, useRef, Fragment, useCallback } from 'react';
import { Plus, X, Upload } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
}

const BlogHome = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  

  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt: "Explore how artificial intelligence is revolutionizing the way we build and interact with websites.",
      date: "May 15, 2024",
      author: "Alex Chen",
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "Optimizing React Performance: A Deep Dive",
      excerpt: "Learn advanced techniques to boost your React application's performance.",
      date: "May 12, 2024",
      author: "Sarah Johnson"
    },
    {
      id: 3,
      title: "The Rise of Web3: What Developers Need to Know",
      excerpt: "Dive into the world of Web3 and blockchain technology.",
      date: "May 8, 2024",
      author: "Michael Brown",
      image: "/api/placeholder/800/400"
    },
    {
      id: 4,
      title: "Mastering CSS Grid: Advanced Layout Techniques",
      excerpt: "Take your CSS skills to the next level with advanced CSS Grid techniques.",
      date: "May 5, 2024",
      author: "Emily Taylor"
    }
  ]);

  const featuredBlogs = [
    {
      id: 5,
      title: "TypeScript Best Practices in 2024",
      date: "May 1, 2024",
      author: "David Lee",
      image: "/api/placeholder/80/80"
    },
    {
      id: 6,
      title: "Building Accessible Web Applications",
      date: "Apr 28, 2024",
      author: "Rachel Green",
      image: "/api/placeholder/80/80"
    },
    {
      id: 7,
      title: "Serverless Architecture: Pros and Cons",
      date: "Apr 25, 2024",
      author: "Chris Anderson",
      image: "/api/placeholder/80/80"
    }
  ];

  const ModalWrapper = ({ isOpen, closeModal, title, children }: {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-white mb-6 flex justify-between items-center"
                >
                  {title}
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  const LoginModal = () => (
    <ModalWrapper isOpen={isLoginOpen} closeModal={() => setIsLoginOpen(false)} title="Login">
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input type="password" id="password" name="password" required className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4" />
        </div>
        <div className="mt-4">
          <button type="submit" className="w-full py-2 px-4 border rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Login
          </button>
        </div>
      </form>
    </ModalWrapper>
  );

  const SignupModal = () => (
    <ModalWrapper isOpen={isSignupOpen} closeModal={() => setIsSignupOpen(false)} title="Sign Up">
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input type="password" id="password" name="password" required className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4" />
        </div>
        <div className="mt-4">
          <button type="submit" className="w-full py-2 px-4 border rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </div>
      </form>
    </ModalWrapper>
  );

  const CreateBlogModal = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleRemoveImage = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setSelectedImage(null);
    }, []);
  
    const handleCreateBlog = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const newBlog: Blog = {
        id: blogs.length + 1,
        title,
        excerpt: content.length > 100 ? content.slice(0, 100) + '...' : content,
        date: new Date().toLocaleDateString(),
        author: "Admin", // Static author name
        image: selectedImage || undefined,
      };
  
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      setIsCreateBlogOpen(false);
      setSelectedImage(null);
      setTitle(''); // Reset title
      setContent(''); // Reset content
    };
  
    return (
      <ModalWrapper isOpen={isCreateBlogOpen} closeModal={() => setIsCreateBlogOpen(false)} title="Create New Blog Post">
        <form className="space-y-6" onSubmit={handleCreateBlog}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-12 px-4"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border rounded-md text-sm text-gray-300 bg-gray-700 hover:bg-gray-600"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              {selectedImage && (
                <div className="relative w-24 h-24">
                  <img src={selectedImage} alt="Selected" className="w-full h-full object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Create Blog Post
            </button>
          </div>
        </form>
      </ModalWrapper>
    );
  };
  
  
  

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
              <button onClick={() => setIsLoginOpen(true)} className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">Login</button>
              <button onClick={() => setIsSignupOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            
            {/* Blog List */}
            <section className="lg:w-3/4 mb-8 lg:mb-0">
              <h1 className="text-3xl font-extrabold mb-6 dark:text-white">Latest Insights</h1>
              <div className="space-y-8">
                {blogs.map((blog) => (
                  <article key={blog.id} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
                    {blog.image && (
                      <div className="mb-4">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">{blog.title}</a>
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {blog.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <time>{blog.date}</time> • <span>{blog.author}</span>
                      </div>
                      <a href="#" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Read More
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
              
            {/* Sidebar with Featured Blogs */}
            <aside className="lg:w-1/4 lg:pl-8">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Featured</h2>
              <div className="space-y-6">
                {featuredBlogs.map((blog) => (
                  <div key={blog.id} className="flex items-start space-x-4">
                    <img
                      className="w-20 h-20 object-cover rounded-lg"
                      src={blog.image}
                      alt={blog.title}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">{blog.title}</a>
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {blog.date} • {blog.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
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

      <button
        onClick={() => setIsCreateBlogOpen(true)}
        className="fixed bottom-12 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
        aria-label="Create new blog post"
      >
        <Plus size={24} />
        <span className="ml-2 hidden md:inline">Create Blog</span>
      </button>

      {/* Login and Signup Modals */}
      <LoginModal />
      <SignupModal />
      <CreateBlogModal />
    </div>
  );
};

export default BlogHome;

