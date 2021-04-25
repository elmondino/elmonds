import { createContext, useState, useEffect } from "react";

const NotesContext = createContext();

export function NotesContextProvider(props) {
  const [notes, setNotes] = useState(null);

  useEffect(async () => {
    const response = await fetch(`/api/note/find-user-notes`);
    const data = await response.json();
    setNotes(data);
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
