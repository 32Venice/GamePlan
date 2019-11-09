import React, { Component } from 'react';

import axios from 'axios';

import './styles/styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Guests = [];
    const Supplies = [];

    return (
      <div>
        <div className="row">
          <span className="title">RSVP</span>
          <span className="title">Event Info</span>
        </div>
        <div className="row">
          <span>
            <div id="RSVPBox" className="container">
              <div className="RSVPList">
                {Guests}
              </div>
              <div className="createGuest">
                <button className="addButton">Add Guest</button>
                <input/>
              </div>
            </div>
          </span>
          <span>
            <div className="container">
              <div><span>Party Name:</span><span></span></div>
              <div><span>Host:</span><span></span></div>
              <div><span>Address:</span><span></span></div>
              <div><span>Type:</span><span></span></div>
              <div><span>Info:</span><span></span></div>
            </div>
          </span>
        </div>
        <div className="row">
          <span className="title">Supplies</span>
          <span className="title">Activities</span>
        </div>
        <div className="row">
          <span>
            <div id="suppliesBox" className="container">
              <div className="supplyList">
                {Supplies}
              </div>
              <div className="createSupplies" >
                <button className="addButton">Add Supplies</button>
                <input/>
              </div>
            </div>
          </span>
          <span>
            <div className="container"></div>
          </span>
        </div>
        <div className="row">
          <span className="title">Music</span>
          <span className="title">Comments</span>
        </div>
        <div className="row">
          <span><div className="container"></div></span>
          <span><div className="container"></div></span>
        </div>
      </div>
    );
  }
}
export default App;
