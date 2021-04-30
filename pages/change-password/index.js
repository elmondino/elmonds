import { getSession } from "next-auth/client";
import ChangePassword from "../../components/change-password/change-password.js";

function ChangePasswordPage() {
  return <ChangePassword />;
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

export default ChangePasswordPage;
