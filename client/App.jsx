import React, { Component } from 'react';

import { Switch, Route, Link, withRouter } from 'react-router-dom';

import axios from 'axios';

import './styles/styles.scss';

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
      newSupply: ''
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
  }

  SuppliesClickHandler() {
    const item = {};
    item.itemName = this.state.newSupply;
    axios
      .post('/shoppinglist/addItem', {
        event_id: '5dc9ae30a59286288c8bf539',
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

  SuppliesChangeHandler(value) {
    this.setState({ newSupply: value });
  }

  claimChangeHandler(value) {
    this.setState({ claimedBy: value });
  }

  claimClickHandler(value) {
    const item = {};
    item.itemName = value;
    item.itemClaimedBy = this.state.claimedBy;
    console.log(item);
    axios
      .put('/shoppinglist/updateItem', {
        event_id: '5dc9ae30a59286288c8bf539',
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
      .post('/shoppinglist/', { event_id: '5dc9ae30a59286288c8bf539' })
      .then(res => {
        this.setState({ Supplies: [...res.data] });
      })
      .catch(err => console.log('Shopping List: axios GET ERROR: ', err));
  }

  createEvent(name, host, address, descr, cont, type) {
    axios
      .post('/events/addevent', {
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

  // Add back to create when frontend component is done to be able to test
  // addItem(e) {
  //   axios
  //     .post(
  //       '/shoppinglist/addItem',
  //       {
  //         item: this.state.itemToBeAdded,
  //         event_id: this.state.event_id
  //       },
  //       {
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //     .then(res => {
  //       console.log(res);

  //       this.setState({

  //       })
  //     });

  // e.preventDefault();
  // console.log(“in frontend “, this.todo.value);
  // fetch(“/add”, {
  //   method: “POST”,
  //   headers: { “Content-Type”: “application/json” },
  //   body: JSON.stringify({ item: this.todo.value })
  // })
  //   .then(res => {
  //     this.todo.value = “”;
  //     return res.json();
  //   })
  //   .catch(err => console.log(“ShoppingContainer: fetch POST ERROR: “, err));
  // this.setState({
  //   items: [this.todo.value, ...this.state.items]
  // });
  // }
  // deleteItem(val) {
  //   console.log(“MY VAL!!!!!!!!!!!“, val);
  //   fetch(“/delete”, {
  //     method: “DELETE”,
  //     headers: { “content-type”: “application/json” },
  //     body: JSON.stringify({ item: val })
  //   })
  //     .then(res => {
  //       // console.log(“My res -->“, res);
  //       location.reload();
  //       return res.json();
  //     })
  //     .catch(err => console.log(“TodoItems: fetch DELETE ERROR: “, err));
  // }
  // componentWillMount() {
  //   fetch(“/getAll”)
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       for (let i = data.length - 1; i >= 0; i--) {
  //         myListItems.push(
  //           <div>
  //             <button
  //               id=“compbutton”
  //               key={i}
  //               onClick={() => this.deleteItem(data[i].item)}
  //             >
  //               Complete Task
  //             </button>
  //             <div
  //               className=“eachItem”
  //               // key={i}
  //               id={i}
  //               // onClick={() => this.deleteItem(data[i].item)}
  //             >
  //               {data[i].item}
  //             </div>
  //           </div>
  //         );
  //       }
  //       this.setState({ promiseIsResolved: true });
  //       // console.log(“myListItems in fetch --> “, myListItems);
  //     })
  //     .catch(err => console.log(“ShoppingContainer: fetch GET ERROR: “, err));
  // }

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
            <EventInfo createEvent={this.createEvent}></EventInfo>
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
