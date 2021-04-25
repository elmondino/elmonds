import { Heading, Text } from "@chakra-ui/layout";
import ChangePassword from "./ChangePasswordForm";

function UserProfile() {
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <>
      <Heading as='h1' size='lg' my={5}>
        Change your password
      </Heading>
      <Text my={4}>
        In order to update your password enter your old password and new
        password.
      </Text>
      <ChangePassword onChangePassword={changePasswordHandler} />
    </>
  );
}

export default UserProfile;
