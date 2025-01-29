import { Stack, Input, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import React, { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <Field
          label="Name"
          invalid={!!errors.name}
          errorText={errors.name?.message}
          isRequired
        >
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
          />
        </Field>

        <Field
          label="Email address"
          invalid={!!errors.email}
          errorText={errors.email?.message}
          isRequired
        >
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Enter your email"
          />
        </Field>

        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <PasswordInput
            {...register("password", { required: "Password is required" })}
            visible={showPassword}
            onVisibleChange={setShowPassword}
          />
        </Field>

        <Field label="Confirm Password">
          <PasswordInput
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            visible={showConfirmPassword}
            onVisibleChange={setShowConfirmPassword}
          />
        </Field>

        <Field label="Upload a Picture">
          <Input {...register("pic")} type="file" />
        </Field>

        <Button
          colorScheme="blue"
          width="100%"
          mt={4}
          type="submit"
          isLoading={loading}
        >
          Signup
        </Button>
        <Button variant="solid" colorScheme="red" width="100%">
          Get Guest User Credentials
        </Button>
      </Stack>
    </form>
  );
};

export default Signup;
