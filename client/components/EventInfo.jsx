import React from 'react';

const EventInfo = props => {
  return (
    <div>
      <form id="eventform" onSubmit={props.createEvent}>
        <h3>Party Name: </h3>
        <input
          id="partyName"
          type="text"
          name="partyName"
          value={props.eventName}
          onChange={props.eventNameChangeHandler}
        />
        <h3>Host: </h3>
        <input
          id="host"
          type="text"
          name="host"
          value={props.eventHost}
          onChange={props.eventHostChangeHandler}
        />
        <h3>Address: </h3>
        <input
          id="address"
          type="text"
          name="address"
          value={props.eventAddress}
          onChange={props.eventAddressChangeHandler}
        />
        <h3>Info: </h3>
        <input
          id="info"
          type="text"
          name="info"
          value={props.eventDescr}
          onChange={props.eventDescrChangeHandler}
        />
        <h3>Contact: </h3>
        <input
          id="contact"
          type="text"
          name="contact"
          value={props.contact}
          onChange={props.contactChangeHandler}
        />
        <h3>Type: </h3>
        <input
          id="type"
          type="text"
          name="type"
          value={props.eventType}
          onChange={props.eventTypeChangeHandler}
        />
        <input id="submit" type="submit" value="Save Event" />
      </form>
    </div>
  );
};

export default EventInfo;
