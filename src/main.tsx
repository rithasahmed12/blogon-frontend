import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store/store.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <StrictMode>
  <BrowserRouter>
  <Toaster />
    <App />
    </BrowserRouter>
  </StrictMode>
  </Provider>
)
