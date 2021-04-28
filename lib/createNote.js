export default async function createNote(note) {
  const response = await fetch("/api/note/create-note", {
    method: "POST",
    body: JSON.stringify({ note }),
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
