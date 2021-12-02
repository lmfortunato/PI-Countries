import React from "react";
import {Link} from "react-router-dom";
import "./Landing.css";

export default function LandingPage(){
    return(
        <div className="landingPage">
            <h1>Countries Single Page Application</h1>
            <Link to="/home">
                <button>Enter</button>
            </Link>
        </div>
    )
}