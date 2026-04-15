import React from 'react'
import MenuItemTable from './MenuItemTable'
import './RestaurantsMenu.css';

const RestaurantsMenu = () => {
  return (
    <div className='RestMenuCont'>

       {/* 
        Wrapper page/container for restaurant menu section.
        This component is mainly used to display all menu items
        using the reusable MenuItemTable component.
      */}
      
        {/* Pass title as prop to MenuItemTable */}
      <MenuItemTable name={"All Menu Items"}/>
    </div>
  )
}

export default RestaurantsMenu
