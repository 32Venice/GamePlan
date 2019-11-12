import React from 'react';
import { Link } from 'react-router-dom';

const home = props => {
  return (
    <div className="home">
      <label className="home_label">Game Plan</label>
      <div className="home_links">
        <Link to="/signup">
          <button className="home_buttons">Signup</button>
        </Link>

        <Link to="/login">
          <button className="home_buttons">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default home;
