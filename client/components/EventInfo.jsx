import React from 'react';

let eventName;
let eventHost;
let eventAddress;
let eventDescr;
let contact;
let eventType;
const EventInfo = props => {
  return (
    <div>
      <form
        id="eventform"
        onSubmit={props.createEvent(
          eventName,
          eventHost,
          eventAddress,
          eventDescr,
          contact,
          eventType
        )}
      >
        <span>
          <h3>Party Name: </h3>
          <input
            id="partyName"
            type="text"
            name="partyName"
            ref={text => {
              eventName = text;
            }}
          />
        </span>
        <span>
          <h3>Host: </h3>
          <input
            id="host"
            type="text"
            name="host"
            ref={host => (eventHost = host)}
          />
        </span>
        <span>
          <h3>Address: </h3>
          <input
            id="address"
            type="text"
            name="address"
            ref={address => (eventAddress = address)}
          />
        </span>
        <span>
          <h3>Info: </h3>
          <input
            id="info"
            type="text"
            name="info"
            ref={descr => (eventDescr = descr)}
          />
        </span>
        <span>
          <h3>Contact: </h3>
          <input
            id="contact"
            type="text"
            name="contact"
            ref={cont => (contact = cont)}
          />
        </span>
        <span>
          <h3>Type: </h3>
          <input
            id="type"
            type="text"
            name="type"
            ref={type => (eventType = type)}
          />
        </span>
        <input id="submit" type="submit" value="Save Event" />
      </form>
    </div>
  );
};

export default EventInfo;
