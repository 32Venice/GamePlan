import React from 'react';

const RSVPItem = props => {

    return (
        <div id="fetchedGuests">
            {props.user_name}
            <button >Yes</button>
            <button >No</button>
        </div>
    )
}


export default RSVPItem;