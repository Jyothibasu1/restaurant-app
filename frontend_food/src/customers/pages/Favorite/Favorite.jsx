import React, { useEffect } from 'react'
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard'
import { restaurants } from '../../../Data/restaurents'
import { useDispatch, useSelector } from 'react-redux'
import './Favorite.css';

const Favorite = () => {
  const {auth}=useSelector(store=>store);

  useEffect(()=>{
    // dispatch()
  },[])
  return (
   <div>
    <h1 className='Favorite-heading'>My Favorites</h1>
      <div className='favorites-1'>
      {auth.favorites?.map((item)=><RestaurantCard data={item}/>)}
    </div>
   </div>
  )
}

export default Favorite