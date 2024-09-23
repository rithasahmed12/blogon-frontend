import { Navigate, Route, Routes } from 'react-router-dom'
// import BlogHome from './components/BlogHome'
import React,{Suspense} from 'react'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
const BlogHome = React.lazy(()=> import('./components/BlogHome'))
const SingleBlogPost = React.lazy(() => import('./components/SingleBlogPost'))

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userInfo } = useSelector((state: any) => state.userInfo);

  if (!userInfo) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {

  return (
    <>
    <Suspense fallback={<Loader/>}>
    <Routes>
      <Route path="/" element={<BlogHome/>} />
      <Route path="/blog/:id" element={ <ProtectedRoute><SingleBlogPost /></ProtectedRoute>} />
      
    </Routes>
    </Suspense>
    </>
  )
}

export default App
