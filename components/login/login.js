import { useState, useRef } from "react";
import { signIn } from "next-auth/client";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Alert, AlertTitle } from "@chakra-ui/react";

function Login() {
  const [errorMessage, setErrorMessage] = useState();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const successToast = useToast({
    title: "Success!",
    description: "You have successfully logged in.",
    status: "success",
    duration: 9000,
    isClosable: true,
  });

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value.toLowerCase();
    const enteredPassword = passwordInputRef.current.value;
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      successToast();
      return;
    }

    if (result.error) {
      setErrorMessage(result.error || "Something went wrong!");
      return;
    }
  }

  return (
    <section>
      <Heading as='h1' my={5} size='lg'>
        Sign in to access all features
      </Heading>
      <form onSubmit={submitHandler}>
        <FormControl id='email' isRequired my={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            placeholder='Please enter your email'
            ref={emailInputRef}
          />
        </FormControl>
        <FormControl id='password' isRequired my={4}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder='Please enter your password'
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </FormControl>
        {errorMessage && (
          <Alert status='error' my={4}>
            <AlertTitle mr={2}>{errorMessage}</AlertTitle>
          </Alert>
        )}
        <Button colorScheme='blue' type='submit'>
          Login
        </Button>
      </form>
    </section>
  );
}

export default Login;
