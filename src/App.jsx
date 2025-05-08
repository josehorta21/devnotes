import { useState, useEffect } from 'react';
import { AddNoteButton } from './components/AddNoteButton';
import { NotesList } from './components/NotesList';
import { LoginForm } from './components/LoginForm';
import jsPDF from 'jspdf';

function App() {
  const [email, setEmail] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (email) {
      const saved = localStorage.getItem(email);
      setNotes(saved ? JSON.parse(saved) : []);
    }
  }, [email]);

  useEffect(() => {
    if (email) {
      localStorage.setItem(email, JSON.stringify(notes));
    }
  }, [notes, email]);

  const handleAddNote = () => {
    const newNote = prompt("Write your note:");
    if (newNote) {
      setNotes(prev => [...prev, newNote]);
    }
  };

  const handleEditNote = (index) => {
    const updatedNote = prompt("Edit your note:", notes[index]);
    if (updatedNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[index] = updatedNote;
      setNotes(updatedNotes);
    }
  };

  const handleDeleteNote = (index) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("My Notes - DevNotes", 20, 20);
    notes.forEach((note, i) => {
      doc.text(`• ${note}`, 20, 30 + i * 10);
    });
    doc.save("my-notes.pdf");
  };

  if (!email) {
    return <LoginForm onLogin={setEmail} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">📝 DevNotes</h1>
        <p className="text-sm text-center text-gray-500 mb-4">Logged in as: {email}</p>
        <div className="flex gap-4 mb-4">
          <AddNoteButton onClick={handleAddNote} />
          <button
            onClick={handleExportPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            📄 Export PDF
          </button>
        </div>
        <NotesList notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
      </div>
    </div>
  );
}

export default App;