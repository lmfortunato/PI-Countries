import React from "react";
import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../actions";
import { useEffect } from "react";
import Loading from "./plane-loader-slower.gif"
import Styles from "./CountryDetail.module.css";
import Title from "./coollogo_com-204741643.png"

export default function CountryDetail(){
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getCountryDetail(id))
    },[dispatch, id])

    const detail = useSelector((state) => state.detail)
    
    return(
        <div className={Styles.detailContainer}>
            <div className={Styles.header}>
                <Link to="/home">
                    <button className={Styles.btnBack}>Back to home</button>
                </Link>
                <img src={Title} alt="" />
            </div>
            
            {Object.keys(detail).length > 0 ? 
                <div className={Styles.countryContainer}>
                    <div>
                        <img className={Styles.flag} src={detail.flag} alt="flag Image" />
                    </div>
                    <div className={Styles.details}>
                        <h1>{detail.name} ({detail.id})</h1>
                        <h2>{detail.continent}</h2>
                        <h3>Capital: {detail.capital}</h3>
                        <h3>Subregion: {detail.subregion}</h3>
                        <h4>Area: {detail.area}</h4>
                        <h4>Population: {detail.population}</h4>
                    </div>
                    <div className={Styles.activities}>
                        <h2>Activities</h2>
                        {detail.activities.length > 0 ? detail.activities.map(activity =>
                            <div>
                                <h3>{activity.name}</h3>
                                <h4>Difficulty: {activity.difficulty}</h4>
                                <h4>Duration: {activity.duration} minutes</h4>
                                <h4>Season: {activity.season}</h4>
                            </div>
                        ) : <h3>There is no activities</h3>}
                    </div>
                </div> : <img src={Loading}/>
        }
        </div>
    )
}