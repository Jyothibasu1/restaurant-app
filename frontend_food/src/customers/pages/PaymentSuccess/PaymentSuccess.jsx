import React, { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartAction } from "../../../State/Customers/Cart/cart.action";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
   const navigateToHome = () => navigate("/");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return (
    <div className="ps-container">
      <div className="ps-wrapper">
        <div className="ps-box">
          <TaskAltIcon className="ps-icon" sx={{ color: green[600] }} />

          <h1 className="ps-title">Order Success !</h1>

          <p className="ps-desc">
            Thank you for choosing our restaurant! We appreciate your order.
          </p>

          <p className="ps-tagline">Have A Great Day !</p>

          <Button
            variant="contained"
            className="ps-button"
            onClick={navigateToHome}
          >
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;