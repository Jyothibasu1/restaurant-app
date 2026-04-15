import {
  Box,
  Button,
  Card,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAction,
  getRestaurnatsEvents,
} from "../../State/Customers/Restaurant/restaurant.action";
import { useParams } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import EventCard from "./EventCard";
import './Events.css';

// Modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

// Initial form state
const initialValues = {
  image: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const [image, setimage] = useState("");
  const dispatch = useDispatch();

  // Get restaurant & auth data from Redux store
  const { restaurant, auth } = useSelector((store) => store);

   // Modal open/close state
  const [openModal, setOpenModal] = useState(false);

  // Close modal
  const handleCloseModal = () => setOpenModal(false);

  // Open modal
  const handleOpenModal = () => setOpenModal(true);

 // JWT token from local storage
  const jwt = localStorage.getItem("jwt");

    // Form state for event creation
  const [formValues, setFormValues] = useState(initialValues);

  // Handle input field changes (text fields)
  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Handle date picker changes (start/end time)
  const handleDateChange = (date, dateType) => {
    // const formattedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A");
    setFormValues({ ...formValues, [dateType]: date });
  };

    // Handle form submission (create event)
  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert dayjs date objects into formatted strings
    const formattedData = {
    ...formValues,
    startedAt: formValues.startedAt
      ? formValues.startedAt.format("MMMM DD, YYYY hh:mm A")
      : null,
    endsAt: formValues.endsAt
      ? formValues.endsAt.format("MMMM DD, YYYY hh:mm A")
      : null,
  };

   // Dispatch create event action to backend
    dispatch(
      createEventAction({
        data: formValues,
        restaurantId: restaurant.usersRestaurant?.id,
        jwt,
      })
    );
    console.log("Image URL:", formValues,restaurant.usersRetaurant?.id);
  };

  // Fetch restaurant events when restaurant data is available
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurnatsEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);

  return (
    <div className="Events-con">
     
      {/* Header Section */}
      <div className="Event-head">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={handleOpenModal}
          variant="contained"
          color="primary"
        >
          Create New Event
        </Button>
      </div>

      {/* Events List Section */}
      <div className="EventsRest">
        {restaurant.restaurantsEvents.map((item) => (
          <EventCard item={item} />
        ))}
      </div>

 {/* Create Event Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* Event Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

               {/* Image URL Input */}
              <Grid size={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                />
              </Grid>

               {/* Location Input */}
              <Grid size={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                />
              </Grid>

               {/* Event Name Input */}
              <Grid size={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                />
              </Grid>

              {/* Start Date Picker */}
              <Grid size={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Start Date and Time"
                    value={formValues.startedAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "startedAt")
                    }
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>

              {/* End Date Picker */}
              <Grid size={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formValues.endsAt}
                    onChange={(newValue) =>
                      handleDateChange(newValue, "endsAt")
                    }
                    inputFormat="MM/dd/yyyy hh:mm a"
                    className="w-full"
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

             {/* Submit Button */}
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;