import React, { Component } from 'react';
import SupplyItem from './SupplyItem';

const SuppliesBox = props => {

    const suppliesArr = [];

    for (let i = props.Supplies.length - 1; i >= 0; i--) {
        suppliesArr.push(<SupplyItem
            id={props.Supplies[i]._id}
            Name={props.Supplies[i].itemName}
            Likes={props.Supplies[i].itemLikes}
            Claimed={props.Supplies[i].itemClaimed}
            ClaimedBy={props.Supplies[i].itemClaimedBy}
            Boozable={props.Supplies[i].boozable}
            claimUpdate={props.claimUpdate}
            claim={props.claim}/>);
    }

    return (
    <div>
        <div className="supplyList">
            {suppliesArr}
        </div>
        <div className="createSupplies" >
            <button className="addButton">Add Supplies</button>
            <input/>
        </div>
</div>
)
}

export default SuppliesBox;
