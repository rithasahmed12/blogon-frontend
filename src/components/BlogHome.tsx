import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Loader from "./Loader";
import AddBlogModal from "./AddBlogModal";
import Footer from "./Footer";
import { deleteBlog, getBlogs } from "../api/api";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import EditBlogModal from "./EditBlogModal";
import ConfirmDeleteModal from "./confirmDeleteModal";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  image?: string;
  userId?: string;
}

const BlogHome = () => {
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

  const { userInfo } = useSelector((state: any) => state.userInfo);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [blogs]);

  useEffect(() => {
    const userOwnBlogs = blogs.filter((blog) => blog.userId === userInfo?._id);
    setUserBlogs(userOwnBlogs);
  }, [blogs, userInfo]);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs();
      console.log("response:", response);

      if (response.success && Array.isArray(response.data)) {
        setBlogs(response.data as Blog[]);
      } else {
        toast.error("Failed to get posts!");
      }
    } catch (error) {
      toast.error(
        "An unexpected error occurred. Please refresh or contact us."
      );
    }
  };

  const handleAddBlog = (blog: Blog) => {
    setBlogs((prevBlogs) => [blog, ...prevBlogs]);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleUpdateBlog = (updatedBlog: Blog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
  };

  const handleDeleteBlog = (blog: Blog) => {
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (blogToDelete) {
      try {
        const response = await deleteBlog(blogToDelete._id);
        if (response.success) {
          setBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== blogToDelete._id)
          );
          toast.success("Blog post deleted successfully!");
        } else {
          toast.error("Failed to delete the blog post.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the blog post.");
      } finally {
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
      }
    }
  };

  const handleReadMore = (blog: Blog) => {
    if (userInfo) {
      navigate(`/blog/${blog._id}`);
    } else {
      toast.error("Please log in or sign up to read the full blog post.");
      setIsLoginOpen(true);
    }
  };

  const handleAddBlogClick = () => {
    if (userInfo) {
      setIsModalOpen(true);
    } else {
      toast.error("Please log in or sign up to create a new blog post.");
      setIsLoginOpen(true);
    }
  };

  const truncateContent = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
          <Navbar
            onLoginClick={() => setIsLoginOpen(true)}
            onSignupClick={() => setIsSignupOpen(true)}
          />

          <main className="flex-grow pt-8 pb-16 lg:pt-16 lg:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row">
                <section className="lg:w-3/4 mb-8 lg:mb-0">
                  <h1 className="text-3xl font-extrabold mb-6 dark:text-white">
                    Latest Insights
                  </h1>
                  <div className="space-y-8">
                    {blogs.map((blog) => (
                      <article
                        key={blog._id}
                        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
                      >
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
                          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">
                            {blog.title}
                          </a>
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                          <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {truncateContent(blog.content, 17)}
                          </p>
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <time>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </time>{" "}
                            • <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <a
                              onClick={() => handleReadMore(blog)}
                              className="inline-block bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                              Read More
                            </a>
                            {userInfo && userInfo._id === blog.userId && (
                              <>
                                <button
                                  onClick={() => handleEditBlog(blog)}
                                  className="p-2 text-blue-600 hover:text-blue-800 transition duration-300"
                                >
                                  <Edit size={20} />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(blog)}
                                  className="p-2 text-red-600 hover:text-red-800 transition duration-300"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="lg:w-1/4 lg:pl-8">
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    My Blogs
                  </h2>
                  <div className="space-y-6">
                    {userBlogs && userBlogs.length > 0 ? (
                      userBlogs.map((blog) => (
                        <div
                          key={blog._id}
                          className="flex items-start space-x-4"
                        >
                          {blog.image && (
                            <img
                              className="w-20 h-20 object-cover rounded-lg"
                              src={blog.image}
                              alt={blog.title}
                            />
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              <a
                                onClick={() => handleReadMore(blog)}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 cursor-pointer"
                              >
                                {blog.title}
                              </a>
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}{" "}
                              • {blog.author}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        You have no blogs. Please create your blog or log in to
                        see your blogs.
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </main>

          <Footer />

          <button
            onClick={handleAddBlogClick}
            className="fixed bottom-12 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
            aria-label="Create new blog post"
          >
            <Plus size={24} />
            <span className="ml-2 hidden md:inline">Create Blog</span>
          </button>

          <LoginModal
            isLoginOpen={isLoginOpen}
            setIsLoginOpen={setIsLoginOpen}
          />
          <SignupModal
            isSignupOpen={isSignupOpen}
            setIsSignupOpen={setIsSignupOpen}
          />
          <AddBlogModal
            isOpen={isModalOpen}
            closeModal={() => {
              setIsModalOpen(false);
            }}
            onSubmit={handleAddBlog}
          />

          <EditBlogModal
            isOpen={isEditModalOpen}
            closeModal={() => {
              setIsEditModalOpen(false);
              setEditingBlog(null);
            }}
            onSubmit={handleUpdateBlog}
            blog={editingBlog}
          />

          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            closeModal={() => {
              setIsDeleteModalOpen(false);
              setBlogToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </>
  );
};

export default BlogHome;
