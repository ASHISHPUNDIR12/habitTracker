import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HabitsContainer = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHabits(response.data.habits);
      }
    };

    fetchHabits();
  }, []);

  const addHabit = async (habit) => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.post(
        '/api/habits',
        { habit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits(response.data.habits);
    }
  };

  return (
    <div>
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>{habit.name}: {habit.description}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.elements.name.value;
          const description = e.target.elements.description.value;
          addHabit({ name, description });
          e.target.reset();
        }}
      >
        <input name="name" placeholder="Habit Name" required />
        <input name="description" placeholder="Description" required />
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default HabitsContainer;
