import {GET_COUNTRIES, FILTER_CONTINENT, FILTER_ACTIVITY, GET_ACTIVITIES, ORDER_BY_NAME, ORDER_BY_POPULATION, GET_NAME_COUNTRIES, POST_ACTIVITY, GET_COUNTRY_DETAIL} from "../actions/index";

const initialState = {
    countriesLoaded : [],
    detail:[],
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
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                detail:payload
            }
        case GET_ACTIVITIES:
            return{
                ...state,
                allActivities:payload
            }

        case POST_ACTIVITY:
            return{
                ...state,
            }

        case GET_NAME_COUNTRIES:
            console.log(payload)
            return{
                ...state,
                countriesLoaded: payload
            }
        case ORDER_BY_NAME:
            const orderByName = payload === "ascending"?
            state.countriesLoaded.sort(function(a,b){
                if(a.name > b.name){
                    return 1; //los invierte
                }
                if(b.name > a.name){
                    return -1; //no invierte
                }
                return 0;
            }) :
            state.countriesLoaded.sort(function(a,b){
                if(a.name > b.name){
                    return -1; // no los intercambia
                }
                if(b.name > a.name){
                    return 1; //los intercambia
                }
                return 0; //no intercambia ==
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
            console.log("payload", payload)
            const countriesAll = state.allCountries
            let stateActivity = [];
            for(let element of countriesAll){
                if(element.activities.length !== 0){
                    for(let el of element.activities){
                        if(el.name === payload){
                            stateActivity = [...stateActivity, element]
                        }
                    }
                }
            }
            console.log("stateactivity", stateActivity)
            return {
                ...state,
                countriesLoaded: stateActivity
            }
        default:
            return state;
    }
}



export default rootReducer;