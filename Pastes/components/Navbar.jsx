import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 
      w-[90%] max-w-xl px-8 py-4 
      bg-white/10 backdrop-blur-2xl border border-white/20 
      rounded-3xl shadow-xl flex justify-between items-center">

      <h1 className="text-2xl font-black tracking-tight text-cyan-300">
        BluePaste
      </h1>

      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-2 rounded-2xl font-semibold transition-all ${
              isActive
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-6 py-2 rounded-2xl font-semibold transition-all ${
              isActive
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
