import React from 'react';

const ActivityItem = props => {

    return (
        <div>
            {props.Name}
            <span> Claimed By: </span>
            {props.ClaimedBy}
            <input onChange={(e) => props.claimActivityChangeHandler(e.target.value)}/>
            <button onClick={() => props.claimActivityClickHandler}>Claim</button>
        </div>
    )
}

export default ActivityItem;
