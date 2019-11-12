import React from "react";

const SupplyItem = props => {
  return (
    <div>
      {props.Name}
      {/* <span> Claimed By: </span> */}
      {props.ClaimedBy}
      <input
        id="claimInput"
        onChange={e => props.claimChangeHandler(e.target.value)}
      />
      <button id="claimbtn" onClick={() => props.claimClickHandler(props.Name)}>
        Claim
      </button>
    </div>
  );
};

export default SupplyItem;
