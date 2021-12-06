import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActivity } from "../../actions";
import Styles from "./ActivityFilter.module.css";

export default function ActivityFilter({setCurrentPage}){
    const dispatch = useDispatch();
    const activities = useSelector((state) => state.allActivities);
    function handleFilterActivity(e){
        e.preventDefault();
        dispatch(filterActivity(e.target.value))
        setCurrentPage(1);
    }
    return(
            <select className={Styles.activityFilter} onChange={e => handleFilterActivity(e)} name="filterActivity" id="filterActivity">
                <option selected="true" disabled="disabled">Select Activity</option>
                {activities?.map(activity => {
                    return(
                        <option id={activity.id} key={activity.id} value={activity.name}>{activity.name}</option>
                    )
                })

                }
            </select> 
    )
            
}