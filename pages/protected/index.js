import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/client';

export default function ProtectedPage() {
  const [session, loading] = useSession();
  if(loading) {
    return <p>Loading......</p>
  }
  if(session) {
    return <p> we have session?</p>
  }
  return <p>hey</p>
}

