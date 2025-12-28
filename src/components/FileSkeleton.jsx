export default function FileSkeleton() {
  return (
    <div className="glass p-4 rounded-xl animate-pulse">
      <div className="h-8 w-8 bg-white/10 rounded mb-3" />
      <div className="h-3 bg-white/10 rounded w-3/4 mb-2" />
      <div className="h-3 bg-white/10 rounded w-1/2" />
    </div>
  );
}
