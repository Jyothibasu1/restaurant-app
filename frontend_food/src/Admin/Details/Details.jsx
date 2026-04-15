import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
// import XIcon from '@mui/icons-material/X';
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  updateRestaurant,
  getRestaurantById,
  updateRestaurantStatus,
} from "../../State/Customers/Restaurant/restaurant.action";
import './Details.css';

const Details = () => {
  const dispatch = useDispatch();
  // getting data from redux store
  const { auth, restaurant, ingredients } = useSelector((store) => store);

  // token from local storage
  const jwt = localStorage.getItem("jwt");

  // fetching restaurant details when component loads
  useEffect(() => {
    const restaurantId = restaurant.usersRestaurant?.id;
    const token = auth.jwt || jwt;
    if (restaurantId && token) {
      dispatch(getRestaurantById({ restaurantId, jwt: token }));
    }
  }, [dispatch, restaurant.usersRestaurant?.id, auth.jwt, jwt]);

    // open/close restaurant
  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: auth.jwt || jwt,
      })
    );
  console.log("Full restaurant object:", restaurant.usersRestaurant);
  console.log("Address:", restaurant.usersRestaurant?.address);
  console.log("Contact:", restaurant.usersRestaurant?.contactInformation);
  console.log("Address country:", restaurant.usersRestaurant?.address?.country);
  console.log("Contact email:", restaurant.usersRestaurant?.contactInformation?.email);

  };
  return (
     <div className="details-container">

      {/* top section with name and button */}
      <div className="details-userContainer">
        <h1 className="details-user">
          {restaurant.usersRestaurant?.name}
        </h1>
        <div>
          <Button
            onClick={handleRestaurantStatus}
            size="large"
            className="details-btn"
            variant="contained"

             // change color based on status
            color={restaurant.usersRestaurant?.open ? "error" : "primary"}
          >
            {restaurant.usersRestaurant?.open
              ? "Close"
              : "Open"}
          </Button>
        </div>
      </div>

 {/* main grid layout */}
      <Grid container spacing={2}>

        {/* restaurant details */}
        <Grid size={12}>
          <Card>
            <CardHeader
              title={<span className="details-title"> Restaurant</span>}
            />
            <CardContent>
                <div className="Details-Restaurant">

                  {/* owner */}
                 <div className="details-f">
                  <p className="details-w">Owner</p>
                  <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>

                {/* restaurant name */}
                <div className="details-f">
                   <p className="details-w">Restaurant Name</p>
                   <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>

                 {/* cuisine */}
                <div className="details-f">
                   <p className="details-w">Cuisine Type</p>
                   <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>

                  {/* opening hours */}
                <div className="details-f">
                  <p className="details-w">Opning Hours</p>
                  <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>

                {/* status */}
                <div className="details-f">

                   <p className="details-w">Status</p>
                  <p className="details-T"></p>
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="text-black px-5 py-2 rounded-full bg-red-400">
                        Closed
                      </span>
                    )}
                  </div>
                </div>
            </CardContent>
          </Card>
        </Grid>

         {/* address section */}
        <Grid size={{ xs:12 , lg:5}}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300"> Address</span>}
            />
            <CardContent>
              <div className="space-y-3 text-gray-200">
               
                <div className="details-f">
                  
                   <p className="details-w">Country</p>
                  <p className="details-T">
                    {" "}
                  
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.address.country}
                  </p>
                </div>
                
                <div className="details-f">
                  <p className="details-w">City</p>
                  <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>

                <div className="details-f">
                   <p className="details-w">Postal Code</p>
                  <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>
                <div className="details-f">
                  <p className="details-w">Street Address</p>
                  <p className="details-T">
                    {" "}
                    <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* contact section */}
        <Grid size={{ xs:12 , lg:7}}>
          <Card>
            <CardHeader
              title={<span className="details-TC"> Contact</span>}
            />
            <CardContent>
              <div className="details-Contact">

                 {/* email */}
                <div className="details-f">

                  <p className="details-w">Email</p>

                  <p className="details-T">
                    {" "}
                       <span className="details-pr">-</span>{" "}
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>

                {/* mobile */}
                <div className="details-f">

                   <p className="details-w">Mobile</p>
                  <p className="details-T">
                    {" "}
                       <span className="details-pr">-</span>{" "}
                    {" +91"}
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
{/* social links */}
                <div className="details-IF">
                  <p className="details-w">Social</p>
                  <div className="details-T details-IF details-pb">
                    {" "}
                     <span className="details-pr">-</span>{" "}

                      {/* icons */}
                    <a
                      target="_blank"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      rel="noreferrer"
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="details-ml"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="details-ml"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedInIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      className="details-ml"
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;