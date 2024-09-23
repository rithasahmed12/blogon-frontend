import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import ModalWrapper from './ModalWrapper';
import { login } from '../api/api';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userSlice/userSlice';

interface LoginModalProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isLoginOpen, setIsLoginOpen }) => {
    
  const dispatch = useDispatch(); 

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await login(formData);
      console.log('Response:', response);
      
      if (response.success) {
        toast.success('Login successful!');
        setFormData({
            email: '',
            password: '',
          })
        setIsLoginOpen(false);

        dispatch(setUserInfo(response.data))
        
      } else {
        toast.error(response.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isLoginOpen} closeModal={() => setIsLoginOpen(false)} title="Login">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white h-10 px-4"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 border rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default LoginModal;