import React from 'react';

const signup = props => {
  return (
    <div className="signup">
      <form className="signup_form" onSubmit={props.submitSignUpHandler}>
        <label className="signup_label">Sign Up</label>
        <input
          type="text"
          value={props.username}
          placeholder="Username"
          onChange={props.usernameChangeHandler}
          className="signup_input"
        ></input>

        <input
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={props.passwordChangeHandler}
          className="signup_input"
        ></input>

        <input
          className="signup_submit_button"
          type="submit"
          value="Sign Up"
        ></input>
      </form>
    </div>
  );
};

export default signup;
