import React from "react";
import { useHabit } from "../context/HabitContext";

const useCreateHabit = () => {
  const [loading, setLoading] = React.useState(false);
  const { setHabit } = useHabit();
  const createHabit = async (name, description) => {
    setLoading(true);
    try {
      const response = await fetch("/api/habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      const savedHabit = await response.json();

      if (savedHabit.error) {
        throw new Error(savedHabit.error);
      }
      setHabit((prevHabits) => [...prevHabits, savedHabit.savedHabit]);
    } catch (error) {
      console.log(error.message);
      alert("Failed to create habit!");
    } finally {
      setLoading(false);
    }
  };
  return { loading, createHabit };
};

export default useCreateHabit;
