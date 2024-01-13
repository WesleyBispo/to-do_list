import React from 'react'
import { ToastContainer, Slide} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover={false}
              theme="colored"
              transition={Slide}/>

    <App />
  </React.StrictMode>,
)
