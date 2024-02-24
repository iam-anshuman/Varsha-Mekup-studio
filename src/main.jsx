import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthContextProvider } from './Context/AuthContext.jsx';
import { AdminAuthProvider } from './Context/AdminAuthContext.jsx';
import { CertificateContextProvider } from './Context/CertificateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminAuthProvider>
        <CertificateContextProvider>
          <App />
        </CertificateContextProvider>
      </AdminAuthProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
