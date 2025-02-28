import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Ensure this is here
import AuthProvider from "./context/AuthProvider";
import App from "./App";
import "./index.css"; // ✅ Ensure Tailwind is imported
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* ✅ Router should be here */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
