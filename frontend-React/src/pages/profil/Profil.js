import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../helpers/authContext";
import Loader from "../../shared/components/Loader";
import './profil.css'


export default function Profil() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(authContext);

  useEffect(() => {
    userInfo();
  }, []);

  const userInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoading(false);
      });
  };

  const renderView = loading ? <Loader /> : (<div className="flex-row">
    <div>Profil {user.name}</div>
    <button>Me déconnecter</button>
  </div>);
  return <>{renderView}</>;
}
