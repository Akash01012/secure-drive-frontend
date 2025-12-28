export default function PreviewModal({ file, onClose }) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-black p-4 rounded-xl w-96 text-center">
        <p className="mb-4 text-sm text-gray-300">
          Preview is disabled for security reasons.
        </p>

        <a
          href={`${import.meta.env.VITE_API_URL}/api/files/download/${file._id}`}
          className="text-indigo-400 underline"
        >
          Download file
        </a>

        <button
          onClick={onClose}
          className="block mt-4 text-xs text-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
