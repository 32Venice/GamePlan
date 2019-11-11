import React from 'react';

const EventInfo = props => {
  let partyName;
  let host;
  let address;
  let type;
  let info;

  return (
    <div>
      <form id="eventform" onSubmit={props.createEvent}>
        <h3>Party Name: </h3>{' '}
        <input id="partyName" type="text" ref={partyName} />
        <h3>Host: </h3> <input id="host" type="text" ref={host} />
        <h3>Address: </h3> <input id="address" type="text" ref={address} />
        <h3>Type: </h3> <input id="type" type="text" ref={type} />
        <h3>Info: </h3> <input id="info" type="text" ref={info} />
        <input id="submit" type="submit" value="Save Event" />
      </form>
    </div>
  );
};

export default EventInfo;
