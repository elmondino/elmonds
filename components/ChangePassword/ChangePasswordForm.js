import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Alert, AlertTitle } from "@chakra-ui/react";

function ProfileForm({ changePasswordHandler }) {
  const [errorMessage, setErrorMessage] = useState();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const result = await changePasswordHandler({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <FormControl id='new-password' isRequired my={4}>
        <FormLabel>New Password</FormLabel>
        <Input
          type='password'
          placeholder='Insert new password'
          ref={newPasswordRef}
        />
      </FormControl>
      <FormControl id='old-password' isRequired my={4}>
        <FormLabel>Old Password</FormLabel>
        <Input
          type='password'
          placeholder='Insert old password'
          ref={oldPasswordRef}
        />
      </FormControl>
      {errorMessage && (
        <Alert status='error' my={4}>
          <AlertTitle mr={2}>{errorMessage}</AlertTitle>
        </Alert>
      )}
      <FormControl my={4}>
        <Button type='submit' colorScheme='blue'>
          Change Password
        </Button>
      </FormControl>
    </form>
  );
}

export default ProfileForm;
