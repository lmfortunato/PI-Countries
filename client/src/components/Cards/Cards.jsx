import React from "react";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import Styles from "./Cards.module.css"
import Loading from "./plane-loader-slower.gif"

export default function Cards({currentCountries}){
    return(
        <div className={Styles.cards}>
            {Array.isArray(currentCountries)? currentCountries.map(country => {
                    return(
                        <React.Fragment>
                            <Link className={Styles.link} to={"/home/" + country.id}>
                                <Card name={country.name} continent={country.continent} flag={country.flag} population={country.population} key={country.id}/>
                            </Link>
                        </React.Fragment>
                    )
                }): <img className={Styles.loading} src={Loading} alt="" />
            } 
        </div>
    )
}