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
import { Alert, AlertTitle } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import createUser from "../../lib/create-user";

function SignUp() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const successToast = useToast({
    title: "Account created.",
    description: "We've created your account for you, please log in.",
    status: "success",
    duration: 9000,
    isClosable: true,
    variant: "solid",
  });

  async function submitHandler(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    const enteredEmail = emailInputRef.current.value.toLowerCase();
    const enteredPassword = passwordInputRef.current.value;

    try {
      const result = await createUser(enteredEmail, enteredPassword);
      router.replace("/login");
      successToast();
      setIsButtonDisabled(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsButtonDisabled(false);
    }
  }

  return (
    <Box>
      <Heading as='h1' my={5} size='lg'>
        Create Test Account
      </Heading>
      <Text my={4}>
        You'll need an account in order to access all features for this Next.js
        / React.js App.
      </Text>
      <Text my={4}>
        You can use a test email e.g. 'test@test.com' unless it has already been
        taken.
      </Text>
      <Text my={4}>
        These test email accounts are stored in mongoDB, you will be able to
        delete these after if you wish to.
      </Text>
      <form onSubmit={submitHandler}>
        <FormControl my={4} isRequired>
          <FormLabel id='email'>Email</FormLabel>
          <Input
            type='email'
            placeholder='Please insert your email'
            required
            ref={emailInputRef}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel id='password'>Your Password</FormLabel>
          <Input
            type='password'
            placeholder='Please insert your password'
            required
            ref={passwordInputRef}
          />
        </FormControl>
        <Text my={4}>Password must contain a minimum of 7 characters.</Text>
        {errorMessage && (
          <Alert status='error' my={4}>
            <AlertTitle mr={2}>{errorMessage}</AlertTitle>
          </Alert>
        )}
        <FormControl>
          <Button
            colorScheme={"blue"}
            type='submit'
            disabled={isButtonDisabled}
          >
            Create account
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default SignUp;
