import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const GET_NAME_COUNTRIES = "GET_NAME_COUNTRIES"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION"
export const FILTER_CONTINENT = "FILTER_CONTINENT"
export const FILTER_ACTIVITY = "FILTER_ACTIVITY"

export function getCountries(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/countries")
        dispatch({
            type: GET_COUNTRIES,
            payload: response.data
        })
    }
}

export function getActivities(){
    return async function(dispatch){
        const response = await axios.get("http://localhost:3001/activity")
        dispatch({
            type: GET_ACTIVITIES,
            payload: response.data
        })
    }
}

export function getNameCountries(name){
    return async function(dispatch){
        try{
            const response = await axios.get("http://localhost:3001/countries?name=" + name)
            dispatch({
                type: GET_NAME_COUNTRIES,
                payload: response.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function filterCountriesByContinent(payload){
    return {
        type: FILTER_CONTINENT,
        payload
    }
}

export function filterActivity(payload){
    return{
        type: FILTER_ACTIVITY,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}