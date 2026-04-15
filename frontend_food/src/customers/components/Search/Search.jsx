import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "../../../Data/topMeels";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../State/Customers/Menu/menu.action";
import './Search.css';

const dish = [1, 1, 1, 1];
const Search = () => {
  const dispatch = useDispatch();
  const { menu,auth } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")

  const handleSearchMenu = (keyword) => {
    dispatch(searchMenuItem({keyword,jwt:auth.jwt || jwt }));
  };
  
  return (
    
    <div className="Search-Con">

       <div className="Search-div">
         <SearchIcon className="Search-Icon" />
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="Search-input"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="Search-Cuisine">Popular Cuisines</h1>
         <div className="Search-TM ">
          {topMeels.slice(0, 9).map((item) => (
            <PopularCuisines image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      <div className=" Search-item">
        {menu.search.map((item) => (
          <SearchDishCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Search;