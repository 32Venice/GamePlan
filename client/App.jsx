import React, { Component } from 'react';

import { Switch, Route, Link, withRouter } from 'react-router-dom';

import axios from 'axios';

import './styles/styles.scss';

import Home from './components/home/Home';
import Signup from './components/signup/Signup';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitSignUpHandler = this.submitSignUpHandler.bind(this);
    // this.state = {
    //   event_id: '5dc73845e648f477e4848644',
    //   items: [],
    //   itemToBeAdded: ''
    // };

    // this.addItem = this.addItem.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
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
    const Guests = [];
    const Supplies = [];

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />

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
        </Switch>
        <div className="row">
          <span className="title">RSVP</span>
          <span className="title">Event Info</span>
        </div>
        <div className="row">
          <span>
            <div id="RSVPBox" className="container">
              <div className="RSVPList">{Guests}</div>
              <div className="createGuest">
                <button className="addButton">Add Guest</button>
                <input />
              </div>
            </div>
          </span>
          <span>
            <div className="container">
              <div>
                <span>Party Name:</span>
                <span></span>
              </div>
              <div>
                <span>Host:</span>
                <span></span>
              </div>
              <div>
                <span>Address:</span>
                <span></span>
              </div>
              <div>
                <span>Type:</span>
                <span></span>
              </div>
              <div>
                <span>Info:</span>
                <span></span>
              </div>
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
              <div className="supplyList">{Supplies}</div>
              <div className="createSupplies">
                <button className="addButton">Add Supplies</button>
                <input />
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
