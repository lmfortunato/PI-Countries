import React from "react";
import { useDispatch } from "react-redux";
import { orderByPopulation } from "../../actions";
import Styles from "./PopulationFilter.module.css";

export default function PopulationFilter({setCurrentPage, setOrder}){
    const dispatch = useDispatch();

    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    return(
        <select className={Styles.populationFilter} onChange={e => handleSortPopulation(e)} name="filterPopulation" id="filterPopulation">
            <option selected="true" disabled="disabled">Population</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
        </select>
    )
}