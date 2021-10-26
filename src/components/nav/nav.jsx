import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className='f3 dim link white pa3 pointer'
        >
          SignOut
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signin")}
          className='f3 dim link white pa3 pointer'
        >
          SignIn
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className='f3 dim link white pa3 pointer'
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
