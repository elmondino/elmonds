//Component currently not used
import { useRef } from "react";
import { signIn } from "next-auth/client";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function Login() {
  const errorToast = useToast({
    title: "Unable to log in",
    description: "Please enter valid credentials or create an account.",
    status: "error",
    duration: 9000,
    isClosable: true,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result.error) {
      errorToast();
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
        <div>
          <Button colorScheme='blue' type='submit'>
            Login
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Login;
