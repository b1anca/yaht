import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../features/habits/habitsActions";
import Error from "../components/Error";
import Input from "../components/Input";
import Button from "../components/Button";

const CreateHabitScreen = () => {
  const { loading, error } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitForm = (data) => {
    dispatch(createHabit(data)).then(() => navigate("/habits"));
  };

  return (
    <main className="relative h-screen flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
        <form className="w-full max-w-sm" onSubmit={handleSubmit(submitForm)}>
          {error && <Error>{error}</Error>}
          <Input type="name" required {...register("name")} label="Name" />
          <Button primary type="submit" loading={loading}>
            Create habit
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreateHabitScreen;
