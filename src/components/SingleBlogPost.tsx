import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlog } from '../api/api';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from './Loader';


interface Blog {
  _id?: string;
  title: string;
  content: string;
  createdAt: string|Date;
  author: string;
  image?: string;
  userId?: string;
}

const SingleBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null |undefined>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const response = await getBlog(id);
      if (response.success && response.data) {
    
        const blogData: Blog = {
          _id: response.data._id,
          title: response.data.title || '',
          content: response.data.content || '',
          createdAt: response.data.createdAt || new Date().toISOString(),
          author: response.data.author || '',
          image: response.data.image,
          userId: response.data.userId,
        };
        setBlog(blogData);
      } else {
        toast.error('Failed to fetch the blog post.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the blog post.');
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar/>

      <main className="flex-grow pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    {blog ? (<>
       {blog  && blog.image && (
        <div className="mb-6">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        {blog.title}
      </h1>
      <div className="mb-8 text-gray-500 dark:text-gray-400">
        <time>
          {new Date(blog.createdAt).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          )}
        </time>{' '}
        • <span>{blog.author}</span>
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert text-white">
        {blog.content}
      </div>
      </>
    ) : ( <p className="text-gray-500 dark:text-gray-400">
      Could not get the post try again later or contact us.
    </p>) }
         
      
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleBlogPost;