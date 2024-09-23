const Footer = () => {
  return (
     <footer className="bg-gray-100 dark:bg-gray-800 p-6 text-gray-700 dark:text-gray-400 mt-auto">
     <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
       <p className="mb-4 sm:mb-0">&copy; 2024 Blogon. All rights reserved.</p>
       <div className="space-x-4">
         <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
         <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
       </div>
     </div>
   </footer>
  )
}

export default Footer;