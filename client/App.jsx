import React, { Component } from "react";

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
      claimedBy: '',
        newSupply: ''
    };
  this.createEvent = this.createEvent.bind(this);
  this.SuppliesChangeHandler = this.SuppliesChangeHandler.bind(this);
  this.SuppliesClickHandler = this.SuppliesClickHandler.bind(this);
  this.claimChangeHandler = this.claimChangeHandler.bind(this);
  this.claimClickHandler = this.claimClickHandler.bind(this);
  }


    SuppliesClickHandler() {
      const item = {};
      item.itemName = this.state.newSupply;
      axios.post('/shoppinglist/addItem', {event_id: '5dc9ae30a59286288c8bf539', item: item})
          .then(res => {
              console.log(res.data.shoppingList)
              this.setState({
                  newSupply: '',
                  Supplies: [...res.data.shoppingList]
              })
          })
    }

    SuppliesChangeHandler(value) {
        this.setState({newSupply: value})
    }

  claimChangeHandler(value) {
      this.setState({claimedBy: value})
  }

  claimClickHandler(value) {
      const item = {};
      item.itemName = value;
      item.itemClaimedBy = this.state.claimedBy;
      console.log(item)
      axios.put('/shoppinglist/updateItem', {event_id: '5dc9ae30a59286288c8bf539', item: item})
          .then(res => {
              console.log(res.data)
              this.setState({
                  claimedBy: '',
                  Supplies: [...res.data.shoppingList]
              })
          })
  }

  componentDidMount() {
    axios.post('/shoppinglist/', {event_id: '5dc9ae30a59286288c8bf539'})
        .then(res => {
            this.setState({ Supplies: [...res.data] })
        })
        .catch(err => console.log('Shopping List: axios GET ERROR: ', err));

  }

  createEvent(name, host, address, descr, cont, type) {
    axios
      .post("/events/addevent", {
        eventName: name,
        eventHost: host,
        eventAddress: address,
        eventDescr: descr,
        contact: cont,
        eventType: type
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
      })
      .catch(err => console.log("ERROR"));

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
            <EventInfo createEvent={this.createEvent}></EventInfo>
          </span>
        </div>
        <div className="row">
          <span className="title">Supplies</span>
          <span className="title">Activities</span>
        </div>
        <div className="row">
          <span>
            <SuppliesBox SuppliesClickHandler={this.SuppliesClickHandler} SuppliesChangeHandler={this.SuppliesChangeHandler} claimClickHandler={this.claimClickHandler} claimChangeHandler={this.claimChangeHandler} Supplies={this.state.Supplies} id="suppliesBox" className="container" />
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
          <span>
            <div className="container"></div>
          </span>
          <span>
            <div className="container"></div>
          </span>
        </div>
      </div>
    );
  }
}
export default App;
