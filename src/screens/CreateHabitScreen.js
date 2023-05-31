import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../features/habits/habitsActions";
import Error from "../components/Error";
import Input from "../components/Input";
import Button from "../components/Button";
import withSideNavLayout from "../hoc/withSidenavLayout";
import { H1 } from "../components/Typography";

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
      <H1>Create habit</H1>
      <form className="max-w-sm" onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
        <Input type="name" required {...register("name")} label="Name" />
        <Button primary type="submit" loading={loading}>
          Create habit
        </Button>
      </form>
    </>
  );
};

export default withSideNavLayout(CreateHabitScreen);
