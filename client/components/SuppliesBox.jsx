import React, { Component } from "react";
import SupplyItem from "./SupplyItem";

const SuppliesBox = props => {
  const suppliesArr = [];

  for (let i = props.Supplies.length - 1; i >= 0; i--) {
    suppliesArr.push(
      <SupplyItem
        id={props.Supplies[i]._id}
        Name={props.Supplies[i].itemName}
        Likes={props.Supplies[i].itemLikes}
        Claimed={props.Supplies[i].itemClaimed}
        ClaimedBy={props.Supplies[i].itemClaimedBy}
        Boozable={props.Supplies[i].boozable}
        claimChangeHandler={props.claimChangeHandler}
        claimClickHandler={props.claimClickHandler}
      />
    );
  }

  return (
    <div id="suppliesBox">
      <div className="createSupplies">
        <input onChange={e => props.SuppliesChangeHandler(e.target.value)} />
        <button onClick={props.SuppliesClickHandler} className="addButton">
          Add Item
        </button>
      </div>
      <div className="supplyList">{suppliesArr}</div>
    </div>
  );
};

export default SuppliesBox;
