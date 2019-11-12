import React, { Component } from "react";
import ActivityItem from "./ActivityItem.jsx";

const ActivityBox = props => {
  const activityArr = [];


    for (let i = props.Activities.length - 1; i >= 0; i--) {
        activityArr.push(<ActivityItem
            id={props.Activities[i]._id}
            Name={props.Activities[i].activityName}
            Likes={props.Activities[i].activityLikes}
            claimActivityClickHandler={props.Activities[i].claimActivityClickHandler}
            claimActivityChangeHandler={props.Activities[i].claimActivityChangeHandler}
            ClaimedBy={props.Activities[i].activityClaimedBy}
            />);
    }

    return (
        <div>
            <div className="activityList">
                {activityArr}
            </div>
            <div className="createActivity" >
                <button onClick={props.ActivityClickHandler} className="addButton">Add Activity</button>
                <input onChange={(e) => props.ActivityChangeHandler(e.target.value)} />
            </div>
        </div>
    )
}


export default ActivityBox;
