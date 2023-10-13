import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { selectHabitById } from "../features/habits/habitSelectors";
import { updateHabit } from "../features/habits/habitActions";
import { Heading } from "../components/Typography";
import Input, { Label } from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { DEFAULT_HABIT_COLOR } from "../constants";

const EditHabitScreen = () => {
  const { id } = useParams();
  const { loading, error } = useSelector((state) => state.habits);
  const habit = useSelector(selectHabitById(id));
  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...habit,
      color: habit.color || DEFAULT_HABIT_COLOR,
    },
  });
  const navigate = useNavigate();

  const submitForm = (data) =>
    dispatch(updateHabit({ id: habit.id, ...data }))
      .then(unwrapResult)
      .then(() => navigate("/habits"));

  return (
    <div>
      <Heading level="h2" className="text-center">
        Edit habit
      </Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <Alert>{error}</Alert>}
        <Input type="name" required {...register("name")} label="Name" />
        <Input
          type="description"
          {...register("description")}
          label="Description"
        />
        <Label type="color" text="Color" />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <HexColorPicker color={field.value} onChange={field.onChange} />
          )}
        />
        <div className="mt-6 flex flex-col items-center">
          <Button
            primary
            type="submit"
            className="max-w-md w-full mt-6"
            loading={loading}
          >
            Save habit
          </Button>
        </div>
      </form>
    </div>
  );
};

EditHabitScreen.displayName = "EditHabitScreen";

export default EditHabitScreen;
