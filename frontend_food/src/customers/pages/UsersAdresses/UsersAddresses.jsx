import React from "react";
import AddressCard from "../../components/Address/AddressCard";
import { useSelector } from "react-redux";
import './UsersAddresses.css';

const UsersAddresses = () => {
  const {auth}=useSelector(state=>state)
  return (
    <div>
      <div className="UsersAddresses-Con">
         <h1 className="UsersAddresses-Head">Addresses</h1>
       
            <div className="UsersAddresses-Card">
          {auth.user?.addresses.map((item) => (
            <AddressCard item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersAddresses;