import React, { Component } from 'react';

import { Switch, Route, Link, withRouter } from 'react-router-dom';

import axios from 'axios';

import styles from './scss/application.scss';

import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import EventInfo from './components/EventInfo';

import SuppliesBox from './components/SuppliesBox';
import RSVPBox from './components/RSVPBox';
import ActivityBox from './components/ActivityBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userId: '',
      Supplies: [],
      Activities: [],
      Guests: [],
      claimedBy: '',
      newSupply: '',
      newActivity: '',
      activityClaimedBy: '',
      eventId: '',
      eventName: '',
      eventHost: '',
      eventAddress: '',
      eventDescr: '',
      contact: '',
      eventType: ''

    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitSignUpHandler = this.submitSignUpHandler.bind(this);
    this.submitLoginHandler = this.submitLoginHandler.bind(this);

    this.createEvent = this.createEvent.bind(this);
    this.SuppliesChangeHandler = this.SuppliesChangeHandler.bind(this);
    this.SuppliesClickHandler = this.SuppliesClickHandler.bind(this);
    this.claimChangeHandler = this.claimChangeHandler.bind(this);
    this.claimClickHandler = this.claimClickHandler.bind(this);

    this.claimActivityChangeHandler = this.claimActivityChangeHandler.bind(this);
    this.claimActivityClickHandler = this.claimActivityClickHandler.bind(this);
    this.ActivityChangeHandler = this.ActivityChangeHandler.bind(this);
    this.ActivityClickHandler = this.ActivityClickHandler.bind(this);

    this.eventNameChangeHandler = this.eventNameChangeHandler.bind(this);
    this.eventHostChangeHandler = this.eventHostChangeHandler.bind(this);
    this.eventAddressChangeHandler = this.eventAddressChangeHandler.bind(this);
    this.eventDescrChangeHandler = this.eventDescrChangeHandler.bind(this);
    this.contactChangeHandler = this.contactChangeHandler.bind(this);
    this.eventTypeChangeHandler = this.eventTypeChangeHandler.bind(this);
  }

  SuppliesClickHandler() {
    const item = {};
    item.itemName = this.state.newSupply;
    axios
      .post('/shoppinglist/addItem', {
        event_id: this.state.eventId,
        item: item
      })
      .then(res => {
        console.log(res.data.shoppingList);
        this.setState({
          newSupply: '',
          Supplies: [...res.data.shoppingList]
        });
      });
  }

  ActivityClickHandler() {
    const item = {};
    item.activityName = this.state.newActivity;
    axios
        .post('/activities/addItem', {
          event_id: '5dc9ae30a59286288c8bf539',
          item: item
        })
        .then(res => {
          console.log(res.data.activity);
          this.setState({
            newSupply: '',
            Activities: [...res.data.activity]
          });
        });
  }

  SuppliesChangeHandler(value) {
    this.setState({ newSupply: value });
  }

  ActivityChangeHandler(value) {
    this.setState({ newActivity: value });
  }

  claimChangeHandler(value) {
    this.setState({ claimedBy: value });
  }

  claimActivityChangeHandler(value) {
    console.log(value)
    this.setState({ activityClaimedBy: value });
  }

  claimActivityClickHandler() {
    const item = {};
    item.activityName = value;
    item.activityClaimedBy = this.state.activityClaimedBy;
    axios
        .put('/activities/updateItem', {
          event_id: '5dc9ae30a59286288c8bf539',
          item: item
        })
        .then(res => {
          console.log(res.data.activity);
          this.setState({
            activityClaimedBy: '',
            Activities: [...res.data.activity]
          });
        });
  }

  claimClickHandler(value) {
    const item = {};
    item.itemName = value;
    item.itemClaimedBy = this.state.claimedBy;
    console.log(item);
    axios
      .put('/shoppinglist/updateItem', {
        event_id: this.state.eventId,
        item: item
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          claimedBy: '',
          Supplies: [...res.data.shoppingList]
        });
      });
  }

  componentDidMount() {
    axios
      .post('/shoppinglist/', { event_id: this.state.eventId })
      .then(res => {
        this.setState({ Supplies: [...res.data] });
      })
      .catch(err => console.log('Shopping List: axios GET ERROR: ', err));

    axios
        .post('/activities/', { event_id: '5dc9ae30a59286288c8bf539' })
        .then(res => {
          this.setState({ Activities: [...res.data] });
        })
        .catch(err => console.log('Activities List: axios GET ERROR: ', err));
  }

  createEvent(event) {
    event.preventDefault();

    const eventHost = {};
    eventHost.user_name = this.state.eventHost;
    axios
      .post('/events/addevent', {
        eventName: this.state.eventName,
        eventHost: eventHost,
        eventAddress: this.state.eventAddress,
        eventDescr: this.state.eventDescr,
        contact: this.state.contact,
        eventType: this.state.eventType
      })
      .then(res => {
        console.log('add event: ', res.data);
        this.setState({
          eventId: res.data._id,
          eventName: res.data.eventName,
          eventHost: res.data.eventHost.user_name,
          eventAddress: res.data.eventAddress,
          eventDescr: res.data.eventDescr,
          contact: res.data.contact,
          eventType: res.data.eventType
        });
      })
      .catch(err => console.log('ERROR'));
  }

  usernameChangeHandler(event) {
    this.setState({
      username: event.target.value
    });
  }

  passwordChangeHandler(event) {
    this.setState({
      password: event.target.value
    });
  }

  submitSignUpHandler(event) {
    event.preventDefault();

    axios
      .post(
        'user/signup',
        {
          username: this.state.username,
          password: this.state.password
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        console.log('frontend');
        console.log(res);
        console.log(res.data);
        if (res.status === 200) return this.props.history.push('/login');
        return this.props.history.push('/signup');
      })
      .catch(err => {
        console.log('error axios');
        console.log(err);
      })
      .finally(() => {
        this.setState({
          username: '',
          password: ''
        });
      });
  }

  submitLoginHandler(event) {
    event.preventDefault();

    axios
      .post(
        'user/login',
        {
          username: this.state.username,
          password: this.state.password
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        console.log('frontend');
        // console.log(res);
        // console.log(res.data);
        // console.log(res.data.user_id);

        this.setState({ userId: res.data.user_id });
        console.log('state user id', res.data.user_id);

        if (res.status === 200) return this.props.history.push('/events');
        return this.props.history.push('/login');
      })
      .catch(err => {
        console.log('error axios');
        console.log(err);
      })
      .finally(() => {
        this.setState({
          password: ''
        });
      });
  }

  eventNameChangeHandler(event) {
    this.setState({
      eventName: event.target.value
    });
  }
  eventHostChangeHandler(event) {
    this.setState({
      eventHost: event.target.value
    });
  }
  eventAddressChangeHandler(event) {
    this.setState({
      eventAddress: event.target.value
    });
  }
  eventDescrChangeHandler(event) {
    this.setState({
      eventDescr: event.target.value
    });
  }
  contactChangeHandler(event) {
    this.setState({
      contact: event.target.value
    });
  }
  eventTypeChangeHandler(event) {
    this.setState({
      eventType: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Switch>
          {/* Home Route will render on initial load of page */}
          <Route exact path="/" component={Home} />

          {/* Signup Route */}
          <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                submitSignUpHandler={this.submitSignUpHandler}
                usernameChangeHandler={this.usernameChangeHandler}
                passwordChangeHandler={this.passwordChangeHandler}
                username={this.state.username}
                password={this.state.password}
              />
            )}
          />
          {/* Login Route */}
          <Route
            exact
            path="/login"
            render={props => (
              <Login
                submitLoginHandler={this.submitLoginHandler}
                usernameChangeHandler={this.usernameChangeHandler}
                passwordChangeHandler={this.passwordChangeHandler}
                username={this.state.username}
                password={this.state.password}
              />
            )}
          />
        </Switch>
        <div className="row">
          <span className="title">RSVP</span>
          <span className="title">Event Info</span>
        </div>
        <div className="row">
          <span>
            <RSVPBox
              Guests={this.state.Guests}
              id="RSVPBox"
              className="container"
            />
          </span>
          <span>
            <EventInfo
              createEvent={this.createEvent}
              eventName={this.state.eventName}
              eventHost={this.state.eventHost}
              eventAddress={this.state.eventAddress}
              eventDescr={this.state.eventDescr}
              contact={this.state.contact}
              eventType={this.state.eventType}
              eventNameChangeHandler={this.eventNameChangeHandler}
              eventHostChangeHandler={this.eventHostChangeHandler}
              eventAddressChangeHandler={this.eventAddressChangeHandler}
              eventDescrChangeHandler={this.eventDescrChangeHandler}
              contactChangeHandler={this.contactChangeHandler}
              eventTypeChangeHandler={this.eventTypeChangeHandler}
            ></EventInfo>
          </span>
        </div>
        <div className="row">
          <span className="title">Supplies</span>
          <span className="title">Activities</span>
        </div>
        <div className="row">
          <span>
            <SuppliesBox
              SuppliesClickHandler={this.SuppliesClickHandler}
              SuppliesChangeHandler={this.SuppliesChangeHandler}
              claimClickHandler={this.claimClickHandler}
              claimChangeHandler={this.claimChangeHandler}
              Supplies={this.state.Supplies}
              id="suppliesBox"
              className="container"
            />
          </span>
          <span>
            <ActivityBox
                claimActivityClickHandler={this.claimActivityClickHandler}
                claimActivityChangeHandler={this.claimActivityChangeHandler}
                ActivityChangeHandler={this.ActivityChangeHandler}
                ActivityClickHandler={this.ActivityClickHandler}
              Activities={this.state.Activities}

              className="container"
            />
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
export default withRouter(App);
