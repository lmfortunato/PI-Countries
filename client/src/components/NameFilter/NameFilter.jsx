import React from "react";
import { useDispatch} from "react-redux";
import { orderByName } from "../../actions";
import Styles from "./NameFilter.module.css";

export default function NameFilter({setCurrentPage, setOrder}){
    const dispatch = useDispatch();
    
    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    return(
        <select className={Styles.nameFilter} onChange={e => handleSort(e)} name="filterAZ" id="filterAZ">
            <option selected="true" disabled="disabled">A-Z</option>
                <option value="ascending">A-Z</option>
                <option value="descending">Z-A</option>
        </select>
    )
}