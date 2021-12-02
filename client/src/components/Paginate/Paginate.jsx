import React from "react";
import "./Paginate.css";

export default function Paginate ({countriesPerPage, countriesLoaded, paginate}){ //me traigo las props del otro componente
    const pageNumbers = []; // declaro arreglo vacio 

    for(let i=1; i <= Math.ceil(countriesLoaded/countriesPerPage); i++){ //numero redondo que resulta de la division
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className="paginate">
                {pageNumbers && pageNumbers.map(number => (
                    <li className="number" key={number}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}