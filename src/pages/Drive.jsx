import { useEffect, useState } from "react";
import { fetchFolders, fetchFiles } from "../api/file.api";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import FileGrid from "../components/FileGrid";
import PreviewModal from "../components/PreviewModal";

export default function Drive() {
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);

  const [previewFile, setPreviewFile] = useState(null); // ADD

  useEffect(() => {
    loadFolders();
  }, []);

  async function loadFolders() {
    try {
      const res = await fetchFolders();
      setFolders(res.data.data);
    } catch {
      setFolders([]);
    }
  }

  async function openFolder(name) {
    setActiveFolder(name);
    setLoading(true);

    try {
      const res = await fetchFiles(name);
      setFiles(res.data.data);
    } catch {
      setFiles([]);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setDroppedFile(file);
  }

  async function handleUploadSuccess(folder) {
    setDroppedFile(null);
    await openFolder(folder);
    loadFolders();
  }

async function refreshActiveFolder() {
  if (!activeFolder) return;
  try {
    const res = await fetchFiles(activeFolder);
    setFiles(res.data.data);
  } catch {
    setFiles([]);
  }
}



  return (
    <div className="flex h-screen p-4 gap-4">
      <Sidebar
        folders={folders}
        active={activeFolder}
        onSelect={openFolder}
      />

      <div className="flex-1 flex flex-col glass rounded-2xl overflow-hidden">
        <TopBar
          droppedFile={droppedFile}
          clearDroppedFile={() => setDroppedFile(null)}
          onUploadSuccess={handleUploadSuccess}
        />

        <div className="flex-1 p-6 overflow-auto">
          <FileGrid
            files={files}
            loading={loading}
            onDropFile={handleDrop}
            onPreview={setPreviewFile} // ADD
            onRefresh={refreshActiveFolder}
          />
        </div>
      </div>

      {/*  ADD */}
      <PreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </div>
  );
}
