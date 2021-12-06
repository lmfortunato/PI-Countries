import React from "react";
import {Link} from "react-router-dom";
import Styles from "./Landing.module.css";

import Title from "./coollogo_com-88534688.png"
import Name from "./coollogo_com-140824129.png"

export default function LandingPage(){
    return(
        <div className={Styles.landingPage}>
            <img className={Styles.title} src={Title} alt="" />
            <Link to="/home">
                <button className={Styles.btnEnter}>Enter</button>
            </Link>
            <img className={Styles.name} src={Name} alt="" />
        </div>
    )
}