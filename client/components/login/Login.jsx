import React from 'react';

const login = props => {
  return (
    <div className="login">
      <form className="login_form" onSubmit={props.submitLoginHandler}>
        <label className="login_label">Login</label>
        <input
          type="text"
          value={props.username}
          placeholder="Username"
          onChange={props.usernameChangeHandler}
          className="login_input"
        ></input>

        <input
          type="password"
          value={props.password}
          placeholder="Password"
          onChange={props.passwordChangeHandler}
          className="login_input"
        ></input>

        <input
          className="login_submit_button"
          type="submit"
          value="Login"
        ></input>
      </form>
    </div>
  );
};

export default login;
