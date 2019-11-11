import React, { Component } from 'react';
import ActivityItem from './ActivityItem.jsx';

const ActivityBox = props => {

    const activityArr = [];

    for (let i = props.Activities.length - 1; i >= 0; i--) {
        activityArr.push(<ActivityItem
            id={props.Activities[i]._id}
            Name={props.Activities[i].activityName}
            Likes={props.Activities[i].activityLikes}
            Claimed={props.Activities[i].activityClaimed}
            ClaimedBy={props.Activities[i].activityClaimedBy}
            claimUpdate={props.claimUpdate}
            claim={props.claim}/>);
    }

    return (
        <div>
            <div className="activityList">
                {activityArr}
            </div>
            <div className="createActivity" >
                <button className="addButton">Add Activity</button>
                <input/>
            </div>
        </div>
    )
}

export default ActivityBox;
