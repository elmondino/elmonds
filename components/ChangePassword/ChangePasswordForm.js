import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Alert, AlertTitle } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function ProfileForm({ changePasswordHandler }) {
  const [errorMessage, setErrorMessage] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const successToast = useToast({
    title: "Success!",
    description: "You have successfully changed your password.",
    status: "success",
    duration: 5000,
    isClosable: true,
  });

  async function submitHandler(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const result = await changePasswordHandler({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });
      successToast();
      setIsButtonDisabled(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsButtonDisabled(false);
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
        <Button type='submit' colorScheme='blue' disabled={isButtonDisabled}>
          Change Password
        </Button>
      </FormControl>
    </form>
  );
}

export default ProfileForm;
