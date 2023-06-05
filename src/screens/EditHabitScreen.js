import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { selectHabitById } from "../features/habits/habitSelectors";
import { updateHabit } from "../features/habits/habitActions";
import { H1 } from "../components/Typography";
import Input from "../components/Input";
import Button from "../components/Button";
import Error from "../components/Error";

const EditHabitScreen = () => {
  const { id } = useParams();
  const { error } = useSelector((state) => state.habits);
  const habit = useSelector(selectHabitById(id));
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
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
        <Input
          type="name"
          required
          {...register("name")}
          label="Name"
          defaultValue={habit.name}
        />
        {/* TODO: color selector */}
        <Button primary type="submit">
          Save habit
        </Button>
      </form>
    </>
  );
};

EditHabitScreen.displayName = "EditHabitScreen";

export default EditHabitScreen;
