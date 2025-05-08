export function NotesList({ notes, onEdit, onDelete }) {
  return (
    <ul className="mt-4 space-y-2">
      {notes.map((note, index) => (
        <li key={index} className="bg-white p-4 rounded-md shadow flex justify-between items-start">
          <span className="text-gray-800 flex-1">📌 {note}</span>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(index)} className="text-yellow-500 hover:underline">✏️ Edit</button>
            <button onClick={() => onDelete(index)} className="text-red-500 hover:underline">🗑️ Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}