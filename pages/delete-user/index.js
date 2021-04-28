import { getSession, signOut } from "next-auth/client";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  FormLabel,
  Heading,
  Input,
  Text,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { Alert, AlertTitle } from "@chakra-ui/react";

export default function DeleteUserPage({ session }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();
  const oldPasswordRef = useRef();

  async function handleDeleteUser(passwordData) {
    const response = await fetch("/api/user/delete-user", {
      method: "DELETE",
      body: JSON.stringify(passwordData),
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

  async function submitHandler(event) {
    event.preventDefault();
    setIsDisabled(true);
    const enteredOldPassword = oldPasswordRef.current.value;

    try {
      const result = await handleDeleteUser({
        oldPassword: enteredOldPassword,
      });
      signOut();
      router.replace("/login");
      setIsDisabled(false);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong!");
      setIsDisabled(false);
    }
  }

  return (
    <>
      <Heading as='h1' size='lg' my={5}>
        Delete your account
      </Heading>
      <Text my={4}>
        In order to delete your account please insert your old password and
        click 'Delete user'.
      </Text>
      <form onSubmit={submitHandler}>
        <FormControl id='old-password' my={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            placeholder='Insert password'
            ref={oldPasswordRef}
          />
        </FormControl>
        {errorMessage && (
          <Alert status='error' my={4}>
            <AlertTitle mr={2}>{errorMessage}</AlertTitle>
          </Alert>
        )}
        <Button type='submit' colorScheme='blue' disabled={isDisabled}>
          Delete user
        </Button>
      </form>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
