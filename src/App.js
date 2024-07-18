import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import ThemeProvider from "./contexts/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { MovieProvider } from "./contexts/MovieContext";
import "./GlobalCss.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MovieProvider>
            <Router />
          </MovieProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
