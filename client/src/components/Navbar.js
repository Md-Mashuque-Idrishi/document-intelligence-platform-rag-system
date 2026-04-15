import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">RAG App</h1>

      <div className="flex gap-6 items-center">
        {!token && <Link to="/" className="hover:text-blue-400">Login</Link>}
        {token && <Link to="/dashboard" className="hover:text-blue-400">Upload</Link>}
        {token && <Link to="/chat" className="hover:text-blue-400">Chat</Link>}

        {token && (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;