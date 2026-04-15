import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import './AddressCard.css';

const AddressCard = ({ handleSelectAddress,item,showButton }) => {
  return (
     <Card className="AddCard-con">
      <HomeIcon />
      <div className="AddCard-headCon">
       
         <h1 className="AddCard-head">Home</h1>
        <p>
          {item.streetAddress}, {item.postalCode}, {item.state}, {item.country}
          {/* {`${address?.streetAddress} ${address?.city} ${address?.state} ${address?.zipCode}`} */}
        </p>

        {showButton && <Button
          onClick={()=>handleSelectAddress(item)}
          variant="outlined"
          className="w-full"
        >
          select
        </Button>}
      </div>
    </Card>
  );
};

export default AddressCard;