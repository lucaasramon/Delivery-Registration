import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './contexts/authContext';
import { LoadScript } from "@react-google-maps/api";
require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}
            libraries={["places"]}
            onLoad={(e)=> console.log('ddd')}
          >
            
      <App />
    </LoadScript>
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
