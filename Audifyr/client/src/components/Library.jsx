import { useState, useEffect } from "react";

export default function LibrarySection({ onSelectDocument }) {
  // Dummy library data for now
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // TODO: Fetch real documents from Firebase Storage/Firestore
    setDocuments([
      { id: 1, name: "Sample PDF 1" },
      { id: 2, name: "Project Notes" },
      { id: 3, name: "Research Paper" },
    ]);
  }, []);

  const handleSelect = (doc) => {
    if (onSelectDocument) onSelectDocument(doc);
  };

  const handleDelete = (docId) => {
    // TODO: Delete file from Firebase Storage & update state
    setDocuments(documents.filter((d) => d.id !== docId));
    alert("Document deleted (mock)");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Library</h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition"
            >
              <span
                className="cursor-pointer text-blue-700 hover:underline"
                onClick={() => handleSelect(doc)}
              >
                {doc.name}
              </span>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
