export default function FileCard({ file, onPreview }) {
  function getStatus() {
    if (file.isOneTime && file.isUsed) {
      return <span className="text-xs text-gray-400">Used</span>;
    }

    if (file.isOneTime && !file.isUsed) {
      return <span className="text-xs text-red-400">One-time</span>;
    }

    return null;
  }

  function handleClick() {
    if (file.isOneTime) {
      alert("This is a one-time file. Preview is disabled. Please download.");
      return;
    }

    onPreview(file);
  }

  return (
    <div
      className="glass p-4 rounded-xl hover:scale-[1.02] transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-3xl">📄</div>

      <p className="text-sm mt-2 truncate">{file.originalName}</p>

      <div className="mt-1">{getStatus()}</div>

      <a
        onClick={(e) => {
          e.stopPropagation();
          setTimeout(() => onRefresh?.(), 3000);//  refresh after download
        }}
        href={`${import.meta.env.VITE_API_URL}/api/files/download/${file._id}`}
        className="text-xs text-indigo-400 mt-2 inline-block hover:underline"
      >
        Download
      </a>
    </div>
  );
}
