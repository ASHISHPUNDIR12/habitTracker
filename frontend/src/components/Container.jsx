import React, { useEffect, useState } from "react";
import { useHabit } from "../context/HabitContext";

const Container = () => {
  const { habit, setHabit } = useHabit();
  const [editingIndex, setEditingIndex] = useState(null); // Track habit being edited
  const [tempHabit, setTempHabit] = useState({ name: "", description: "" }); // Temp data for editing

  // Delete a habit
  const deleteHabit = async (index) => {
    const habitToDelete = habit[index];
    try {
      await fetch(`/api/habit/${habitToDelete._id}`, { method: "DELETE" });
      const updatedHabits = habit.filter((_, i) => i !== index);
      setHabit(updatedHabits);
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  // Enable edit mode
  const editHabit = (index) => {
    setEditingIndex(index);
  };

  // Save edited habit
  const handleSave = async (index) => {
    const updatedHabit = tempHabit;

    try {
      const response = await fetch(`/api/habit/${habit[index]._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHabit),
      });
      const savedHabit = await response.json();
      const updatedHabits = [...habit];
      updatedHabits[index] = savedHabit.updatedHabit;
      setHabit(updatedHabits);
      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {habit?.length > 0 ? (
          habit?.map((habit, index) => (
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
                      setTempHabit({
                        ...tempHabit,
                        description: e.target.value,
                      })
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
          <p className="text-gray-600">No habit added yet!</p>
        )}
      </div>
    </div>
  );
};

export default Container;
