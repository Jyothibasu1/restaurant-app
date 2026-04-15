import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteEventAction } from "../../State/Customers/Restaurant/restaurant.action";

const EventCard = ({ item,isCustomer }) => {
  const dispatch=useDispatch();

   // Get JWT token from local storage for authentication
  const jwt = localStorage.getItem("jwt");

  // Function to handle event deletion
  const handleDeleteEvent = () => {
    console.log("Event Item:", item);

    // dispatch(deleteEventAction(item.id))

      // Try to get valid event ID from different possible fields
    const id = item?.id || item?.eventId || item?._id;

    // If ID is missing, stop execution and show error
  if (!id) {
    console.error("Event ID is undefined ❌");
    return;
  }

  // Dispatch delete event action to Redux
  dispatch(
    deleteEventAction({
      eventId: id,
      jwt: jwt,
    })
  );
    
  };
  return (
    <div>
      <Card sx={{ width: 345 }}>

          {/* Event Image Section */}
        <CardMedia
          sx={{ height: 345,
            '&:hover': {
              transform: 'scale(1.1)', // Example: Scale the image on hover
              transition: 'transform 0.5s ease-in-out', // Example: Apply a smooth transition effect
            },
           }}
          image={item.image}
          title="green iguana"
        />

        {/* Event Details Section */}
        <CardContent>

          {/* Restaurant Name */}
          <Typography gutterBottom variant="h5" component="div">
            {item.restaurant.name}
          </Typography>

          {/* Event Name */}
          <Typography variant="body2" color="text.secondary">
            {item.name}
          </Typography>

          {/* Event Location and Time Info */}
          <div className="py-2 space-y-2">
            <p>{item.location}</p>

             {/* Start Time */}
            <p style={{ fontSize: "0.875rem", color: "#3b82f6" }}>{item.startedAt}</p>

             {/* End Time */}
            <p style={{ fontSize: "0.875rem", color: "#ef4444" }}>{item.endsAt}</p>
          </div>
        </CardContent>


        {/* Delete Button (Only visible for non-customers/admins) */}
         {!isCustomer &&    <CardActions>
          <IconButton onClick={handleDeleteEvent} aria-label="add to favorites">
            <DeleteIcon />
          </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};

export default EventCard;