import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import "./film.css";

export default function Film() {


  let navigate = useNavigate();

  
  //Variable d'Etat et global gerer avec le Hook useState

  
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);

  //Hook qui s'exécute a chaque chagement que subit cette page;

  useEffect(() => {
    moviesRequest();
  }, []);

  //Fonctions asynchrone pour recuperer les données sur le serveur Laravel Distant

  const moviesRequest = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}films`).then((res) => {
      setFilms(res.data.films);
      setLoading(false);
    });
  };

  //Methode de rendu des films

  const MoviesRender = () => {
    return loading ? (
      <Loader />
    ) : (
      <div className="page-container">
        <div className="section">
          Total de film disponibles : <span>{films.length}</span>
        </div>
        <div className="movies-container">
          {films.map(({ id, titre, url, description }) => {
            return (
              <div key={id} className="movie-card" onClick={()=>navigate(`films/${id}`)}>
                <div className="img-container">
                  <img src={url} alt={titre} />
                </div>
                <div className="details">
                  <h4>{titre}</h4>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>{MoviesRender()}</div>
    </div>
  );
}
