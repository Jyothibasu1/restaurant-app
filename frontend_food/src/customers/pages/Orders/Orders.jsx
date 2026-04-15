import React, { useEffect } from 'react'
import OrderCard from '../../components/Order/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../../../State/Customers/Orders/Action';
import './Orders.css';

const Orders = () => {
  const {order,auth}=useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")

  useEffect(()=>{
    dispatch(getUsersOrders(jwt))
  },[auth.jwt])
  return (
    <div className='order-component'>
      <h1 className='orders-head'>My Orders</h1>
      <div className='orders-list'>
     { order.orders.map((order)=>order.items.map((item)=><OrderCard status={order.orderStatus} order={item}/>))}
    </div>
    </div>
  )
}

export default Orders