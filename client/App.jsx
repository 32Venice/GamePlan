import React, { Component } from 'react';

import axios from 'axios';

import './styles/styles.scss';
import SuppliesBox from "./components/SuppliesBox";
import RSVPBox from "./components/RSVPBox";
import ActivityBox from "./components/ActivityBox";
import EventInfo from "./components/EventInfo";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Supplies: [],
      Activities: [],
      Guests: [],
      claimedBy: ''
    };
  }


  // claimUpdate() {
  //
  // }
  //
  // claim() {
  //
  // }

  componentDidMount() {
    axios('/shoppinglist')
        .then(res => {
          return res.json();
        })
        .then(data => {
          // this.setState({ Supplies: [...data] });
          console.log(data)
        })
        .catch(err => console.log('Shopping List: axios GET ERROR: ', err));
  }

  render() {

    return (
      <div>
        <div className="row">
          <span className="title">RSVP</span>
          <span className="title">Event Info</span>
        </div>
        <div className="row">
          <span>
            <RSVPBox Guests={this.state.Guests} id="RSVPBox" className="container" />
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
            <SuppliesBox claim={this.claim} claimUpdate={this.claimUpdate} Supplies={this.state.Supplies} id="suppliesBox" className="container" />
          </span>
          <span>
            <ActivityBox Activities={this.state.Activities} className="container" />
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
