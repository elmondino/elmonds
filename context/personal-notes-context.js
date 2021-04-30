import { createContext, useState } from "react";
const NotesContext = createContext({
  notes: {},
});

export const NotesContextProvider = (props) => {
  const [notes, setNotes] = useState(null);
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
