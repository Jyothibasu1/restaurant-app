import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites, deleteRestaurant, updateRestaurant, updateRestaurantStatus } from "../../State/Customers/Restaurant/restaurant.action";
import './RestaurantCard.css'

export default function RestaurantCard({ item }) {

    // navigation hook
  const navigate = useNavigate();
  const dispatch=useDispatch()

  // delete restaurant function
const handleDeleteRestaurant=()=>{
  dispatch(deleteRestaurant(item.id))
}

// open/close restaurant status
const handleUpdateRestaurantStatus=()=>{
  dispatch(updateRestaurantStatus(item.id))
}

  return (
    <Card sx={{ maxWidth: 345, m: "1rem" }}>

      {/* header section */}
      <CardHeader

        // avatar (first letter or fixed letter)
        avatar={
          <Avatar
            sx={{ bgcolor: "#e91e63", color: "white" }}
            aria-label="recipe"
          >
            Z
          </Avatar>
        }
         // more options icon
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // restaurant name
        title={item.name}

        // dummy date (can change later)
        subheader="September 14, 2016"
      />
      
      {/* restaurant image */}
      <img className="RestaurantCard-image" src={item.imageUrl} alt="" />

      {/* description */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {/* static text now, can replace with real description */}
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      {/* actions */}
      <CardActions disableSpacing>
        
        <div className="RestaurantCard-deleteRest">

           {/* delete button */}
          <div>
            <IconButton onClick={handleDeleteRestaurant}  aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>

           {/* open/close button */}
          <div>
            <Button color={item.open?"warning":"success"} onClick={handleUpdateRestaurantStatus}>
              {item.open?"Close":"Open"}
            </Button>
          </div>

          {/* go to dashboard */}
          <div>
            <Button size="small" onClick={() => navigate(`/admin/restaurants/${item.id}`)}>
              Dashboard
            </Button>
          </div>

        </div>
      </CardActions>
    </Card>
  );
}