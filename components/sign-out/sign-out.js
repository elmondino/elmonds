import { signOut } from 'next-auth/client'

export default function SignOut() {
    function logOutHandler() {
        signOut();
    }

    return ( <button onClick={logOutHandler}>log out</button> )
}
