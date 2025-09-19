import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [mes, setMes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/test", { withCredentials: true }) // ✅ send cookies
      .then((res) => {
        setMes(res.data.message);
      })
      .catch((err) => {
        if (err.response) {
          const errorMsg = err.response.data.message;
          setMes(errorMsg);

          if (errorMsg === "Unauthorized / No token") {
            navigate("/login");
          }
        }
      });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700">Home</h1>
    </div>
  );
};

export default Home;
