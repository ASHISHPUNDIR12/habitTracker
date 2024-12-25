import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useHabit } from "./context/HabitContext";
import { useEffect } from "react";
const App = () => {
  const { user } = useAuthContext();
  const { habit, setHabit } = useHabit();

  // Fetch habit from the API
  useEffect(() => {
    const fetchHabits = async () => {
      const storedHabits = localStorage.getItem("habit");
      if (storedHabits) {
        setHabit(JSON.parse(storedHabits));
      }
      try {
        const response = await fetch("/api/habit");
        const data = await response.json();
        setHabit(data.habits);
        localStorage.setItem("habit", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch habit:", error);
      }
    };

    fetchHabits();
  }, []);

  // Save habit to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("habit", JSON.stringify(habit));
  }, [habit]);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signUp" element={user ? <Navigate to="/" /> : <SignUp />} />
    </Routes>
  );
};

export default App;
