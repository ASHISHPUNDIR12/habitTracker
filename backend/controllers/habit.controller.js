import Habit from "../model/habit.model.js";

export const getHabit = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.status(200).json({ success: true, habits });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch habits" });
  }
};

export const createHabit = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Habit name is required" });
    }
    const newHabit = await Habit.create({
      user: req.user._id,
      name,
      description,
    });
    const savedHabit = await newHabit.save();
    res.status(201).json({ success: true, savedHabit });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: "Failed to create habit" });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedHabit = await Habit.findByIdAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.status(200).json({ success: true, updatedHabit });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update habit" });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deletedHabit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.status(200).json({ success: true, deletedHabit });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete habit" });
  }
};
