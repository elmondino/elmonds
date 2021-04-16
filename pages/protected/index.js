import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/client';

export default function ProtectedPage() {
  const [session, loading] = useSession();
  console.log(session)
  console.log(loading)
  if(loading) {
    return <p>Loading......</p>
  }
  if(session) {
    return <p> we have session?</p>
  }
  return <p>hey no session yet</p>
}

