import { useEffect, useState } from "react";
import { uploadFile } from "../api/file.api";

export default function TopBar({
  onUploadSuccess,
  droppedFile,
  clearDroppedFile
}) {
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [oneTime, setOneTime] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 🔑 this is the IMPORTANT part
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // when file dropped into grid
  useEffect(() => {
    if (droppedFile) {
      setFile(droppedFile);
      clearDroppedFile();
    }
  }, [droppedFile, clearDroppedFile]);

  async function submit() {
    if (!file || !owner || !email) {
      setError("Folder, email and file are required");
      return;
    }

    if (uploading) return;

    setUploading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("owner", owner);
      fd.append("email", email);
      fd.append("file", file);
      fd.append("isOneTime", oneTime);

      await uploadFile(fd);

      // ✅ RESET FORM COMPLETELY
      setOwner("");
      setEmail("");
      setFile(null);
      setOneTime(false);

      // 🔥 RESET FILE INPUT so SAME file can be selected again
      setFileInputKey(Date.now());

      onUploadSuccess(owner);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="glass border-b border-white/10 p-4">
      <div className="flex items-center gap-3 flex-wrap">
        <input
          className="bg-black/40 px-3 py-2 rounded-lg text-sm"
          placeholder="Folder name"
          value={owner}
          onChange={e => setOwner(e.target.value)}
        />

        <input
          className="bg-black/40 px-3 py-2 rounded-lg text-sm"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          key={fileInputKey}
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="text-sm"
        />

        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={oneTime}
            onChange={e => setOneTime(e.target.checked)}
          />
          One-time
        </label>

        <button
          onClick={submit}
          disabled={uploading}
          className={`ml-auto px-4 py-2 rounded-lg text-sm ${
            uploading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {file && (
        <p className="text-xs text-slate-400 mt-2">
          Selected: {file.name}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
