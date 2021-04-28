export default async function deleteNote(noteId) {
  const response = await fetch("/api/note/delete-note", {
    method: "DELETE",
    body: JSON.stringify({ noteId }),
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
