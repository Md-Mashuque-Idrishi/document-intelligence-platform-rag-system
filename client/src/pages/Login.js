import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    //  validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      console.log("RESPONSE:", res.data);

      //  token save
      localStorage.setItem("token", res.data.token);

      alert("Login success ");

      //  redirect
      navigate("/dashboard");

    } catch (err) {
      console.log("ERROR:", err.response);
      alert(err.response?.data?.message || "Login failed ");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/*  Signup link */}
        <p className="text-center mb-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>

        {/*  Email */}
        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/*  Password */}
        <input
          className="w-full p-2 border mb-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;