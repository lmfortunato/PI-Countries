import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getActivities, postActivity} from "../../actions"
import Styles from "./Activity.module.css";
import Title from "./coollogo_com-9342723.png"

export default function Activity(){
const dispatch = useDispatch();
const history = useHistory();
const countries = useSelector((state) => state.allCountries)

const [input, setInput] = useState({
    name:"",
    difficulty:"",
    duration:"",
    season:["Fall", "Winter", "Spring", "Summer"],
    countries:[]
})
useEffect(() =>{
    dispatch(getActivities())
}, [dispatch])

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
}

function handleSelect(e){
    setInput({
        ...input,
        countries: [...input.countries, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Activity Created")
    setInput({
        name:"",
        difficulty:"",
        duration:"",
        season:["Fall", "Winter", "Spring", "Summer"],
        countries:[]
    });
    history.push("/home");
}

function handleDelete(el){
    setInput({
        ...input,
        // countries: input.countries.filter(country => country !== el)
        countries: input.countries.filter(country => country !== el)
    })
}

return(
    <div className={Styles.createActivity}>
        <div className={Styles.titleContainer}>
            <Link to="/home">
                <button className={Styles.btnBack}>Back to home</button>
            </Link>
            <img className={Styles.title} src={Title} alt="" />
        </div>
        <div className={Styles.formContainer}>
            <form className={Styles.form} onSubmit={e => handleSubmit(e)}>
                <div className={Styles.activityName}>
                    <label htmlFor="name">Activity name</label>
                    <input onChange={handleChange} type="text" value={input.name} placeholder="Activity name..." name="name"/>
                </div>
                <div className={Styles.difficulty}>
                    <label htmlFor="difficulty">Difficulty</label>
                    <select onChange={e => handleChange(e)} name="difficulty" id="" >
                    <option selected="true" disabled="">Select Difficulty</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div className={Styles.duration}>
                    <label htmlFor="duration">Duration in minutes</label>
                    <input onChange={handleChange} type="number" min="10" max="300" value={input.duration} placeholder="Mins..." name="duration" />
                </div>
                <div className={Styles.season}>
                    <label htmlFor="season">Season</label>
                    <select onChange={e => handleChange(e)} name="season" id="" >
                    <option selected="true" disabled="">Select Season</option>
                        <option value={input.season[0]}>Fall</option>
                        <option value={input.season[1]}>Winter</option>
                        <option value={input.season[2]}>Spring</option>
                        <option value={input.season[3]}>Summer</option>
                    </select>
                </div>
                <div className={Styles.countries}>
                    <label htmlFor="countries">Countries</label>
                    <select onChange={e => handleSelect(e)} name="countries" id="">
                    <option selected="true" disabled="">Select Country</option>
                        {countries?.map((country , i) => (
                            <option value={country.id} key={i}>{country.name}</option>
                        ))}
                    </select>
                </div>


                <input className={Styles.submit} type="submit" value="Submit"
                disabled={
                    !input.name ||
                    !input.duration ||
                    !input.difficulty ||
                    !input.season ||
                    !input.countries
                }
                />

            
            
                <div className={Styles.countriesSelected}>
                {input.countries.map(el => 
                    <div className={Styles.country}>
                        <h4>{el}</h4>
                        <button className="btnDelete" onClick={() => handleDelete(el)}>x</button>
                    </div>
                    )}
                </div>
            </form>
        </div>
    </div>
)

}
