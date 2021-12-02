import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities, filterCountriesByContinent, filterActivity,orderByName, orderByPopulation } from "../../actions";
import {Link} from "react-router-dom";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

export default function Home (){
    const dispatch = useDispatch();
    const countriesLoaded = useSelector((state) => state.countriesLoaded); //Es lo mismo que hacer el mapstatetoprops
    const activities = useSelector((state) => state.allActivities);
    console.log(activities)
    
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1); //Pagina actual
    const [countriesPerPage, setCountriesPerPage] = useState(9); // Cuantos personajes por page
    const [order, setOrder] = useState("")
    const indexOfLastCountry = currentPage * countriesPerPage; // 9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = countriesLoaded.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => { //monto el componente 
        dispatch(getCountries())
        dispatch(getActivities())  // Es lo mismo que hacer el map dispatch to props
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    function handleSortPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    function handleFilterContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
    }

    function handleFilterActivity(e){
        dispatch(filterActivity(e.target.id))
    }

    return(
    <div>
        <div>
        <Link to="/activity">
            Create Activity
        </Link>
        <h1>Countries SPA</h1>
        <button onClick={e => {handleClick(e)}}>All Countries</button>
        <SearchBar/>
        </div>
        <div>
            <select onChange={e => handleSort(e)} name="filterAZ" id="filterAZ">
            <option selected="true" disabled="disabled">A-Z</option>
                <option value="ascending">A-Z</option>
                <option value="descending">Z-A</option>
            </select>
            
            <select onChange={e => handleSortPopulation(e)} name="filterPopulation" id="filterPopulation">
            <option selected="true" disabled="disabled">Population</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
            </select>

            <select onChange={e => handleFilterContinent(e)} name="filterContinent" id="filterContinent">
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

            <select onChange={e => handleFilterActivity(e)} name="filterActivity" id="filterActivity">
                <option selected="true" disabled="disabled">Select Activity</option>
                {activities?.map(activity => {
                    return(
                        <option id={activity.id} key={activity.id} value={activity.name}>{activity.name}</option>
                    )
                })

                }
            </select>

            <Paginate countriesPerPage={countriesPerPage} countriesLoaded={countriesLoaded.length} paginate={paginate}/>

            {Array.isArray(currentCountries)? currentCountries.map(country => {
                    return(
                        <React.Fragment>
                            <Link to={"/home/" + country.id}>
                                <Card name={country.name} continent={country.continent} flag={country.flag} population={country.population} key={country.id}/>
                            </Link>
                        </React.Fragment>
                    )
                }): <h1>Country not found</h1>
            } 
            
        </div>
    </div>
)
}

