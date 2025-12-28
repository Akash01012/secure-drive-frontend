export default function Sidebar({ folders, active, onSelect }) {
  return (
    <aside className="w-64 glass rounded-2xl p-4">
      <h2 className="text-sm font-semibold mb-4">My Drive</h2>

      <div className="space-y-1">

        {/*  DEFAULT / ROOT FOLDER (ALWAYS ON TOP) */}
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
            ${
              active === null
                ? "bg-indigo-500/20 text-indigo-400"
                : "hover:bg-white/5"
            }`}
        >
          📂
        </button>
        {folders.map(f => (
          <button
            key={f._id}
            onClick={() => onSelect(f._id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
              ${
                active === f._id
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "hover:bg-white/5"
              }`}
          >
            📁 {f._id}
          </button>
        ))}
      </div>
    </aside>
  );
}
