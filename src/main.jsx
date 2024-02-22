import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { AuthContextProvider } from './Context/AuthContext.jsx';
import { AdminAuthProvider } from './Context/AdminAuthContext.jsx';
import { CertificateProvider } from './Context/CertificateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminAuthProvider>
        <CertificateProvider>
          <App />
        </CertificateProvider>
      </AdminAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
