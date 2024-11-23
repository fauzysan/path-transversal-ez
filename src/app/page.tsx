"use client"
import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleDownload = async () => {
    const response = await fetch(`/api/download?file=${fileName}`);
    const data = await response.text();
    setFileContent(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-dark">Download File dari server nih bro</h1>
      <p className="mb-6 text-lg">
        Coba unduh file dengan memasukkan namanya. Tapi hati-hati, ada celah di sini!
      </p>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          className="px-4 py-2 border rounded shadow"
          placeholder="contoh: notes.txt"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Download File
        </button>
        {fileContent && (
          <div className="mt-6 p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-bold">Isi File:</h2>
            <pre className="mt-2 whitespace-pre-wrap">{fileContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
