import React, { useEffect } from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar/Navbar";
import MultiItemCarousel from "../../components/MultiItemCarousel/MultiItemCarousel";
import { restaurents } from "../../../Data/restaurents";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../../State/Customers/Restaurant/restaurant.action";
// import { getAllRestaurantsAction } from "../../../State/Restaurant/Action";
// import RestarantCard from "../../components/RestarentCard/Restaurant";

const HomePage = () => {
  const { auth, restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(getAllRestaurantsAction(localStorage.getItem("jwt")));
    }
  }, [auth.user]);
  return (
    <div className="">
      <section className="banner">
          <div className="banner-text">
          <p className="logo-text">Famous Food</p>
         
          <p className="text-description">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>

      <section className="section-2">
        <div className="">
          <p className="t-meals">
            Top Meals
          </p>
          <MultiItemCarousel />
        </div>
      </section>
      <section className="section-3">
        <div className="">
          <h1 className="favorites">
            Order From Our Handpicked Favorites
          </h1>
          <div className="restaurant-card">
            {restaurant.restaurants.map((item, i) => (
              <RestaurantCard data={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>

    
  );
};

export default HomePage;