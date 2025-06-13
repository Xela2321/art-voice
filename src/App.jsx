import React, { useState } from "react";
import { Mic } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [recordings, setRecordings] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tab, setTab] = useState("archive");

  const handleUpload = (e) => {
    setUploading(true);
    setSuccess(false);

    const files = Array.from(e.target.files);
    const newRecordings = files.map((file) => ({
      file,
      id: URL.createObjectURL(file),
    }));

    setTimeout(() => {
      setRecordings((prev) => [...prev, ...newRecordings]);
      setUploading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Banner */}
      <div className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-4 px-6 shadow">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-semibold">Preserving Voices in the Age of AI</h2>
          <p className="text-sm opacity-90">An archive of public thought on traditional art's legacy and future</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${tab === "archive" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setTab("archive")}
        >
          Archive
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${tab === "info" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setTab("info")}
        >
          Info
        </button>
      </div>

      {tab === "archive" && (
        <div className="p-6 max-w-6xl mx-auto">
          <motion.h1
            className="text-5xl font-extrabold mb-8 text-center text-gray-800"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Archive of Artistic Voices
          </motion.h1>

          <p className="text-center max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            A digital archive preserving opinions on the decline of traditional art and the controversies around AI generative art.
          </p>

          <section className="mb-10 text-center">
            <label className="block mb-3 text-lg font-medium text-gray-700">Upload a Voice Recording</label>
            <div className="relative inline-block">
              <input
                type="file"
                accept="audio/*"
                multiple
                onChange={handleUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition"
              >
                Choose File
              </button>
            </div>
            {uploading && (
              <p className="mt-4 text-blue-600 font-medium">Uploading...</p>
            )}
            {success && (
              <p className="mt-4 text-green-600 font-medium">Upload successful!</p>
            )}
            <p className="text-sm text-gray-500 mt-2">Supported formats: MP3, WAV.</p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recordings.map((rec) => (
              <div key={rec.id} className="rounded-2xl shadow-lg border border-gray-200 bg-gray-50 p-6">
                <audio controls className="w-full rounded mb-4">
                  <source src={rec.id} type="audio/mpeg" />
                </audio>
                <div className="flex items-center gap-2 text-gray-800">
                  <Mic className="w-5 h-5" />
                  <span className="font-semibold text-lg">Uploaded Recording</span>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {tab === "info" && (
        <div className="p-6 max-w-4xl mx-auto text-gray-700">
          <h2 className="text-3xl font-bold mb-4">About This Project</h2>
          <p className="mb-4">
            This platform is designed to document and preserve public voices reflecting on the changing landscape of the art world.
            It explores the emotional, cultural, and professional impacts of artificial intelligence on traditional artistic values.
          </p>
          <p className="mb-4">
            Submissions are collected and displayed to provide a human archive of this transitional period—giving artists, collectors,
            critics, and everyday individuals a voice in the debate.
          </p>
          <p>
            If you have questions or would like to contribute in other ways, please reach out to the project team. This is a living,
            growing archive open to global participation.
          </p>
        </div>
      )}
    </main>
  );
}
