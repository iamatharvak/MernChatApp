import { Stack, Fieldset, Input, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import React, { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";

const Login = () => {
  const [show, setShow] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <Stack>
      <Fieldset.Root>
        <Fieldset.Content>
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
        </Fieldset.Content>
      </Fieldset.Root>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        // onClick={submitHandler}
        // isLoading={loading}
      >
        Login
      </Button>
      <Button variant="solid" colorScheme="red" width="100%">
        Get Guest User Credentials
      </Button>
    </Stack>
  );
};

export default Login;
