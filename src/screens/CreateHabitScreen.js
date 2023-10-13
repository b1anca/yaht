import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HexColorPicker } from "react-colorful";
import { createHabit } from "../features/habits/habitActions";
import Alert from "../components/Alert";
import Input, { Label } from "../components/Input";
import Button from "../components/Button";
import { Heading } from "../components/Typography";
import { DEFAULT_HABIT_COLOR } from "../constants";

const CreateHabitScreen = () => {
  const { loading, error } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const { register, handleSubmit, control } = useForm({
    defaultValues: { color: DEFAULT_HABIT_COLOR },
  });
  const navigate = useNavigate();

  const submitForm = (data) => {
    dispatch(createHabit(data)).then(() => navigate("/habits"));
  };

  return (
    <div>
      <Heading level="h2" className="text-center">
        Create habit
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
            loading={loading}
            className="max-w-md w-full mt-6"
          >
            Create habit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateHabitScreen;
