import React, { Component } from 'react';
import RSVPItem from './RSVPItem.jsx';

const RSVPBox = props => {

    const rsvpArr = [];

    for (let i = props.Guests.length - 1; i >= 0; i--) {
        rsvpArr.push(<RSVPItem
            id={props.Guests[i]._id}
            user_id={props.Guests[i].user_id}
            Name={props.Guests[i].user_name}
            RSVP={props.Guests[i].rsvp} />);
    }

    return (
    <div>
        <div className="RSVPList">
            {rsvpArr}
        </div>
        <div className="createGuest">
            <button className="addButton">Add Guest</button>
            <input/>
        </div>
    </div>
)
}

export default RSVPBox;
