import FileCard from "./FileCard";

export default function FileGrid({ files, onDropFile, onPreview, onRefresh }) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropFile}
      className="grid grid-cols-2 md:grid-cols-4 gap-5 min-h-[300px] transition-opacity duration-150"
    >
      {files.length ? (
        files.map((file) => (
          <FileCard
            key={file._id}
            file={file}
            onPreview={onPreview}
            onRefresh={onRefresh}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-slate-400 text-sm">
          Select a folder to view files
        </div>
      )}
    </div>
  );
}
