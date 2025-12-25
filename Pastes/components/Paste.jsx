import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromPastes, resetAllPastes } from "../redux/pasteSlice";
import { useState } from "react";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = pastes.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-32 max-w-6xl mx-auto px-6 text-white">
      <div className="flex justify-between mb-10">
        <input
          className="px-6 py-4 w-96 rounded-full 
          bg-white/10 backdrop-blur border border-white/20
          outline-none focus:ring-4 focus:ring-cyan-400/30"
          placeholder="Search pastes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => dispatch(resetAllPastes())}
          className="px-6 py-3 rounded-xl bg-red-500/70 hover:bg-red-600"
        >
          Delete All
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map(paste => (
          <div
            key={paste.id}
            className="bg-white/10 backdrop-blur border border-white/20
            rounded-3xl p-6 flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-cyan-300 truncate">
              {paste.title}
            </h2>

            <p className="text-white/70 line-clamp-3 italic">
              {paste.content}
            </p>

            <div className="flex justify-between mt-4">
              <div className="flex gap-3">
                <button onClick={() => navigate(`/?pasteId=${paste.id}`)}>Edit</button>
                <button onClick={() => navigate(`/pastes/${paste.id}`)}>View</button>
                <button onClick={() => dispatch(removeFromPastes(paste.id))}>Delete</button>
              </div>

              <span className="text-sm text-white/40">
                {new Date(paste.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pastes;
