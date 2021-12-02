import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameCountries} from "../../actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange (e){
        e.preventDefault();
        setName(e.target.value)

    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameCountries(name)) //voy a ir guardando lo que esta tipeando el usaurio en mi estado local
    }

    return(
        <div>
            <input onChange={e => handleInputChange(e)} type="text" placeholder="Search country" />
            <button onClick={e=> handleSubmit(e)} type="submit">Search</button>
        </div>
    )
}