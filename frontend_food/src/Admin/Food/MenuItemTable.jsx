import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteFoodAction,
  getMenuItemsByRestaurantId,
  updateMenuItemsAvailability,
} from "../../State/Customers/Menu/menu.action";
import { updateStockOfIngredient } from "../../State/Admin/Ingredients/Action";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { categorizedIngredients } from "../../customers/util/CategorizeIngredients";
import DeleteIcon from "@mui/icons-material/Delete";
import { Create, Remove } from "@mui/icons-material";
import './MenuItemTable.css';

const MenuItemTable = ({ isDashboard, name }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

    // Get data from Redux store
  const { menu, ingredients, restaurant,auth } = useSelector((store) => store);
  const { id } = useParams();

    // JWT token
  const jwt=localStorage.getItem("jwt");

  /* -------------------- FETCH MENU ITEMS -------------------- */
  useEffect(() => {
    
      if(restaurant.usersRestaurant){
       dispatch( getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant?.id,
        jwt: localStorage.getItem("jwt"),

           // filters (currently not used but available)
        seasonal: false,
        vegetarian: false,
        nonveg: false,
        foodCategory: "",
      }));
      }
      
    
  }, [ingredients.update,restaurant.usersRestaurant]);

  // console.log(
  //   "-------- ",
  //   menu.menuItems[1].ingredients,
  //   categorizedIngredients(menu.menuItems[1].ingredients)
  // );

  

  /* -------------------- TOGGLE FOOD AVAILABILITY -------------------- */
  const handleFoodAvialability = (foodId) => {
    dispatch(updateMenuItemsAvailability({foodId,jwt:auth.jwt || jwt}));
  };

  /* -------------------- DELETE FOOD ITEM -------------------- */
  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId,jwt:auth.jwt || jwt}));
  };

  return (
    <Box width={"100%"}>

      {/* -------------------- MAIN CARD -------------------- */}
      <Card className="MenuItemTableCon">

        {/* -------------------- HEADER -------------------- */}
        <CardHeader
          title={name}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
                    // Navigate to add menu page
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")}>
              <Create />
            </IconButton>
          }
        />

        {/* -------------------- TABLE START -------------------- */}
        <TableContainer>
          <Table aria-label="table in dashboard">
                   {/* -------------------- TABLE HEADER -------------------- */}
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>

                   {/* Show ingredients only in admin view */}
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "" }}>
                    Ingredients
                  </TableCell>
                )}
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>

                <TableCell sx={{ textAlign: "center" }}>Availabilty</TableCell>


                {/* Delete column only for admin view */}
                {!isDashboard && (
                  <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
                )}
              </TableRow>
            </TableHead>
              {/* -------------------- TABLE BODY -------------------- */}
            <TableBody>
              {menu.menuItems?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                  }}
                >
                                  {/* -------------------- IMAGE -------------------- */}
                  <TableCell>
                    {" "}
                    <Avatar alt={item.name} src={item.images[0]} />{" "}
                  </TableCell>

                  {/* -------------------- NAME -------------------- */}
                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>

                  {/* -------------------- INGREDIENTS -------------------- */}
                  {!isDashboard && (
                    <TableCell>
                      {Object.keys(
                        categorizedIngredients(item?.ingredients)
                      )?.map((category) => (
                        <div key={category}>
                          <p className="MIT-category">{category}</p>
                          <div className="MIT-Ingredients">
                            {categorizedIngredients(item?.ingredients)[
                              category
                            ].map((ingredient, index) => (
                              <div
                                key={ingredient.id}
                                className="MIT-ingredientsId"
                              >
                                <div>
                                  <HorizontalRuleIcon
                                    sx={{ fontSize: "1rem" }}
                                  />
                                </div>
                                <div
                                  key={ingredient.id}
                                  className="MIT-ingredientsId2"
                                >
                                  <p>{ingredient.name}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                  )}
                         {/* -------------------- PRICE -------------------- */}
                  <TableCell sx={{ textAlign: "center" }}>
                    ₹{item.price}
                  </TableCell>
{/* -------------------- AVAILABILITY TOGGLE -------------------- */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      color={item.available ? "success" : "error"}
                      variant="text"
                      onClick={() => handleFoodAvialability(item.id)}
                    >
                      {item.available ? "in stock" : "out of stock"}
                    </Button>
                  </TableCell>

{/* -------------------- DELETE BUTTON -------------------- */}
                  {!isDashboard && (
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => handleDeleteFood(item.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

 {/* -------------------- LOADING OVERLAY -------------------- */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default MenuItemTable;