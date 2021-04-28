import { Heading, Text } from "@chakra-ui/layout";
import ChangePasswordForm from "./ChangePasswordForm";

function ChangePassword() {
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
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

  return (
    <>
      <Heading as='h1' size='lg' my={5}>
        Change your password
      </Heading>
      <Text my={4}>
        In order to update your password enter your old password and new
        password.
      </Text>
      <ChangePasswordForm changePasswordHandler={changePasswordHandler} />
    </>
  );
}

export default ChangePassword;
