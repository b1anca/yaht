import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../features/habits/habitActions";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";
import { Heading } from "../components/Typography";

const CreateHabitScreen = () => {
  const { loading, error } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitForm = (data) => {
    dispatch(createHabit(data)).then(() => navigate("/habits"));
  };

  return (
    <>
      <Heading level="h1">Create habit</Heading>
      <form className="max-w-sm" onSubmit={handleSubmit(submitForm)}>
        {error && <Alert>{error}</Alert>}
        <Input type="name" required {...register("name")} label="Name" />
        <Button primary type="submit" loading={loading}>
          Create habit
        </Button>
      </form>
    </>
  );
};

export default CreateHabitScreen;
