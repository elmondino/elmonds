export default async function findUserNote() {
  const response = await fetch(`/api/note/find-user-notes`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}
