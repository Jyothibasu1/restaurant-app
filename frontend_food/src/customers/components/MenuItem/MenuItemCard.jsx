import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizedIngredients } from "../../util/CategorizeIngredients";
import './MenuItemCard.css';

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();


  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      console.log("yes");
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      console.log("no");
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };
  
  const handleAddItemToCart = (e) => {
    
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients:selectedIngredients
      },
    };
    dispatch(addItemToCart(data));
  };
  

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="MIC-con">
             <div className="MIC-detailCon">
              <img
                className="MIC-img"
                src={item.images[0]}
                alt=""
              />

              <div className="MIC-detail">
                <p className="MIC-itemName">{item.name}</p>
                <p>₹{item.price}</p>
                 <p className="MIC-itemDes">{item.description}</p>
              </div>
            </div>
            {/* <div>
        <Button onClick={handleAddItemToCart}>Add To Cart</Button>
      </div> */}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart} >
             <div className="MIC-form">
               {Object.keys(
                          categorizedIngredients(item?.ingredients)
                        )?.map((category) => (
                <div className="MIC-category">
                <p>{category}</p>
                <FormGroup >
                  {categorizedIngredients(item?.ingredients)[
                                category
                              ].map((ingredient, index) => (
                    <FormControlLabel
                      key={ingredient.name}
                      control={
                        <Checkbox
                          checked={selectedIngredients.includes(
                            ingredient.name
                          )}
                          onChange={() =>
                            handleCheckboxChange(ingredient.name)
                          }
                          disabled={!ingredient.inStoke}
                        />
                      }
                      label={ingredient.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
            </div>
           
            <div className="MIC-btn">
              <Button variant="contained" disabled={!item.available} type="submit">
                {item.available?"Add To Cart":"Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MenuItemCard;
