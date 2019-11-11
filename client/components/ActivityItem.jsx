import React from 'react';

const ActivityItem = props => {

    return (
        <div>
            {props.Name}
            <input onChange={(e) => props.claimUpdate(e)}/>
            <button onClick={props.claim}>Claim</button>
        </div>
    )
}

export default ActivityItem;
