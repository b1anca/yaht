import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { selectHabitById } from "../features/habits/habitSelectors";
import { updateHabit } from "../features/habits/habitActions";
import { H1 } from "../components/Typography";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";
import { COLORS } from "../constants";

const EditHabitScreen = () => {
  const { id } = useParams();
  const { error } = useSelector((state) => state.habits);
  const habit = useSelector(selectHabitById(id));
  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...habit,
      color: habit.color || COLORS.slate700,
    },
  });
  const navigate = useNavigate();

  const submitForm = (data) =>
    dispatch(updateHabit({ id: habit.id, ...data }))
      .then(unwrapResult)
      .then(() => navigate("/habits"));

  return (
    <>
      <H1>Edit habit</H1>
      <form className="max-w-sm" onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
        <Input type="name" required {...register("name")} label="Name" />
        <Input
          type="description"
          required
          {...register("description")}
          label="Description"
        />
        <label
          htmlFor="color"
          className="block text-sm font-semibold leading-6 text-gray-700 mb-2"
        >
          Color
        </label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <HexColorPicker color={field.value} onChange={field.onChange} />
          )}
        />
        <Button primary type="submit" className="mt-6">
          Save habit
        </Button>
      </form>
    </>
  );
};

EditHabitScreen.displayName = "EditHabitScreen";

export default EditHabitScreen;
