import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/client";

const NotesContext = createContext();

export function NotesContextProvider(props) {
  const [session, loading] = useSession();
  const [notes, setNotes] = useState(null);

  useEffect(async () => {
    if (session) {
      const response = await fetch(`/api/note/find-user-notes`);
      const data = await response.json();
      setNotes(data);
    }
  }, []);

  const context = {
    notes,
    setNotes,
  };

  return (
    <NotesContext.Provider value={context}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default NotesContext;
