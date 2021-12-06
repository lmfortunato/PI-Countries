import React from "react";
import Styles from "./Card.module.css";
export default function Card({name, continent, flag, population}){
    return(
        <div className={Styles.card}>
            <img src={flag} alt="Flag image" />
            <h3 className={Styles.cardTitle}>{name}</h3>
            <h4 className={Styles.cardSubtitle}>{continent}</h4>
            <h4 className={Styles.population}>Population: {population}</h4>
        </div>
    )
}