import { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

// import classes from './auth-form.module.css';

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function SignUp() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
      router.replace("/login");
    } catch (error) {
      console.log("here?");
      console.log(error);
    }
  }

  return (
    <Box>
      <Heading as='h1' my={6} size='lg'>
        Create yourself a dummy account
      </Heading>
      <Text my={4}>
        You'll need an account in order to access all features for this
        Next.js/React.js App.
      </Text>
      <form onSubmit={submitHandler}>
        <FormControl my={4} isRequired>
          <FormLabel id='email'>Your Email</FormLabel>
          <Input type='email' required ref={emailInputRef} />
        </FormControl>
        <FormControl my={4} isRequired>
          <FormLabel id='password'>Your Password</FormLabel>
          <Input type='password' required ref={passwordInputRef} />
        </FormControl>
        <FormControl>
          <Button type='submit'>Create Account</Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default SignUp;
