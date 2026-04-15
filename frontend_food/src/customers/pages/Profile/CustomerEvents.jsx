import React, { useEffect, useState } from 'react'
import { getAllEvents, getRestaurnatsEvents } from '../../../State/Customers/Restaurant/restaurant.action';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from '../../../Admin/Events/EventCard';
import './CustomerEvents.css';

const CustomerEvents = () => {
  const dispatch=useDispatch()
  const jwt=localStorage.getItem("jwt")
 
  const {restaurant,auth}=useSelector(store=>store);

  useEffect(()=>{
    dispatch(getAllEvents({jwt}))
  },[auth.jwt])
  return (
    <div className="CustomerEventsCon">
    {restaurant.events.map((item)=> <div>
      <EventCard isCustomer={true} item={item}/>
    </div>)}
   
  </div>
  )
}

export default CustomerEvents