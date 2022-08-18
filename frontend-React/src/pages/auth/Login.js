import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../helpers/authContext";
import "./login.css";
import axios from "axios";
export default function Login() {
  const { logged, setLogged } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status != 401) {
          localStorage.setItem("user_token", res.data.token);
          setLogged(true);
          console.log("ok");
          navigate("/profil");
        }
      });
  };

  const checkLogin = () => {
    if (localStorage.getItem("user_token")) {
      setLogged(true);
      navigate("/profil");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h4>
          Connecter vous
        </h4>
        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="senua@gmail.com" />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
