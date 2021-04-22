import { useRef } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
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
      <FormControl id='new-password' isRequired my={4}>
        <FormLabel>Old Password</FormLabel>
        <Input
          type='password'
          placeholder='Insert old password'
          ref={oldPasswordRef}
        />
      </FormControl>
      <FormControl my={4}>
        <Button type='submit' colorScheme='blue'>
          Change Password
        </Button>
      </FormControl>
    </form>
  );
}

export default ProfileForm;
