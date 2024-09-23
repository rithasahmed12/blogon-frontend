import axios, { AxiosResponse, AxiosError } from 'axios';
import Api from './axiosConfig';

interface SignupBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    userId: string | undefined;
    _id?: string;
    name?: string;
    email?: string;
    title?:string;
    content?:string;
    author?:string;
    image?:string;
    createdAt?:Date;
  };
  error?: string;
  status?: number;
}


interface ApiErrorResponse {
  error?: string;
  message?: string;
}

const handleApiResponse = (response: AxiosResponse): AuthResponse => {
  return {
    success: true,
    data: response.data,
    status: response.status
  };
};

const handleApiError = (error: unknown): AuthResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    return {
      success: false,
      error: axiosError.response?.data?.error || axiosError.response?.data?.message || axiosError.message,
      status: axiosError.response?.status
    };
  } else {
    console.error('Unexpected error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred'
    };
  }
};

export const signup = async (body: SignupBody): Promise<AuthResponse> => {
  return Api.post('signup', body)
    .then(handleApiResponse)
    .catch(handleApiError);
};

export const login = async (body: LoginBody): Promise<AuthResponse> => {
  return Api.post('login', body)
    .then(handleApiResponse)
    .catch(handleApiError);
};

export const getBlog = async (id:string|undefined): Promise<AuthResponse> => {
    return Api.get(`post/${id}`)
      .then(handleApiResponse)
      .catch(handleApiError);
  };


export const getBlogs = async (): Promise<AuthResponse> => {
    return Api.get('post')
      .then(handleApiResponse)
      .catch(handleApiError);
  };


export const addBlog = async (blogData: FormData): Promise<AuthResponse> => {
    return Api.post('post', blogData,{headers:{'Content-Type': 'multipart/form-data'}})
      .then(handleApiResponse)
      .catch(handleApiError);
  };

export const updateBlog = async (id:string,blogData: FormData): Promise<AuthResponse> => {
    return Api.put(`post/${id}`, blogData,{headers:{'Content-Type': 'multipart/form-data'}})
      .then(handleApiResponse)
      .catch(handleApiError);
  };

export const deleteBlog = async (id: string): Promise<AuthResponse> => {
    return Api.delete(`post/${id}`)
      .then(handleApiResponse)
      .catch(handleApiError);
  };