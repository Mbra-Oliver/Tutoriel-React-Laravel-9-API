import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import "./details.css";
import Loader from "../../shared/components/Loader";

export default function Details() {
  const [activeTab, setActiveTabs] = useState(1);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  
  useEffect(() => {
    moviesRequest();
  }, []);


  const moviesRequest = async () => {
   
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}films/${id}`)
      .then((res) => {
        setMovie(res.data.film);
        setLoading(false);
      });
  };


  const conversationsData = [
    {
      from: 1,
      msg: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Exercitationem",
    },
    {
      from: 2,
      msg: "Ab a cumque quas quos voluptatem, laborumadipisci assumenda. Commodi!",
    },
  ];

  const tabs = [
    { id: 1, title: "Description" },
    { id: 2, title: "Acteurs" },
  ];


  const renderData = ()=> {
    return loading ? <Loader /> : (<div className="page-container">
    <div className="movie-pic-container">
      <div className="movie-pic" style={{  backgroundImage: `url(${movie.url})` }}>
        <div className="movie-details">
          <h4>{movie.titre}</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem quasi quae ipsam sunt ipsum placeat praesentium
            quis dolorum dignissimos esse. Ab a cumque quas quos voluptatem,
            laborum adipisci assumenda. Commodi!
          </p>
          <button>Acheter le film</button>
        </div>
      </div>
    </div>

    <div className="more-info">
      <div className="details">
        <div className="tabs">
          {tabs.map(({ id, title }) => {
            return (
              <div
              key={id}
                className={`tabs-item ${id === activeTab ? "active" : ""}`}
                onClick={() => {
                  setActiveTabs(id);
                }}
              >
                {title}
              </div>
            );
          })}
        </div>

        <div className="tabs-content">
          {activeTab === 1
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit.Exercitationem quasi quae ipsam sunt ipsum placeat praesentium quisdolorum dignissimos esse. Ab a cumque quas quos voluptatem, laborumadipisci assumenda. Commodi!"
            : "Aucun contenue"}
        </div>
      </div>

      <div className="chat">
        <div className="title">Film - Discussion</div>
        <ScrollToBottom className="conversations-container">
          {conversationsData.map(({ from, msg }) => {
            return (
              <div key={from} className={`message ${from === 1 ? "me" : "all"}`}>
                {msg}
              </div>
            );
          })}
        </ScrollToBottom>
        <input placeholder="votre message" />
      </div>
    </div>
  </div>)
  }

  return (
    <div>{renderData()}</div>
  );
}
