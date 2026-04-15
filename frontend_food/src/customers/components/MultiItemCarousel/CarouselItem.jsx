import React from 'react'
import "./CarouselItem.css";
import { topMeels } from '../../../Data/topMeels'


const CarouselItem = ({image,title}) => {
  return (
    
          <div className='container-car'>
            <img className='img-car' src={image} alt={title}/>
            <span className='text-car'>{title}</span>
        </div>
  )
}

export default CarouselItem