import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    await API.post("/documents/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("File uploaded");
    navigate("/chat");
  };

  return (
  <div className="flex flex-col items-center mt-10">
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload PDF</h2>

      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Upload
      </button>
    </div>
  </div>
);
  
}

export default Dashboard;