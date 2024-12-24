import React, { useState } from 'react';


const Container = ({ habits, deleteHabit, editHabit, saveHabit, editingIndex }) => {
    const [tempHabit, setTempHabit] = useState({ name: '', description: '' });
  
    const handleSave = (index) => {
      saveHabit(index, tempHabit); // Pass the updated habit to saveHabit
    };
  
    return (
      <div className="bg-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {habits.length > 0 ? (
            habits.map((habit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                {editingIndex === index ? ( // Check if the habit is being edited
                  <>
                    <input
                      type="text"
                      value={tempHabit.name}
                      onChange={(e) =>
                        setTempHabit({ ...tempHabit, name: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded mb-2"
                    />
                    <textarea
                      value={tempHabit.description}
                      onChange={(e) =>
                        setTempHabit({ ...tempHabit, description: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                    <button
                      onClick={() => handleSave(index)}
                      className="mt-4 text-green-500 hover:text-green-700"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {habit.name}
                    </h2>
                    <p className="text-gray-600">{habit.description}</p>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => {
                          editHabit(index); // Enable editing mode
                          setTempHabit(habit); // Initialize tempHabit with current data
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteHabit(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No habits added yet!</p>
          )}
        </div>
      </div>
    );
  };

export default Container;
