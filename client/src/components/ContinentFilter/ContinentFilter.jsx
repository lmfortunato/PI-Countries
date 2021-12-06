import React from "react";
import { useDispatch } from "react-redux";
import { filterCountriesByContinent } from "../../actions";
import Styles from "./ContinentFilter.module.css";

export default function ContinentFilter({setCurrentPage}){
    const dispatch = useDispatch();
    
    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
        setCurrentPage(1);
    }
    return(
        <select className={Styles.continentFilter} onChange={e => handleFilterContinent(e)} name="filterContinent" id="filterContinent">
                <option selected="true" disabled="disabled">Select Continent</option>
                    <option value="All">All</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="Oceania">Oceania</option>
                    <option value="South America">South America</option>
        </select>
    )
}