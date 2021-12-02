import { bindActionCreators } from "redux";
import {GET_COUNTRIES, FILTER_CONTINENT, FILTER_ACTIVITY, GET_ACTIVITIES, ORDER_BY_NAME, ORDER_BY_POPULATION, GET_NAME_COUNTRIES} from "../actions/index";

const initialState = {
    countriesLoaded : [],
    allCountries:[],
    allActivities: []
}


function rootReducer (state = initialState, {type, payload}) {
    switch (type){
        case GET_COUNTRIES:
            return{
                ...state,
                countriesLoaded: payload,
                allCountries: payload
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                allActivities:payload
            }

        case GET_NAME_COUNTRIES:
            return{
                ...state,
                countriesLoaded: payload
            }
        case ORDER_BY_NAME:
            const orderByName = payload === "ascending"?
            state.countriesLoaded.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.countriesLoaded.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })

            return{
                ...state,
                countriesLoaded : orderByName
            }

        case ORDER_BY_POPULATION:
            const orderByPopulation = payload === "lowest"?
            state.countriesLoaded.sort(function(a,b){
                if(a.population > b.population){
                    return 1;
                }
                if(b.population > a.population){
                    return -1;
                }
                return 0;
            }) :
            state.countriesLoaded.sort(function(a,b){
                if(a.population > b.population){
                    return -1;
                }
                if(b.population > a.population){
                    return 1;
                }
                return 0;
            })

            return{
                ...state,
                countriesLoaded : orderByPopulation
            }
        case FILTER_CONTINENT:
            const allCountries = state.allCountries //Siempre voy a filtrar sobre este estado que tiene todos los countries
            const statusFiltered = payload === "All" ? allCountries : allCountries.filter(el => el.continent === payload);
            return{
                ...state,
                countriesLoaded : statusFiltered
            }
        case FILTER_ACTIVITY:
            const countriesAll = state.allCountries
            const filterActivity = countriesAll.filter(el => el.name)
            return {
                ...state,
                allCountries: filterActivity
            }
        default:
            return state;
    }
}

{/* <option value="All">All</option>
<option value="ecoTourism">Eco Tourism</option>
<option value="festivals">Festivals</option>
<option value="golf">Golf</option>
<option value="bike">Mountain Bike</option>
<option value="museum">Museum</option>
<option value="rivers">Rivers</option>
<option value="sky">Sky</option>
<option value="nightclubs">Nightclubs</option>
<option value="fishing">Fishing</option>
<option value="pubs">Pubs</option>
<option value="tours">Tours</option>
<option value="diving">Diving</option>
<option value="gastronomicTour">Gastronomic Tour</option>
<option value="nationalParks">National Parks</option>
<option value="thermalCenters">Thermal Centers</option>
<option value="adventureTurism">Adventure Turism</option> */}


export default rootReducer;