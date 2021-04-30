import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/client";

const NotesContext = createContext({
  notes: {},
});

export const NotesContextProvider = (props) => {
  const [session, loading] = useSession();
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/note/find-user-notes`);
          const data = await response.json();
          console.log(data);
          setNotes(data);
        } catch (error) {
          console.log("error, unable to find notes");
          setNotes({ message: "error, unable to find notes" });
        }
      };
      fetchUserData();
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
};

export default NotesContext;
