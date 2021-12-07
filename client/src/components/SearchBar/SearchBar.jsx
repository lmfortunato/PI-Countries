import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameCountries} from "../../actions";
import Styles from "./SearchBar.module.css";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange (e){
        e.preventDefault();
        setName(e.target.value)
        // dispatch(getNameCountries(name))

    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameCountries(name)) //voy a ir guardando lo que esta tipeando el usaurio en mi estado local
        setName("")
    }

    return(
        <div className={Styles.searchBar}>
            <input onChange={e => handleInputChange(e)} type="text" placeholder="Search country" />
            <button onClick={e=> handleSubmit(e)} type="submit">Go</button>
        </div>
    )
}