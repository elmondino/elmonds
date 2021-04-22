import { getSession, signOut } from "next-auth/client";
import { useRef } from "react";
import { useRouter } from "next/router";
import {
  FormLabel,
  Heading,
  Input,
  Text,
  FormControl,
  Button,
  Box,
} from "@chakra-ui/react";

export default function DeleteUser({ session }) {
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

    const enteredOldPassword = oldPasswordRef.current.value;

    // optional: Add validation

    try {
      const result = await handleDeleteUser({
        oldPassword: enteredOldPassword,
      });

      console.log(result);
      router.replace("/login");
      signOut();
    } catch (error) {
      console.log("here?");
      console.log(error);
    }
  }

  return (
    <>
      <Heading as='h1' size='lg' my={6}>
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

        <Button type='submit' colorScheme='blue'>
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
