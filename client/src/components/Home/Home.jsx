import React from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities} from "../../actions";
import {Link} from "react-router-dom";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import Styles from "./Home.module.css";
import Cards from "../Cards/Cards";
import ActivityFilter from "../ActivityFilter/ActivityFilter";
import ContinentFilter from "../ContinentFilter/ContinentFilter";
import PopulationFilter from "../PopulationFilter/PopulationFilter";
import NameFilter from "../NameFilter/NameFilter";
import Logo from "../coollogo_com-322342168.png"

export default function Home (){
    const dispatch = useDispatch();
    const countriesLoaded = useSelector((state) => state.countriesLoaded); //Es lo mismo que hacer el mapstatetoprops
    // const activities = useSelector((state) => state.allActivities);
    // console.log(activities)
    
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

    return(
    <div className={Styles.bg}>
        <div className={Styles.header}>
            <button onClick={e => {handleClick(e)}}>All Countries</button>
            {/* <h1>COUNTRIES SPA</h1> */}
            <img src={Logo} alt="" />
            <Link to="/activity">
                <button>Create Activity</button>
            </Link>
        </div>
        <div className={Styles.filterContainer}>
            <div className={Styles.filters}>
                <NameFilter setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                <PopulationFilter setCurrentPage={setCurrentPage} setOrder={setOrder} />
                <ContinentFilter setCurrentPage={setCurrentPage} />
                <ActivityFilter setCurrentPage={setCurrentPage}/>
            </div>
            <div>
                <SearchBar/>
            </div>
        </div>
        <div className={Styles.paginate}>
            <Paginate countriesPerPage={countriesPerPage} countriesLoaded={countriesLoaded.length} paginate={paginate}/>
        </div>
        <div className={Styles.cardsContainer}>
            <Cards currentCountries={currentCountries}/>
        </div>
    </div>
)
}

