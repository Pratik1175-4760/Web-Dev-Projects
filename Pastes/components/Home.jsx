import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find(p => p.id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  const createPaste = () => {
    const paste = {
      id: pasteId || Date.now().toString(36),
      title,
      content: value,
      createdAt: new Date().toISOString(),
    };

    pasteId ? dispatch(updateToPastes(paste)) : dispatch(addToPastes(paste));

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="pt-32 max-w-5xl mx-auto px-6 text-white">
      <h1 className="text-5xl font-black mb-8">
        Capture your <span className="text-cyan-400">Thoughts</span>
      </h1>

      <div className="flex gap-6 mb-6">
        <input
          className="flex-1 px-6 py-4 text-xl rounded-2xl 
          bg-white/10 backdrop-blur border border-white/20 
          outline-none focus:ring-4 focus:ring-cyan-400/30"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="px-8 py-4 rounded-2xl text-xl font-bold
          bg-gradient-to-br from-cyan-500 to-blue-600
          hover:scale-95 transition"
        >
          {pasteId ? "Update" : "Save"}
        </button>
      </div>

      <textarea
        className="w-full h-[400px] p-8 text-lg rounded-3xl 
        bg-white/10 backdrop-blur border border-white/20
        outline-none focus:ring-4 focus:ring-blue-400/30 resize-none"
        placeholder="Write something meaningful..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Home;
