import React from "react";
import "./Card.css";
export default function Card({name, continent, flag, population}){
    return(
        <div className="card">
            <img src={flag} alt="Flag image" />
            <h3 className="cardTitle">{name}</h3>
            <h4 className="cardSubtitle">{continent}</h4>
            <h4 className="population">Population: {population}</h4>
        </div>
    )
}