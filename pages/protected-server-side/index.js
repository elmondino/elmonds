import { getSession } from 'next-auth/client';

function ProtectedServerSide() {
  return <p>user has logged in</p>
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProtectedServerSide;
