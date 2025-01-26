import { Stack, Fieldset, Input, Button } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

import React, { useState } from "react";

const Login = () => {
  const [show, setShow] = useState("");

  return (
    <Stack>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field label="Email address">
            <Input name="email" type="email" />
          </Field>
          <Field label="Password">
            <Input name="password" type="password" />
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
