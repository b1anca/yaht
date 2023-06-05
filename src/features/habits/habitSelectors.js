export const selectHabitById = (id) => (state) => {
  return state.habits.habits.find((habit) => habit.id === parseInt(id));
};
