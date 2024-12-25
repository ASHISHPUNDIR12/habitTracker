import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { HabitsProvider } from "./context/HabitContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <HabitsProvider>
          <App />
        </HabitsProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
