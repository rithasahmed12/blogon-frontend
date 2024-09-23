import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Loader2, Upload, X } from "lucide-react";
import ModalWrapper from './ModalWrapper';
import { useSelector } from 'react-redux';
import { updateBlog } from '../api/api';
import toast from 'react-hot-toast';

interface EditBlogModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (blog: Blog) => void;
  blog: Blog | null;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  image?: string;
  userId?: string;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({ isOpen, closeModal, onSubmit, blog }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setImagePreview(blog.image || null);
    }
  }, [isOpen, blog]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blog) return;

    setIsLoading(true);

    const updatedBlog: Blog = {
      ...blog,
      title,
      content: content.length > 100 ? content.slice(0, 100) + '...' : content,
      image: imagePreview || undefined,
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', blog.author);
    formData.append('userId', blog.userId || '');

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    try {
      const response = await updateBlog(blog._id, formData);
      if (response.success) {
        toast.success('Blog updated successfully!');
        onSubmit(updatedBlog);
        closeModal();
      } else {
        toast.error(response.error || 'Failed to update blog. Please try again.');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} title="Edit Blog Post">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
            {imagePreview && (
              <div className="relative w-24 h-24">
                <img src={imagePreview} alt="Selected" className="w-full h-full object-cover rounded-md" />
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border rounded-md text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                <span>Updating...</span>
              </>
            ) : (
              'Update Blog Post'
            )}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default EditBlogModal;