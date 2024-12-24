import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HabitForm from './components/HabitForm';
import Container from './components/Container';
import AuthPage from './components/login/AuthPage';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Store user data

  // Check if the user is authenticated when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  // Fetch user data from the backend
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
      setHabits(userData.habits);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
    if (user) {
      updateUserHabits(habit);
    }
  };

  const deleteHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index));
  };

  const editHabit = (index) => {
    setEditingIndex(index);
  };

  const saveHabit = (index, updatedHabit) => {
    const updatedHabits = habits.map((habit, i) =>
      i === index ? updatedHabit : habit
    );
    setHabits(updatedHabits);
    setEditingIndex(null);
  };

  const updateUserHabits = async (habit) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ habit }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user habits');
      }

      const updatedUser = await response.json();
      setHabits(updatedUser.habits);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuth = (token) => {
    localStorage.setItem('token', token);
    fetchUserData(token); // Fetch user data after successful login/signup
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Header username={user?.username} />
          <HabitForm addHabit={addHabit} />
          <Container
            habits={habits}
            deleteHabit={deleteHabit}
            editHabit={editHabit}
            saveHabit={saveHabit}
            editingIndex={editingIndex}
          />
        </>
      ) : (
        <AuthPage onAuth={handleAuth} />
      )}
    </div>
  );
};

export default App;
