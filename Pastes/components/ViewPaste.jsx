import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { pasteId } = useParams();
  const pastes = useSelector(state => state.paste.pastes);

  const paste = pastes.find(p => p.id === pasteId);
  if (!paste) return <div className="text-white pt-32">Paste not found</div>;

  return (
    <div className="pt-32 max-w-3xl mx-auto px-6 text-white">
      <div className="bg-white/10 backdrop-blur border border-white/20
      rounded-[3rem] p-10">

        <h1 className="text-4xl font-black mb-6 text-cyan-300">
          {paste.title}
        </h1>

        <p className="text-xl leading-relaxed whitespace-pre-wrap text-white/80">
          {paste.content}
        </p>

        <div className="mt-10 text-sm text-white/40">
          {new Date(paste.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
