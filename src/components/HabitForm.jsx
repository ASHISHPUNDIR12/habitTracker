import React, { useState } from 'react';

const HabitForm = ({addHabit }) => {
const[habitName, sethabitName] = useState('');
const[habitDescription, sethabitDescription] = useState('');

 const handleSubmit = (e)=>{
    e.preventDefault();
    if(habitName.trim()){
        addHabit({name: habitName, description: habitDescription});
        sethabitDescription('')
        sethabitName('')
    }
 }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Habit</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor="habit-name" className="block text-gray-700">Habit Name</label>
          <input
            id="habit-name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
           value={habitName}
            onChange={(e)=>{sethabitName(e.target.value)}}
            placeholder="Enter habit name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="habit-description" className="block text-gray-700">Habit Description (optional)</label>
          <textarea
            id="habit-description"
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            value={habitDescription}
            onChange={(e)=>{sethabitDescription(e.target.value)}}
            placeholder="Enter habit description"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
