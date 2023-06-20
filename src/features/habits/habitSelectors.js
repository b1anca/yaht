export const selectHabitById = (id) => (state) => {
  // TODO: rename to data
  return state.habits.habits.find((habit) => habit.id === parseInt(id));
};
